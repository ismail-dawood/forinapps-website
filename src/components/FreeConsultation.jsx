import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Loader2,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";

/*
 * ---------------------------------------------------------
 * CAL.COM CONFIG
 * ---------------------------------------------------------
 */

const CAL_API_KEY = import.meta.env.VITE_CAL_API_KEY;

const RAW_EVENT_TYPE_ID = import.meta.env.VITE_CAL_EVENT_TYPE_ID;
const EVENT_TYPE_ID = Number(RAW_EVENT_TYPE_ID);

const IS_VALID_EVENT_TYPE_ID =
  Number.isInteger(EVENT_TYPE_ID) && EVENT_TYPE_ID > 0;

const TIMEZONE = "Asia/Karachi";

const SLOTS_API = "https://api.cal.com/v2/slots";
const BOOKINGS_API = "https://api.cal.com/v2/bookings";

const SLOTS_API_VERSION = "2024-09-04";
const BOOKING_API_VERSION = "2026-02-25";

const MONTH_CACHE = new Map();
const DAY_CACHE = new Map();

/*
 * ---------------------------------------------------------
 * HELPERS
 * ---------------------------------------------------------
 */

function pad(value) {
  return String(value).padStart(2, "0");
}

function getDateKey(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}`;
}

function getMonthKey(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}`;
}

function getMonthDays(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const firstWeekday = firstDay.getDay();
  const totalDays = lastDay.getDate();

  const days = [];

  for (let i = 0; i < firstWeekday; i++) {
    days.push(null);
  }

  for (let day = 1; day <= totalDays; day++) {
    days.push(new Date(year, month, day));
  }

  return days;
}

function formatDateForCal(date) {
  return `${getDateKey(date)}T00:00:00+05:00`;
}

function extractSlots(data) {
  if (!data) return [];

  const rawSlots =
    data?.data?.slots ||
    data?.slots ||
    data?.data ||
    [];

  if (Array.isArray(rawSlots)) {
    return rawSlots;
  }

  if (typeof rawSlots === "object" && rawSlots !== null) {
    return Object.values(rawSlots).flat();
  }

  return [];
}

function normalizeSlot(slot) {
  if (!slot) return null;

  if (typeof slot === "string") {
    return {
      raw: slot,
      start: slot,
      time: new Date(slot).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: TIMEZONE,
      }),
    };
  }

  const start =
    slot.start ||
    slot.time ||
    slot.startTime ||
    slot.startTimeUtc;

  if (!start) return null;

  return {
    raw: slot,
    start,
    time: new Date(start).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: TIMEZONE,
    }),
  };
}

function sortSlots(slots) {
  return [...slots].sort((a, b) => {
    const aTime = new Date(a.start || a.raw || 0).getTime();
    const bTime = new Date(b.start || b.raw || 0).getTime();

    return aTime - bTime;
  });
}

function isSameDay(a, b) {
  return getDateKey(a) === getDateKey(b);
}

function isPastDay(date) {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const compare = new Date(date);
  compare.setHours(0, 0, 0, 0);

  return compare < today;
}

/*
 * ---------------------------------------------------------
 * COMPONENT
 * ---------------------------------------------------------
 */

export default function FreeConsultation() {
  const [step, setStep] = useState(1);

  const [currentMonth, setCurrentMonth] = useState(() => {
    const date = new Date();

    date.setDate(1);

    return date;
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [availableDays, setAvailableDays] = useState(new Set());
  const [slots, setSlots] = useState([]);

  const [loadingMonth, setLoadingMonth] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [booking, setBooking] = useState(false);

  const [error, setError] = useState("");
  const [bookingError, setBookingError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const abortRefs = useRef({
    month: null,
    day: null,
  });

  const preloadRef = useRef(new Set());

  /*
   * ---------------------------------------------------------
   * DEBUG CONFIG
   *
   * Ye live issue diagnose karne ke liye useful hai.
   * Browser console mein values show hongi.
   * ---------------------------------------------------------
   */

  useEffect(() => {
    console.log("Cal.com configuration:", {
      apiKeyExists: Boolean(CAL_API_KEY),
      rawEventTypeId: RAW_EVENT_TYPE_ID,
      eventTypeId: EVENT_TYPE_ID,
      validEventTypeId: IS_VALID_EVENT_TYPE_ID,
    });
  }, []);

  /*
   * ---------------------------------------------------------
   * API HEADERS
   * ---------------------------------------------------------
   */

  const getHeaders = useCallback(
    (version) => ({
      Authorization: `Bearer ${CAL_API_KEY}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      "cal-api-version": version,
    }),
    []
  );

  /*
   * ---------------------------------------------------------
   * MONTH AVAILABILITY
   * ---------------------------------------------------------
   */

  const fetchMonthAvailability = useCallback(
    async (monthDate, silent = false) => {
      if (!IS_VALID_EVENT_TYPE_ID) {
        console.error(
          "Invalid VITE_CAL_EVENT_TYPE_ID:",
          RAW_EVENT_TYPE_ID
        );

        if (!silent) {
          setError(
            "Booking configuration is invalid. Please try again later."
          );
        }

        return null;
      }

      if (!CAL_API_KEY) {
        console.error("VITE_CAL_API_KEY is missing.");

        if (!silent) {
          setError(
            "Booking configuration is incomplete. Please try again later."
          );
        }

        return null;
      }

      const monthKey = getMonthKey(monthDate);

      if (MONTH_CACHE.has(monthKey)) {
        const cached = MONTH_CACHE.get(monthKey);

        setAvailableDays(new Set(cached));

        return cached;
      }

      if (!silent) {
        setLoadingMonth(true);
      }

      abortRefs.current.month?.abort();

      const controller = new AbortController();
      abortRefs.current.month = controller;

      try {
        const year = monthDate.getFullYear();
        const month = monthDate.getMonth();

        /*
         * IMPORTANT:
         *
         * End date is the FIRST day of next month.
         *
         * This makes sure the complete last day
         * of the current month is included.
         */

        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 1);

        const params = new URLSearchParams({
          eventTypeId: String(EVENT_TYPE_ID),
          start: formatDateForCal(startDate),
          end: formatDateForCal(endDate),
          timeZone: TIMEZONE,
        });

        const url = `${SLOTS_API}?${params.toString()}`;

        console.log("Cal.com month availability request:", url);

        const response = await fetch(url, {
          method: "GET",
          headers: getHeaders(SLOTS_API_VERSION),
          signal: controller.signal,
          cache: "no-store",
        });

        const contentType =
          response.headers.get("content-type") || "";

        let data = null;

        if (contentType.includes("application/json")) {
          data = await response.json();
        }

        if (!response.ok) {
          console.error(
            "Cal.com availability response:",
            data
          );

          throw new Error(
            data?.message ||
              data?.error ||
              `Availability request failed: ${response.status}`
          );
        }

        const rawSlots = extractSlots(data);

        const days = new Set();

        if (Array.isArray(rawSlots)) {
          rawSlots.forEach((item) => {
            const slot = normalizeSlot(item);

            if (!slot?.start) return;

            const date = new Date(slot.start);

            if (!Number.isNaN(date.getTime())) {
              days.add(getDateKey(date));
            }
          });
        }

        MONTH_CACHE.set(monthKey, days);

        setAvailableDays(new Set(days));
        setError("");

        return days;
      } catch (err) {
        if (err?.name === "AbortError") {
          return null;
        }

        console.error("Month availability error:", err);

        if (!silent) {
          setError(
            err?.message ||
              "Unable to load available dates."
          );
        }

        return null;
      } finally {
        if (!silent) {
          setLoadingMonth(false);
        }
      }
    },
    [getHeaders]
  );

  /*
   * ---------------------------------------------------------
   * DAY SLOTS
   * ---------------------------------------------------------
   */

  const fetchDaySlots = useCallback(
    async (date, silent = false) => {
      if (!date) return [];

      if (!IS_VALID_EVENT_TYPE_ID) {
        console.error(
          "Invalid VITE_CAL_EVENT_TYPE_ID:",
          RAW_EVENT_TYPE_ID
        );

        if (!silent) {
          setError(
            "Booking configuration is invalid. Please try again later."
          );
        }

        return [];
      }

      if (!CAL_API_KEY) {
        console.error("VITE_CAL_API_KEY is missing.");

        if (!silent) {
          setError(
            "Booking configuration is incomplete. Please try again later."
          );
        }

        return [];
      }

      const dateKey = getDateKey(date);

      if (DAY_CACHE.has(dateKey)) {
        const cached = DAY_CACHE.get(dateKey);

        if (!silent) {
          setSlots(cached);
        }

        return cached;
      }

      if (!silent) {
        setLoadingSlots(true);
      }

      abortRefs.current.day?.abort();

      const controller = new AbortController();
      abortRefs.current.day = controller;

      try {
        const startDate = new Date(date);
        const endDate = new Date(date);

        endDate.setDate(endDate.getDate() + 1);

        const params = new URLSearchParams({
          eventTypeId: String(EVENT_TYPE_ID),
          start: formatDateForCal(startDate),
          end: formatDateForCal(endDate),
          timeZone: TIMEZONE,
        });

        const url = `${SLOTS_API}?${params.toString()}`;

        console.log("Cal.com day slots request:", url);

        const response = await fetch(url, {
          method: "GET",
          headers: getHeaders(SLOTS_API_VERSION),
          signal: controller.signal,
          cache: "no-store",
        });

        const contentType =
          response.headers.get("content-type") || "";

        let data = null;

        if (contentType.includes("application/json")) {
          data = await response.json();
        }

        if (!response.ok) {
          console.error(
            "Cal.com slots response:",
            data
          );

          throw new Error(
            data?.message ||
              data?.error ||
              `Slot request failed: ${response.status}`
          );
        }

        const normalized = sortSlots(
          extractSlots(data)
            .map(normalizeSlot)
            .filter(Boolean)
        );

        DAY_CACHE.set(dateKey, normalized);

        if (!silent) {
          setSlots(normalized);
          setError("");
        }

        return normalized;
      } catch (err) {
        if (err?.name === "AbortError") {
          return [];
        }

        console.error("Day slots error:", err);

        if (!silent) {
          setSlots([]);

          setError(
            err?.message ||
              "Unable to load available times."
          );
        }

        return [];
      } finally {
        if (!silent) {
          setLoadingSlots(false);
        }
      }
    },
    [getHeaders]
  );

  /*
   * ---------------------------------------------------------
   * PRELOAD DAY
   * ---------------------------------------------------------
   */

  const preloadDay = useCallback(
    (date) => {
      if (!date) return;

      const key = getDateKey(date);

      if (
        DAY_CACHE.has(key) ||
        preloadRef.current.has(key)
      ) {
        return;
      }

      preloadRef.current.add(key);

      fetchDaySlots(date, true).finally(() => {
        preloadRef.current.delete(key);
      });
    },
    [fetchDaySlots]
  );

  /*
   * ---------------------------------------------------------
   * INITIAL MONTH LOAD
   * ---------------------------------------------------------
   */

  useEffect(() => {
    fetchMonthAvailability(currentMonth);
  }, [currentMonth, fetchMonthAvailability]);

  /*
   * ---------------------------------------------------------
   * PRELOAD TODAY + NEXT 6 DAYS
   * ---------------------------------------------------------
   */

  useEffect(() => {
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);

      date.setDate(today.getDate() + i);

      preloadDay(date);
    }
  }, [preloadDay]);

  /*
   * ---------------------------------------------------------
   * PRELOAD AVAILABLE DAYS
   * ---------------------------------------------------------
   */

  useEffect(() => {
    if (!availableDays.size) return;

    const today = new Date();

    for (const key of availableDays) {
      const date = new Date(`${key}T00:00:00`);

      if (date >= today) {
        preloadDay(date);
      }
    }
  }, [availableDays, preloadDay]);

  /*
   * ---------------------------------------------------------
   * MONTH NAVIGATION
   * ---------------------------------------------------------
   */

  const goPreviousMonth = () => {
    const today = new Date();

    const previous = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1,
      1
    );

    const currentMonthStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    if (previous < currentMonthStart) return;

    setCurrentMonth(previous);
  };

  const goNextMonth = () => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        1
      )
    );
  };

  /*
   * ---------------------------------------------------------
   * DATE SELECT
   * ---------------------------------------------------------
   */

  const handleDateSelect = async (date) => {
    if (!date || isPastDay(date)) return;

    const key = getDateKey(date);

    if (!availableDays.has(key)) return;

    setError("");
    setBookingError("");

    setSelectedDate(date);
    setSelectedSlot(null);

    if (DAY_CACHE.has(key)) {
      setSlots(DAY_CACHE.get(key));
    } else {
      setSlots([]);
    }

    setStep(2);

    if (!DAY_CACHE.has(key)) {
      await fetchDaySlots(date);
    }

    const nextDay = new Date(date);

    nextDay.setDate(nextDay.getDate() + 1);

    preloadDay(nextDay);
  };

  /*
   * ---------------------------------------------------------
   * SLOT SELECT
   * ---------------------------------------------------------
   */

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setBookingError("");
    setStep(3);
  };

  /*
   * ---------------------------------------------------------
   * FORM CHANGE
   * ---------------------------------------------------------
   */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /*
   * ---------------------------------------------------------
   * FORM VALIDATION
   * ---------------------------------------------------------
   */

  const isFormValid = useMemo(() => {
    return (
      form.name.trim().length >= 2 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email.trim()
      ) &&
      selectedDate &&
      selectedSlot?.start
    );
  }, [form, selectedDate, selectedSlot]);

  /*
   * ---------------------------------------------------------
   * BOOKING
   * ---------------------------------------------------------
   */

  const handleBooking = async (event) => {
    event.preventDefault();

    if (booking) return;

    if (!IS_VALID_EVENT_TYPE_ID) {
      console.error(
        "Invalid Event Type ID:",
        RAW_EVENT_TYPE_ID
      );

      setBookingError(
        "Booking configuration is invalid. Please try again later."
      );

      return;
    }

    if (!CAL_API_KEY) {
      console.error("Cal.com API key is missing.");

      setBookingError(
        "Booking configuration is incomplete. Please try again later."
      );

      return;
    }

    if (!selectedDate || !selectedSlot) {
      setBookingError(
        "Please select a date and time."
      );

      return;
    }

    if (!form.name.trim()) {
      setBookingError("Please enter your name.");

      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email.trim()
      )
    ) {
      setBookingError(
        "Please enter a valid email."
      );

      return;
    }

    setBooking(true);
    setBookingError("");
    setError("");

    const bookingStart = performance.now();

    try {
      /*
       * The selected slot already contains the exact
       * Cal.com start time.
       *
       * No availability API call is made here.
       */

      const start = selectedSlot.start;

      /*
       * IMPORTANT:
       *
       * eventTypeId is now a REAL NUMBER.
       *
       * Do not use Number() here because EVENT_TYPE_ID
       * has already been normalized above.
       */

      const payload = {
        eventTypeId: EVENT_TYPE_ID,

        start,

        attendee: {
          name: form.name.trim(),
          email: form.email.trim(),
          timeZone: TIMEZONE,
          language: "en",
        },
      };

      /*
       * NOTE:
       *
       * bookingFieldsResponses has intentionally been removed.
       *
       * Your previous Cal.com error:
       *
       * error_required_field
       *
       * indicates that the previous "notes" field did not
       * match the configured booking field.
       *
       * Once the exact Cal.com custom field key is known,
       * the message can be added safely.
       */

      console.log("Cal.com booking payload:", payload);

      const response = await fetch(BOOKINGS_API, {
        method: "POST",
        headers: getHeaders(BOOKING_API_VERSION),
        body: JSON.stringify(payload),
      });

      const elapsed = (
        (performance.now() - bookingStart) /
        1000
      ).toFixed(2);

      console.log(
        `Cal.com booking API: ${elapsed}s`
      );

      const contentType =
        response.headers.get("content-type") || "";

      let data = null;

      if (contentType.includes("application/json")) {
        data = await response.json();
      }

      if (!response.ok) {
        console.error(
          "Cal.com booking response:",
          data
        );

        const apiMessage =
          data?.message ||
          data?.error ||
          data?.detail ||
          data?.title;

        throw new Error(
          typeof apiMessage === "string"
            ? apiMessage
            : "Unable to create booking."
        );
      }

      /*
       * Show success immediately.
       */

      setStep(4);

      /*
       * Refresh local day cache in background.
       *
       * This does NOT delay the success screen.
       */

      const dateKey = getDateKey(selectedDate);

      DAY_CACHE.delete(dateKey);

      fetchDaySlots(
        selectedDate,
        true
      ).catch(() => {});

    } catch (err) {
      console.error(
        "Booking error:",
        err
      );

      setBookingError(
        typeof err?.message === "string"
          ? err.message
          : "Something went wrong while booking your consultation."
      );
    } finally {
      setBooking(false);
    }
  };

  /*
   * ---------------------------------------------------------
   * RESET
   * ---------------------------------------------------------
   */

  const resetBooking = () => {
    setStep(1);

    setSelectedDate(null);
    setSelectedSlot(null);

    setSlots([]);

    setError("");
    setBookingError("");

    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  /*
   * ---------------------------------------------------------
   * CALENDAR
   * ---------------------------------------------------------
   */

  const calendarDays = useMemo(() => {
    return getMonthDays(currentMonth);
  }, [currentMonth]);

  const monthTitle = currentMonth.toLocaleDateString(
    "en-US",
    {
      month: "long",
      year: "numeric",
    }
  );

  /*
   * ---------------------------------------------------------
   * RENDER
   * ---------------------------------------------------------
   */

  return (
    <section className="w-full bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">

        {/* LEFT SIDE */}

        <div className="w-full">

          <h2 className="max-w-2xl text-4xl font-bold leading-tight text-gray-950 sm:text-5xl lg:text-6xl">
            Let&apos;s discuss your
            <span className="text-orange-500">
              {" "}project
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600 sm:text-xl">
            Book a free consultation and let&apos;s talk
            about your project, requirements, goals,
            and the best way to move forward.
          </p>

          <div className="mt-8 space-y-5">

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
                <CalendarDays size={21} />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Choose a convenient date
                </h3>

                <p className="mt-1 text-base text-gray-500">
                  Pick any available date from the calendar.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
                <Clock3 size={21} />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Select your time
                </h3>

                <p className="mt-1 text-base text-gray-500">
                  Choose the time that works best for you.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
                <CheckCircle2 size={21} />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Completely free
                </h3>

                <p className="mt-1 text-base text-gray-500">
                  No payment is required to book your consultation.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="w-full">
          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">

            {/* STEP 1 */}

            {step === 1 && (
              <div className="p-6 sm:p-8">

                <div className="mb-7 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-500">
                      Step 1 of 3
                    </p>

                    <h3 className="mt-1 text-2xl font-bold text-gray-900">
                      Choose a date
                    </h3>
                  </div>

                  {loadingMonth && (
                    <Loader2
                      className="animate-spin text-orange-500"
                      size={22}
                    />
                  )}
                </div>

                <div className="mb-6 flex items-center justify-between">

                  <button
                    type="button"
                    onClick={goPreviousMonth}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 transition hover:border-orange-300 hover:bg-orange-50"
                  >
                    <ArrowLeft size={19} />
                  </button>

                  <h4 className="text-xl font-semibold text-gray-900">
                    {monthTitle}
                  </h4>

                  <button
                    type="button"
                    onClick={goNextMonth}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 transition hover:border-orange-300 hover:bg-orange-50"
                  >
                    <ArrowRight size={19} />
                  </button>

                </div>

                <div className="grid grid-cols-7 gap-2 text-center">

                  {[
                    "Sun",
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                  ].map((day) => (
                    <div
                      key={day}
                      className="py-2 text-sm font-semibold text-gray-400"
                    >
                      {day}
                    </div>
                  ))}

                  {calendarDays.map((date, index) => {

                    if (!date) {
                      return (
                        <div
                          key={`empty-${index}`}
                        />
                      );
                    }

                    const key = getDateKey(date);

                    const available =
                      availableDays.has(key);

                    const past =
                      isPastDay(date);

                    const selected =
                      selectedDate &&
                      isSameDay(
                        date,
                        selectedDate
                      );

                    return (
                      <button
                        key={key}
                        type="button"
                        disabled={!available || past}
                        onMouseEnter={() => {
                          if (
                            available &&
                            !past
                          ) {
                            preloadDay(date);
                          }
                        }}
                        onFocus={() => {
                          if (
                            available &&
                            !past
                          ) {
                            preloadDay(date);
                          }
                        }}
                        onClick={() =>
                          handleDateSelect(date)
                        }
                        className={[
                          "h-12 rounded-xl text-base font-medium transition-all sm:h-14",

                          selected
                            ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                            : "",

                          !selected &&
                          available &&
                          !past
                            ? "bg-orange-50 text-orange-600 hover:bg-orange-100"
                            : "",

                          !available || past
                            ? "cursor-not-allowed text-gray-300"
                            : "",
                        ].join(" ")}
                      >
                        {date.getDate()}
                      </button>
                    );
                  })}

                </div>

                {error && (
                  <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </p>
                )}

              </div>
            )}

            {/* STEP 2 */}

            {step === 2 && (
              <div className="p-6 sm:p-8">

                <div className="mb-7 flex items-center justify-between">

                  <div>

                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-orange-500"
                    >
                      <ArrowLeft size={16} />
                      Back
                    </button>

                    <p className="text-sm font-medium text-orange-500">
                      Step 2 of 3
                    </p>

                    <h3 className="mt-1 text-2xl font-bold text-gray-900">
                      Choose a time
                    </h3>

                    {selectedDate && (
                      <p className="mt-2 text-gray-500">
                        {selectedDate.toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </p>
                    )}

                  </div>

                  {loadingSlots && (
                    <Loader2
                      className="animate-spin text-orange-500"
                      size={22}
                    />
                  )}

                </div>

                <div className="max-h-[360px] overflow-y-auto pr-1">

                  {loadingSlots &&
                  slots.length === 0 ? (
                    <div className="flex min-h-[250px] items-center justify-center">

                      <div className="text-center">

                        <Loader2
                          size={30}
                          className="mx-auto animate-spin text-orange-500"
                        />

                        <p className="mt-3 text-sm text-gray-500">
                          Loading available times...
                        </p>

                      </div>

                    </div>
                  ) : slots.length === 0 ? (

                    <div className="rounded-2xl bg-gray-50 p-8 text-center">

                      <Clock3
                        size={30}
                        className="mx-auto text-gray-400"
                      />

                      <p className="mt-3 font-medium text-gray-700">
                        No available times
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Please choose another date.
                      </p>

                    </div>

                  ) : (

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

                      {slots.map(
                        (slot, index) => (
                          <button
                            type="button"
                            key={`${slot.start}-${index}`}
                            onClick={() =>
                              handleSlotSelect(slot)
                            }
                            className="rounded-xl border border-gray-200 bg-white px-4 py-4 text-base font-semibold text-gray-800 transition hover:border-orange-400 hover:bg-orange-50 hover:text-orange-600"
                          >
                            {slot.time}
                          </button>
                        )
                      )}

                    </div>
                  )}

                </div>
              </div>
            )}

            {/* STEP 3 */}

            {step === 3 && (
              <form
                onSubmit={handleBooking}
                className="p-6 sm:p-8"
              >

                <div className="mb-7">

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={booking}
                    className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-orange-500 disabled:opacity-50"
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>

                  <p className="text-sm font-medium text-orange-500">
                    Step 3 of 3
                  </p>

                  <h3 className="mt-1 text-2xl font-bold text-gray-900">
                    Your details
                  </h3>

                  {selectedDate &&
                    selectedSlot && (
                      <div className="mt-4 rounded-2xl bg-orange-50 p-4">

                        <div className="flex items-center gap-3">

                          <CalendarDays
                            size={20}
                            className="text-orange-500"
                          />

                          <div>

                            <p className="text-sm text-gray-500">
                              Consultation
                            </p>

                            <p className="font-semibold text-gray-900">

                              {selectedDate.toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "long",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}

                              {" "}·{" "}

                              {selectedSlot.time}

                            </p>

                          </div>

                        </div>

                      </div>
                    )}

                </div>

                <div className="space-y-5">

                  {/* NAME */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-800">
                      Your name
                    </label>

                    <div className="relative">

                      <User
                        size={19}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        autoComplete="name"
                        disabled={booking}
                        className="w-full rounded-xl border border-gray-200 py-4 pl-12 pr-4 text-base outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100 disabled:bg-gray-50"
                      />

                    </div>
                  </div>

                  {/* EMAIL */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-800">
                      Email address
                    </label>

                    <div className="relative">

                      <Mail
                        size={19}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        autoComplete="email"
                        disabled={booking}
                        className="w-full rounded-xl border border-gray-200 py-4 pl-12 pr-4 text-base outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100 disabled:bg-gray-50"
                      />

                    </div>
                  </div>

                  {/* MESSAGE */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-800">

                      Message

                      <span className="ml-1 font-normal text-gray-400">
                        (optional)
                      </span>

                    </label>

                    <div className="relative">

                      <MessageSquare
                        size={19}
                        className="absolute left-4 top-4 text-gray-400"
                      />

                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us briefly about your project..."
                        rows={4}
                        disabled={booking}
                        className="w-full resize-none rounded-xl border border-gray-200 py-4 pl-12 pr-4 text-base outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100 disabled:bg-gray-50"
                      />

                    </div>
                  </div>

                  {/* ERROR */}

                  {bookingError && (
                    <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                      {bookingError}
                    </div>
                  )}

                  {/* SUBMIT */}

                  <button
                    type="submit"
                    disabled={!isFormValid || booking}
                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-orange-500 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    {booking ? (
                      <>
                        <Loader2
                          size={20}
                          className="animate-spin"
                        />

                        Booking...
                      </>
                    ) : (
                      <>
                        Confirm Booking
                        <ArrowRight size={20} />
                      </>
                    )}

                  </button>

                </div>

              </form>
            )}

            {/* STEP 4 */}

            {step === 4 && (
              <div className="flex min-h-[500px] items-center justify-center p-8">

                <div className="max-w-md text-center">

                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">

                    <CheckCircle2
                      size={42}
                      className="text-primary-500"
                    />

                  </div>

                  <h3 className="mt-7 text-3xl font-bold text-gray-900">
                    Booking confirmed!
                  </h3>

                  <p className="mt-4 text-base leading-7 text-gray-500">
                    Your consultation has been booked successfully.
                    You&apos;ll receive the confirmation details on your
                    email.
                  </p>

                  {selectedDate &&
                    selectedSlot && (
                      <div className="mt-6 rounded-2xl bg-gray-50 p-5 text-left">

                        <div className="flex items-center gap-3">

                          <CalendarDays
                            size={20}
                            className="text-orange-500"
                          />

                          <div>

                            <p className="text-sm text-gray-500">
                              Date &amp; time
                            </p>

                            <p className="font-semibold text-gray-900">

                              {selectedDate.toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "long",
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}

                            </p>

                            <p className="mt-1 font-medium text-orange-500">
                              {selectedSlot.time}
                            </p>

                          </div>

                        </div>

                      </div>
                    )}

                  <button
                    type="button"
                    onClick={resetBooking}
                    className="mt-7 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
                  >
                    Book another consultation
                  </button>

                </div>

              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}