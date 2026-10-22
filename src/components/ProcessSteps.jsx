import {  
  motion,  
  useScroll,  
  useTransform  
} from "framer-motion";

import { useRef } from "react";
import { steps } from "../data/process.js";

export default function ProcessSteps() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  const progressHeight = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <section
      ref={sectionRef}
      id="process"
      className="
        relative
        py-28
        bg-white
        overflow-hidden
      "
    >
      <div className="
        max-w-6xl
        mx-auto
        px-6
        relative
      ">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="
            text-center
            mb-20
          "
        >
          <p className="
            text-primary-600
            text-lg
            font-bold
            uppercase
            tracking-[0.35em]
          ">
            Our Process
          </p>

          <h2 className="
            mt-4
            text-3xl
            md:text-5xl
            font-bold
            text-gray-900
          ">
            How we build great products
          </h2>

          <p className="
            mt-4
            text-gray-500
            max-w-xl
            mx-auto
          ">
            A simple and transparent workflow from idea to final product.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="
          relative
        ">

          {/* Background Line */}
          <div className="
            hidden
            md:block
            absolute
            left-1/2
            top-0
            bottom-0
            w-[4px]
            bg-primary-100
            -translate-x-1/2
            rounded-full
            overflow-hidden
          ">
            {/* Dynamic Progress */}
            <motion.div
              style={{ height: progressHeight }}
              className="
                w-full
                rounded-full
                bg-gradient-to-b
                from-primary-600
                via-primary-500
                to-primary-300
                shadow-[0_0_35px_rgba(37,99,235,0.7)]
              "
            />
          </div>

          {steps.map((step, index) => (
            <div
              key={step.title}
              className="
                relative
                mb-24
                md:grid
                md:grid-cols-2
                md:gap-20
                items-center
              "
            >
              {/* Step Number */}
              <div
                className={`
                  hidden
                  md:block
                  absolute
                  left-1/2
                  -translate-x-1/2
                  text-[120px]
                  font-black
                  leading-none
                  select-none
                  z-0
                  ${
                    index % 2 === 0
                      ? "text-primary-500/20 drop-shadow-[0_0_25px_rgba(37,99,235,0.1)]"
                      : "text-gray-300/70"
                  }
                `}
              >
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Card */}
              <div
                className={`
                  relative
                  z-10
                  ${
                    index % 2 === 0
                      ? "md:col-start-2 md:pl-10"
                      : "md:col-start-1 md:pr-10"
                  }
                `}
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    x: index % 2 === 0 ? 80 : -80
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0
                  }}
                  viewport={{
                    once: true,
                    amount: 0.3
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{
                    y: -12
                  }}
                  className="
                    bg-white
                    rounded-[32px]
                    p-8
                    border
                    border-primary-100
                    shadow-[0_25px_80px_rgba(0,0,0,0.08)]
                    hover:shadow-[0_35px_100px_rgba(37,99,235,0.18)]
                    transition-all
                    duration-500
                  "
                >
                  {/* Icon */}
                  <div className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-primary-100
                    flex
                    items-center
                    justify-center
                    text-primary-600
                    mb-6
                  ">
                    <step.icon
                      size={28}
                      strokeWidth={2}
                    />
                  </div>

                  <h3 className="
                    text-2xl
                    font-bold
                    text-gray-900
                  ">
                    {step.title}
                  </h3>

                  <p className="
                    mt-4
                    text-gray-500
                    leading-relaxed
                    text-sm
                    md:text-base
                  ">
                    {step.desc}
                  </p>

                  <div className="
                    flex
                    flex-wrap
                    gap-2
                    mt-6
                  ">
                    {step.participants?.map((item) => (
                      <span
                        key={item}
                        className="
                          px-3
                          py-1.5
                          rounded-full
                          bg-primary-50
                          text-primary-600
                          text-xs
                          font-semibold
                        "
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                </motion.div>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
