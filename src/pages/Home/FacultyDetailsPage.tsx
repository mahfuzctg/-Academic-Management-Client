import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSingleFacultyQuery } from "@/redux/features/faculty/facultyApi";
import { useParams } from "react-router-dom";

const FacultyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetSingleFacultyQuery(id ?? "");

  if (isLoading) {
    return <Skeleton className="h-96 w-full" />;
  }

  if (error || !data?.data) {
    return (
      <div className="text-center text-red-500">Failed to load details</div>
    );
  }

  const faculty = data.data;

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <Card className="flex flex-col sm:flex-row items-center gap-6 p-6 shadow-md">
        <img
          src={faculty.profileImg || "/placeholder-faculty.jpg"}
          alt={`${faculty.name.firstName} ${faculty.name.lastName}`}
          className="w-40 h-40 rounded-full object-cover border"
        />
        <CardContent className="space-y-4 text-center sm:text-left">
          <CardTitle className="text-2xl font-bold">
            {faculty.name.firstName} {faculty.name.middleName ?? ""}{" "}
            {faculty.name.lastName}
          </CardTitle>
          <p className="text-muted-foreground">{faculty.email}</p>

          {/* Static Paragraph */}
          <p className="text-sm text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            dignissim, orci nec dapibus cursus, justo neque suscipit nisi, et
            varius elit justo eget purus. Vivamus vitae orci sapien. Fusce
            finibus, velit in malesuada feugiat, tortor erat tincidunt orci,
            quis posuere augue magna nec mi. Integer sit amet magna in ipsum
            pretium semper.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyDetails;
