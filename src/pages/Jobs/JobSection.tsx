import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllJobsQuery } from "@/redux/features/job/jobApi";

const JobSection = () => {
  const { data: jobs, isLoading } = useGetAllJobsQuery();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(3)].map((_, idx) => (
          <Skeleton key={idx} className="h-[200px] w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {jobs?.map((job) => (
        <Card
          key={job._id}
          className="hover:shadow-xl transition-all duration-300"
        >
          <CardHeader>
            <img
              src={job.bannerImage}
              alt={job.title}
              className="w-full h-[160px] object-cover rounded-md"
            />
          </CardHeader>
          <CardContent className="space-y-2">
            <CardTitle className="text-xl font-semibold">{job.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{job.category}</p>
            <p className="text-sm">
              💰 {job.minPrice} - {job.maxPrice} BDT
            </p>
            <p className="text-sm">📅 Deadline: {job.deadline}</p>
            <p className="text-sm capitalize">📍 {job.workMode}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default JobSection;
