import {
  GraduationCap,
  BookOpen,
  Users,
  Briefcase,
  FileText,
  Bell,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: GraduationCap,
    title: "Student Management",
    description:
      "Comprehensive student profile management with academic history tracking and performance analytics.",
  },
  {
    icon: Users,
    title: "Instructor Portal",
    description:
      "Dedicated portal for instructors to manage courses, track student progress, and submit grades.",
  },
  {
    icon: BookOpen,
    title: "Course Enrollment",
    description:
      "Streamlined course registration process with prerequisite validation and real-time availability.",
  },
  {
    icon: FileText,
    title: "Academic Performance",
    description:
      "Track and analyze student performance with detailed grade reports and progress monitoring.",
  },
  {
    icon: Briefcase,
    title: "Job Marketplace",
    description:
      "Connect students and instructors with job opportunities in the academic and professional world.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description:
      "Stay updated with important deadlines, grade updates, and course changes through our notification system.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Academic Management
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our platform provides all the tools you need to manage your academic
            journey effectively.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <feature.icon className="w-6 h-6 text-blue-600" />
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
