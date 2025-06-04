import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
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
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Briefcase, MapPin, DollarSign, Clock } from "lucide-react";
import {
  fetchJobs,
  setJobFilters,
  clearJobFilters,
} from "@/redux/features/jobSlice";
import type { RootState } from "@/redux/store";
import type { JobListing } from "@/types/job";
import JobForm from "@/components/form/jobs/JobForm";
import ProposalForm from "@/components/form/jobs/ProposalForm";
import { useState } from "react";

export default function JobSection() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { jobs, loading, error, jobFilters } = useSelector(
    (state: RootState) => state.jobs
  );
  const [isJobFormOpen, setIsJobFormOpen] = useState(false);
  const [isProposalFormOpen, setIsProposalFormOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);

  useEffect(() => {
    dispatch(fetchJobs(jobFilters));
  }, [dispatch, jobFilters]);

  const handleSearch = (value: string) => {
    dispatch(setJobFilters({ search: value }));
  };

  const handleClearFilters = () => {
    dispatch(clearJobFilters());
  };

  const handleApply = (job: JobListing) => {
    setSelectedJob(job);
    setIsProposalFormOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Job Opportunities</h1>
        <Dialog open={isJobFormOpen} onOpenChange={setIsJobFormOpen}>
          <DialogTrigger asChild>
            <Button>
              <Briefcase className="mr-2 h-4 w-4" />
              Post a Job
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Post a New Job</DialogTitle>
            </DialogHeader>
            <JobForm onSuccess={() => setIsJobFormOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search jobs..."
          value={jobFilters.search || ""}
          onChange={(e) => handleSearch(e.target.value)}
          className="max-w-sm"
        />
        <Button variant="outline" onClick={handleClearFilters}>
          Clear Filters
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <Card key={job.id}>
            <CardHeader>
              <CardTitle>{job.title}</CardTitle>
              <CardDescription>
                {job.employer.name} • {job.location.type}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{job.type}</Badge>
                  <Badge
                    variant={
                      job.status === "open"
                        ? "default"
                        : job.status === "in-progress"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {job.status}
                  </Badge>
                </div>
                <p className="text-sm">
                  <span className="font-medium">Budget:</span>{" "}
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    {job.budget.min} - {job.budget.max} {job.budget.currency}
                  </span>
                </p>
                <p className="text-sm">
                  <span className="font-medium">Duration:</span>{" "}
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {job.duration}
                  </span>
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
              {job.status === "open" && (
                <Button className="w-full" onClick={() => handleApply(job)}>
                  Apply Now
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isProposalFormOpen} onOpenChange={setIsProposalFormOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Submit Proposal</DialogTitle>
          </DialogHeader>
          {selectedJob && (
            <ProposalForm
              jobId={selectedJob.id}
              onSuccess={() => setIsProposalFormOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
