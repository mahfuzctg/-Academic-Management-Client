import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSingleFacultyQuery } from "@/redux/features/faculty/facultyApi";
import React from "react";
import { useParams } from "react-router-dom";

const FacultyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <p className="p-6 text-center text-red-600">Invalid Faculty ID.</p>;
  }

  const { data: response, isLoading, error } = useGetSingleFacultyQuery(id);

  if (isLoading)
    return (
      <div className="w-10/12 mx-auto py-10">
        <Skeleton className="h-8 w-64 mb-6" />
        <Skeleton className="h-44 w-full rounded-xl mb-6" />
        <Skeleton className="h-6 w-48 mb-2" />
        <Skeleton className="h-6 w-48 mb-2" />
        <Skeleton className="h-6 w-64 mb-2" />
      </div>
    );

  if (error || !response?.data)
    return (
      <div className="w-10/12 mx-auto py-10 text-center text-red-600">
        Faculty not found or error occurred.
      </div>
    );

  const faculty = response.data;

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold">{faculty.name}</h1>
      <Badge>{faculty.title}</Badge>

      {faculty.image && (
        <img
          src={faculty.image}
          alt={faculty.name}
          className="w-full h-64 object-cover rounded-lg"
        />
      )}

      <div className="flex items-center gap-6 pt-4">
        <div className="flex flex-col">
          <span className="font-semibold">Email:</span>
          <a
            href={`mailto:${faculty.email}`}
            className="text-blue-600 underline"
          >
            {faculty.email}
          </a>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">Phone:</span>
          <a href={`tel:${faculty.phone}`} className="text-blue-600 underline">
            {faculty.phone}
          </a>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Academic Department</h2>
        <p>{faculty.academicDepartment?.name || "N/A"}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Academic Faculty</h2>
        <p>{faculty.academicFaculty?.name || "N/A"}</p>
      </div>

      <div className="pt-6">
        <Button
          onClick={() => window.history.back()}
          variant="outline"
          className="w-full max-w-xs"
        >
          Back to List
        </Button>
      </div>
    </div>
  );
};

export default FacultyDetailsPage;
