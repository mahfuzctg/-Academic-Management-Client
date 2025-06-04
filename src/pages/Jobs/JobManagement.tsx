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
import {
  useGetAllJobsQuery,
  useDeleteJobMutation,
  useUpdateJobStatusMutation,
} from "@/redux/features/job/jobApi";
import type { JobListing, JobType, JobFilters } from "@/types/job";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const JobManagement = () => {
  const user = useAppSelector(selectCurrentUser);
  const [filters, setFilters] = useState<JobFilters>({});
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedJob, setEditedJob] = useState<Partial<JobListing>>({});

  const { data: jobsData, isLoading, error } = useGetAllJobsQuery(filters);
  const [deleteJob] = useDeleteJobMutation();
  const [updateJobStatus] = useUpdateJobStatusMutation();

  const jobs = jobsData?.data || [];
  const isAdmin = user?.role === "admin";

  const canManageJob = (job: JobListing) => {
    return isAdmin || job.employer.id === user?.id;
  };

  const filteredJobs = jobs.filter((job: JobListing) => {
    const matchesSearch =
      !filters.search ||
      job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      job.employer.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      job.location.type.toLowerCase().includes(filters.search.toLowerCase());

    const matchesType = !filters.type || job.type === filters.type;
    const matchesStatus = !filters.status || job.status === filters.status;

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleSearch = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value }));
  };

  const handleTypeChange = (value: JobType) => {
    setFilters((prev) => ({ ...prev, type: value }));
  };

  const handleStatusChange = (value: "open" | "closed" | "in-progress") => {
    setFilters((prev) => ({ ...prev, status: value }));
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const handleDeleteJob = async () => {
    if (!selectedJob) return;

    try {
      await deleteJob(selectedJob.id).unwrap();
      toast.success("Job deleted successfully");
      setIsDeleteDialogOpen(false);
      setSelectedJob(null);
    } catch (error) {
      toast.error("Failed to delete job");
    }
  };

  const handleUpdateStatus = async (
    jobId: string,
    status: "open" | "closed" | "in-progress"
  ) => {
    try {
      await updateJobStatus({ jobId, status }).unwrap();
      toast.success("Job status updated successfully");
    } catch (error) {
      toast.error("Failed to update job status");
    }
  };

  const handleEditJob = (job: JobListing) => {
    setSelectedJob(job);
    setEditedJob({
      title: job.title,
      description: job.description,
      requirements: job.requirements,
      type: job.type,
      salary: job.salary,
      deadline: job.deadline,
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedJob) return;

    try {
      await updateJobStatus({
        jobId: selectedJob.id,
        ...editedJob,
      }).unwrap();
      toast.success("Job updated successfully");
      setIsEditDialogOpen(false);
      setSelectedJob(null);
      setEditedJob({});
    } catch (error) {
      toast.error("Failed to update job");
    }
  };

  const getTypeColor = (type: JobType) => {
    switch (type) {
      case "full-time":
        return "bg-blue-100 text-blue-800";
      case "part-time":
        return "bg-green-100 text-green-800";
      case "freelance":
        return "bg-purple-100 text-purple-800";
      case "contract":
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
              value={filters.search || ""}
              onChange={(e) => handleSearch(e.target.value)}
              className="max-w-sm"
            />
            <Select value={filters.type || ""} onValueChange={handleTypeChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full Time</SelectItem>
                <SelectItem value="part-time">Part Time</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filters.status || ""}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
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
                    <div className="flex items-center gap-2">
                      <Badge className={getTypeColor(job.type)}>
                        {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
                      </Badge>
                      {canManageJob(job) && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {isAdmin && (
                              <>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleUpdateStatus(job.id, "open")
                                  }
                                  disabled={job.status === "open"}
                                >
                                  Mark as Open
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleUpdateStatus(job.id, "in-progress")
                                  }
                                  disabled={job.status === "in-progress"}
                                >
                                  Mark as In Progress
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleUpdateStatus(job.id, "closed")
                                  }
                                  disabled={job.status === "closed"}
                                >
                                  Mark as Closed
                                </DropdownMenuItem>
                              </>
                            )}
                            <DropdownMenuItem
                              onClick={() => handleEditJob(job)}
                            >
                              <Pencil className="h-4 w-4 mr-2" />
                              Edit Job
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => {
                                setSelectedJob(job);
                                setIsDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Job
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
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
                    {job.salary && (
                      <div>
                        <h4 className="font-medium mb-2">Salary Range</h4>
                        <p className="text-muted-foreground">
                          {job.salary.currency} {job.salary.min} -{" "}
                          {job.salary.max}
                        </p>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-4">
                      <div className="text-sm text-muted-foreground">
                        <p>Posted: {job.postedAt}</p>
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

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the job
              listing and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteJob}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Job</DialogTitle>
            <DialogDescription>
              Make changes to the job listing here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={editedJob.title || ""}
                onChange={(e) =>
                  setEditedJob((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editedJob.description || ""}
                onChange={(e) =>
                  setEditedJob((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="requirements">Requirements (one per line)</Label>
              <Textarea
                id="requirements"
                value={editedJob.requirements?.join("\n") || ""}
                onChange={(e) =>
                  setEditedJob((prev) => ({
                    ...prev,
                    requirements: e.target.value.split("\n"),
                  }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Job Type</Label>
              <Select
                value={editedJob.type || ""}
                onValueChange={(value: JobType) =>
                  setEditedJob((prev) => ({ ...prev, type: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full Time</SelectItem>
                  <SelectItem value="part-time">Part Time</SelectItem>
                  <SelectItem value="freelance">Freelance</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="deadline">Deadline</Label>
              <Input
                id="deadline"
                type="date"
                value={editedJob.deadline || ""}
                onChange={(e) =>
                  setEditedJob((prev) => ({
                    ...prev,
                    deadline: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default JobManagement;
