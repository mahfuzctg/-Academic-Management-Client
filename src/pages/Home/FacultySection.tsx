import FacultyCard from "@/components/cards/FacultyCard";
import FacultyCardSkeleton from "@/components/skeleton/Home/FacultyCardSkeleton";

import { useGetAllFacultiesQuery } from "@/redux/features/faculty/facultyApi";
import type { TFaculty } from "@/types/faculty";

const FacultySection = () => {
  const { data, isLoading, isError } = useGetAllFacultiesQuery(undefined);

  return (
    <section className="w-9/12 mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Faculty & Staff Directory</h1>

      {isError && <p className="text-red-500">Failed to load faculty data.</p>}

      <div className="grid gap-6 md:grid-cols-2">
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
                image={faculty.profileImg}
              />
            ))}
      </div>
    </section>
  );
};

export default FacultySection;
