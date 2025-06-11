import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const images = [
  "https://i.postimg.cc/Z5bLGhjn/campus-img-2.png",
  "https://i.postimg.cc/G3jKq2JV/sheikh-kamal-it-business-incubator-feature-image.webp",
  "https://i.postimg.cc/d1j2HHdr/maxresdefault.jpg",
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden text-white font-roboto">
      {/* Background Image Carousel */}
      <motion.div
        key={currentImage}
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${images[currentImage]})`,
        }}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* Dark Overlay with Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-6 text-center">
        <div className="max-w-3xl">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.0 }}
          >
            Welcome to AcademicMS
          </motion.h1>

          <motion.p
            className="text-lg md:text-2xl text-gray-200 mb-10"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.2 }}
          >
            Powering the future of Computer Science Education — manage courses,
            track progress, and transform learning experiences.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.4 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-700 font-semibold hover:bg-gray-100 transition duration-300"
            >
              <Link to="/register">Get Started</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 transition duration-300"
            >
              <Link to="/courses">Explore Courses</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
