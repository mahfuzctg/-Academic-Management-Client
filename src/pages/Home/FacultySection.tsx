import FacultyCard from "@/components/cards/FacultyCard";
import { useGetAllFacultiesQuery } from "@/redux/features/faculty/facultyApi";

const FacultySection = () => {
  const { data, isLoading, isError } = useGetAllFacultiesQuery(undefined);

  if (isLoading) return <p>Loading ...</p>;
  if (isError) return <p>Failed to load faculty data.</p>;

  return (
    <section className="w-9/12 mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Faculty & Staff Directory</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {data?.data?.map((faculty) => (
          <FacultyCard
            key={faculty.id}
            name={`${faculty.name.firstName} ${faculty.name.middleName ?? ""} ${
              faculty.name.lastName
            }`}
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
