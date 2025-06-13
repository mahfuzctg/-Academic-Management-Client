import FacultyCard from "@/components/cards/FacultyCard";
import FacultyCardSkeleton from "@/components/skeleton/Home/FacultyCardSkeleton";
import { useGetAllFacultiesQuery } from "@/redux/features/faculty/facultyApi";
import type { TFaculty } from "@/types/faculty";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const FacultySection = () => {
  const { data, isLoading, isError } = useGetAllFacultiesQuery(undefined);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4 mb-12"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Faculty & Staff Directory
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Meet our distinguished faculty members who are dedicated to academic
          excellence and student success
        </p>
      </motion.div>

      {isError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-12 gap-4"
        >
          <div className="bg-red-100 p-6 rounded-full">
            <GraduationCap className="h-10 w-10 text-red-500" />
          </div>
          <p className="text-red-500 text-center text-lg">
            Failed to load faculty data. Please try again later.
          </p>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid gap-8 md:grid-cols-2"
      >
        {isLoading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <FacultyCardSkeleton key={idx} />
            ))
          : data?.data?.map((faculty: TFaculty) => (
              <FacultyCard
                key={faculty.id}
                name={`${faculty.name.firstName} ${
                  faculty.name.middleName ?? ""
                } ${faculty.name.lastName}`}
                title={faculty.designation}
                email={faculty.email}
                phone={faculty.contactNo}
                department={
                  faculty.academicDepartment?.name || "Unknown Department"
                }
                image={faculty.profileImg || "/placeholder-faculty.jpg"}
              />
            ))}
      </motion.div>
    </section>
  );
};

export default FacultySection;
