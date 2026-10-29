import {
  Users,
  Trophy,
  Repeat,
  MessagesSquare,
  ArrowRight,
} from "lucide-react"

import { motion } from "framer-motion"
import Button from "./ui/Button.jsx"

const features = [
  {
    icon: Users,
    title: "Experts with industry experience",
    desc: "Experienced designers and engineers creating high quality digital products.",
  },
  {
    icon: Trophy,
    title: "Your success is our success",
    desc: "We focus on solutions that help your business grow and perform better.",
  },
  {
    icon: Repeat,
    title: "Agile development process",
    desc: "Transparent workflow with fast iterations and continuous improvements.",
  },
  {
    icon: MessagesSquare,
    title: "Open communication",
    desc: "Clear discussions and collaboration throughout the project journey.",
  },
]

export default function WhyChooseUs(){
  return (
    <section
      id="why-us"
      className="
        relative
        py-24
        overflow-hidden
        bg-[#0A0D14]
        text-white
      "
    >
      {/* Background Glow */}
      <div
        className="
          absolute
          right-[-150px]
          top-20
          w-[400px]
          h-[400px]
          rounded-full
          bg-blue-600/10
          blur-3xl
        "
      />

      <div className="container-app relative mx-auto px-4 max-w-7xl">

        {/* TITLE */}
        <motion.div
          initial={{ opacity:0, y:30 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <p className="text-md font-bold uppercase tracking-[0.35em] text-blue-500">
            Why choose us
          </p>

          <h2 className="mt-4 text-4xl md:text-5xl font-bold leading-tight text-white">
            Building Mobile Apps, AI Powered Systems & Digital Transformation that help businesses{" "}
            <span className="text-blue-500">
              grow.
            </span>
          </h2>

          <p className="mt-5 text-gray-400 leading-relaxed">
            A team of designers and engineers creating
            scalable, modern and high performance solutions.
          </p>
        </motion.div>

        {/* MAIN DESIGN */}
        <div className="relative max-w-6xl mx-auto min-h-[900px] md:min-h-[600px]">

          {/* ELECTRIC BLUE BACKGROUND BOX */}
          <motion.div
            initial={{ opacity:0, scale:.96 }}
            whileInView={{ opacity:1, scale:1 }}
            viewport={{ once:true }}
            transition={{ duration:.7 }}
            className="
              relative
              min-h-[650px]
              md:min-h-[560px]
              rounded-[35px]
              md:rounded-[45px]
              bg-blue-600
              overflow-hidden
              p-7
              md:p-12
              shadow-2xl
            "
          >
            <div className="absolute right-[-100px] bottom-[-100px] w-[300px] h-[300px] rounded-full bg-white/10 blur-3xl" />

            {/* CONTENT INSIDE BLUE BOX */}
            <div className="relative max-w-md text-white pt-4 md:absolute md:left-12 md:bottom-12">
              <p className="text-xs uppercase tracking-[0.3em] text-blue-100 font-semibold">
                WHY US
              </p>

              <h3 className="mt-4 text-3xl md:text-5xl font-bold leading-tight text-white">
                Creating products
                people love to use.
              </h3>

              <p className="mt-5 text-blue-50 leading-relaxed text-sm md:text-base">
                From idea to launch, we create powerful
                digital experiences that grow businesses.
              </p>

              <div className="mt-8 flex gap-8 md:gap-12">
                <div>
                  <h4 className="text-3xl md:text-4xl font-bold text-white">
                    50+
                  </h4>
                  <p className="text-blue-100 text-sm">
                    Projects
                  </p>
                </div>

                <div>
                  <h4 className="text-3xl md:text-4xl font-bold text-white">
                    10+
                  </h4>
                  <p className="text-blue-100 text-sm">
                    Experts
                  </p>
                </div>
              </div>

              <Button
                to="/about-us"
                icon={ArrowRight}
                className="mt-7 !bg-white !text-gray-900 hover:!bg-gray-100"
              >
                Learn More
              </Button>
            </div>
          </motion.div>

          {/* DARK THEME FEATURE CARD (RIGHT OVERLAY) */}
          <motion.div
            initial={{ opacity:0, y:40 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:.7 }}
            className="
              relative
              mt-[-120px]
              mx-5
              md:absolute
              md:mt-0
              md:top-10
              md:right-10
              md:w-[52%]
              bg-[#121824]
              border
              border-gray-800
              backdrop-blur-xl
              rounded-[32px]
              shadow-[0_25px_70px_rgba(0,0,0,.4)]
              p-6
              md:p-8
              z-25
            "
          >
            <div className="grid grid-cols-1 gap-4">
              {features.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity:0, x:20 }}
                    whileInView={{ opacity:1, x:0 }}
                    viewport={{ once:true }}
                    transition={{ delay: index * .08 }}
                    whileHover={{ x: 5 }}
                    className="
                      flex
                      gap-4
                      items-start
                      p-3
                      rounded-2xl
                      hover:bg-gray-800/50
                      transition
                    "
                  >
                    <div className="w-11 h-11 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-500 grid place-items-center shrink-0">
                      <Icon size={21} />
                    </div>

                    <div>
                      <h4 className="font-bold text-sm md:text-base text-white">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-xs md:text-sm text-gray-300 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
