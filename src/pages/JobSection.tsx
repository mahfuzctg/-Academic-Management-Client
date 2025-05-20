import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  salary: string;
  postedDate: string;
  applied: boolean;
}

export default function JobSection() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "1",
      title: "Frontend Developer",
      company: "Tech Solutions Inc.",
      location: "Remote",
      type: "Full-time",
      description:
        "We are looking for an experienced frontend developer to join our team.",
      requirements: [
        "3+ years of experience with React",
        "Strong knowledge of TypeScript",
        "Experience with modern CSS frameworks",
      ],
      salary: "$80,000 - $100,000",
      postedDate: "2024-03-01",
      applied: false,
    },
    // Add more sample data as needed
  ]);

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApplication = (jobId: string) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, applied: !job.applied } : job
      )
    );

    const job = jobs.find((j) => j.id === jobId);
    if (job) {
      toast({
        title: job.applied ? "Application Withdrawn" : "Application Submitted",
        description: `You have ${
          job.applied ? "withdrawn your application from" : "applied to"
        } ${job.title} at ${job.company}`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Job Opportunities</h1>
        <Button
          onClick={() => {
            toast({
              title: "Coming soon",
              description: "Job posting feature will be available soon.",
            });
          }}
        >
          Post a Job
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search jobs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.map((job) => (
          <Card key={job.id}>
            <CardHeader>
              <CardTitle>{job.title}</CardTitle>
              <CardDescription>
                {job.company} • {job.location}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Type:</span> {job.type}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Salary:</span> {job.salary}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Posted:</span> {job.postedDate}
                </p>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Requirements:</p>
                  <ul className="text-sm list-disc list-inside">
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-sm mt-2">{job.description}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant={job.applied ? "destructive" : "default"}
                className="w-full"
                onClick={() => handleApplication(job.id)}
              >
                {job.applied ? "Withdraw Application" : "Apply Now"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
