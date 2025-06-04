import { useState } from "react";
import { motion } from "framer-motion";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGetAllJobsQuery } from "@/redux/features/job/jobApi";
import type { JobListing } from "@/types/job";

const JobManagement = () => {
  const user = useAppSelector(selectCurrentUser);
  const { data: jobsData, isLoading, error } = useGetAllJobsQuery({});
  const [filters, setFilters] = useState({
    search: "",
    type: "",
    department: "",
  });

  const jobs = jobsData?.data || [];

  const filteredJobs = jobs.filter((job: JobListing) => {
    const matchesSearch =
      !filters.search ||
      job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      job.employer.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      job.location.type.toLowerCase().includes(filters.search.toLowerCase());

    const matchesType = !filters.type || job.type === filters.type;
    const matchesDepartment =
      !filters.department || job.department === filters.department;

    return matchesSearch && matchesType && matchesDepartment;
  });

  const handleSearch = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value }));
  };

  const handleTypeChange = (value: string) => {
    setFilters((prev) => ({ ...prev, type: value }));
  };

  const handleDepartmentChange = (value: string) => {
    setFilters((prev) => ({ ...prev, department: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      type: "",
      department: "",
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "full-time":
        return "bg-blue-100 text-blue-800";
      case "part-time":
        return "bg-green-100 text-green-800";
      case "freelance":
        return "bg-purple-100 text-purple-800";
      case "internship":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500">
        Error: {error instanceof Error ? error.message : "Failed to load jobs"}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-6"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Job & Freelance Marketplace</h1>
        <p className="text-muted-foreground">
          Find opportunities or post jobs to connect with talented professionals
        </p>
      </div>

      {user ? (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-4 mb-6">
            <Input
              placeholder="Search jobs..."
              value={filters.search}
              onChange={(e) => handleSearch(e.target.value)}
              className="max-w-sm"
            />
            <Select value={filters.type} onValueChange={handleTypeChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full Time</SelectItem>
                <SelectItem value="part-time">Part Time</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filters.department}
              onValueChange={handleDepartmentChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="computer-science">
                  Computer Science
                </SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="arts">Arts</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleClearFilters}>
              Clear Filters
            </Button>
          </div>

          <div className="grid gap-6">
            {filteredJobs.map((job: JobListing) => (
              <Card key={job.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <p className="text-muted-foreground mt-1">
                        {job.employer.name} • {job.location.type}
                      </p>
                    </div>
                    <Badge className={getTypeColor(job.type)}>
                      {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Description</h4>
                      <p className="text-muted-foreground">{job.description}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Requirements</h4>
                      <ul className="list-disc list-inside text-muted-foreground">
                        {job.requirements.map((req: string, index: number) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-between items-center pt-4">
                      <div className="text-sm text-muted-foreground">
                        <p>Posted: {job.postedDate}</p>
                        <p>Deadline: {job.deadline}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline">View Details</Button>
                        <Button>Apply Now</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">
            Please log in to access the job marketplace
          </h2>
          <p className="text-muted-foreground">
            You need to be logged in to view and apply for jobs
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default JobManagement;
