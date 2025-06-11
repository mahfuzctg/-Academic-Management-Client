import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function Hero() {
  const shapes = [
    {
      top: "10%",
      left: "5%",
      size: "w-10 h-10",
      delay: 0,
      src: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    {
      top: "20%",
      right: "10%",
      size: "w-8 h-8",
      delay: 1,
      src: "https://randomuser.me/api/portraits/women/22.jpg",
    },
    {
      bottom: "15%",
      left: "10%",
      size: "w-12 h-12",
      delay: 0.5,
      src: "https://randomuser.me/api/portraits/men/33.jpg",
    },
    {
      bottom: "25%",
      right: "5%",
      size: "w-9 h-9",
      delay: 1.2,
      src: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      top: "30%",
      left: "50%",
      size: "w-6 h-6",
      delay: 0.8,
      src: "https://randomuser.me/api/portraits/men/55.jpg",
    },
    {
      top: "40%",
      left: "40%",
      size: "w-7 h-7",
      delay: 0.3,
      src: "https://randomuser.me/api/portraits/women/66.jpg",
    },
    {
      bottom: "35%",
      right: "15%",
      size: "w-5 h-5",
      delay: 0.9,
      src: "https://randomuser.me/api/portraits/men/77.jpg",
    },
    {
      top: "50%",
      right: "20%",
      size: "w-11 h-11",
      delay: 1.5,
      src: "https://randomuser.me/api/portraits/women/88.jpg",
    },
    {
      bottom: "5%",
      left: "20%",
      size: "w-6 h-6",
      delay: 0.7,
      src: "https://randomuser.me/api/portraits/men/99.jpg",
    },
    {
      top: "60%",
      left: "15%",
      size: "w-4 h-4",
      delay: 1.1,
      src: "https://i.postimg.cc/qM8gzy7Y/education-concept-vector-5127163.jpg",
    },
    {
      bottom: "10%",
      right: "30%",
      size: "w-9 h-9",
      delay: 0.6,
      src: "https://i.postimg.cc/qM8gzy7Y/education-concept-vector-5127163.jpg",
    },
    {
      top: "5%",
      right: "25%",
      size: "w-7 h-7",
      delay: 1.3,
      src: "https://i.postimg.cc/qM8gzy7Y/education-concept-vector-5127163.jpg",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden h-[100vh] bg-background font-roboto py-20 transition-colors">
      {/* Animated Background Shapes */}
      {shapes.map((shape, index) => (
        <motion.img
          key={index}
          src={shape.src}
          alt={`shape-${index}`}
          className={`absolute rounded-full object-cover ${shape.size}`}
          style={{
            top: shape.top,
            left: shape.left,
            right: shape.right,
            bottom: shape.bottom,
          }}
          initial={{ y: 0, opacity: 0.4 }}
          animate={{ y: -20, opacity: 1 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: shape.delay,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.h1
          className="text-xl md:text-4xl font-extrabold text-card-foreground mb-4"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Streamline Academic Management <br /> with Confidence
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground mb-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Simplify course administration, monitor student progress, and enhance
          collaboration — all in one powerful platform.
        </motion.p>

        {/* Email Input + Button */}
        <motion.div
          className="flex items-center justify-center gap-2 flex-wrap sm:flex-nowrap max-w-xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex items-center w-full sm:w-auto bg-card px-4 py-3 rounded-full shadow-md border text-foreground">
            <Search className="text-muted-foreground mr-2" size={20} />
            <input
              type="search"
              placeholder="Find your dreams!"
              className="outline-none text-sm bg-transparent w-full placeholder:text-muted-foreground text-foreground"
            />
          </div>
          <Button className="rounded-full px-6 font-medium mt-4 md:-mt-0">
            Explore
          </Button>
        </motion.div>
      </div>

      {/* Bottom Illustration and Curve */}

      <div className="absolute bottom-0 left-0 w-full">
        <svg
          className="w-full h-32 md:h-60"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            d="M0,224L60,208C120,192,240,160,360,138.7C480,117,600,107,720,122.7C840,139,960,181,1080,181.3C1200,181,1320,139,1380,117.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            className="fill-[#e5e5f7] dark:fill-[#111827]"
          />
        </svg>
      </div>
    </section>
  );
}
