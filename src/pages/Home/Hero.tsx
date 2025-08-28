import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const reviews = [
  {
    top: "10%",
    left: "5%",
    size: "text-xs",
    delay: 0,
    text: "VLSI",
    img: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    top: "20%",
    right: "5%",
    size: "text-xs",
    delay: 1.5,
    text: "Microprocessor",
    img: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    top: "35%",
    left: "12%",
    size: "text-xs",
    delay: 2.8,
    text: "Machine Learning",
    img: "https://randomuser.me/api/portraits/men/13.jpg",
  },
  {
    top: "45%",
    right: "12%",
    size: "text-xs",
    delay: 3.8,
    text: "Fourier",
    img: "https://randomuser.me/api/portraits/women/14.jpg",
  },
  {
    bottom: "40%",
    left: "10%",
    size: "text-xs",
    delay: 4.5,
    text: "Lapsus",
    img: "https://randomuser.me/api/portraits/men/15.jpg",
  },
  {
    bottom: "30%",
    right: "10%",
    size: "text-xs",
    delay: 5.5,
    text: "Vector",
    img: "https://randomuser.me/api/portraits/women/16.jpg",
  },
  {
    bottom: "22%",
    left: "15%",
    size: "text-xs",
    delay: 6.2,
    text: "DLD",
    img: "https://randomuser.me/api/portraits/men/17.jpg",
  },
  {
    bottom: "15%",
    right: "15%",
    size: "text-xs",
    delay: 7.2,
    text: "Satellite",
    img: "https://randomuser.me/api/portraits/women/18.jpg",
  },
  {
    top: "65%",
    left: "8%",
    size: "text-xs",
    delay: 8,
    text: "C, C++",
    img: "https://randomuser.me/api/portraits/men/19.jpg",
  },
  {
    top: "70%",
    right: "8%",
    size: "text-xs",
    delay: 9,
    text: "Web & Software Dev",
    img: "https://randomuser.me/api/portraits/women/20.jpg",
  },
];

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section
      className="relative w-full overflow-hidden h-[100vh] font-roboto transition-colors
        bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(59,130,246,0.1) 1px, transparent 1px),
           radial-gradient(circle, rgba(59,130,246,0.1) 1px, transparent 1px)`,
        backgroundPosition: "0 0, 10px 10px",
        backgroundSize: "20px 20px",
      }}
    >
      {/* Floating Keywords */}
      {reviews.map((review, index) => (
        <motion.div
          key={index}
          className={`absolute select-none rounded-full bg-white/70 dark:bg-gray-800/70 shadow-lg backdrop-blur-sm px-5 py-2 flex items-center gap-3 ${review.size} font-semibold text-gray-700 dark:text-gray-200 border border-blue-300 dark:border-blue-700`}
          style={{
            top: review.top,
            left: review.left,
            right: review.right,
            bottom: review.bottom,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            userSelect: "none",
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: review.delay,
          }}
        >
          <img
            src={review.img}
            alt="Student"
            className="w-7 h-7 rounded-full object-cover border-2 border-blue-500 dark:border-blue-400"
            loading="lazy"
          />
          {review.text}
        </motion.div>
      ))}

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center pt-24 text-center h-full max-w-3xl mx-auto px-4">
        <motion.h1
          className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-snug"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Empowering Students & Faculties <br /> Through Seamless Management
        </motion.h1>

        <motion.p
          className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-10 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          Centralize academic operations, automate tasks, and foster
          collaboration across departments with our smart academic platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Button
            className="rounded-full px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => navigate("/blogs")}
          >
            Get Started
          </Button>
        </motion.div>
      </div>

      {/* Bottom SVG Wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          className="w-full h-32 md:h-60"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            d="M0,224L60,208C120,192,240,160,360,138.7C480,117,600,107,720,122.7C840,139,960,181,1080,181.3C1200,181,1320,139,1380,117.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            className="fill-blue-200 dark:fill-blue-900"
          />
        </svg>
      </div>
    </section>
  );
}
