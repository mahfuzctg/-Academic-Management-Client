export interface JobListing {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  duration: string;
  type: "full-time" | "part-time" | "contract" | "freelance";
  category: string;
  skills: string[];
  location: {
    type: "remote" | "onsite" | "hybrid";
    address?: string;
  };
  employer: {
    id: string;
    name: string;
    type: "company" | "individual";
    rating?: number;
  };
  status: "open" | "in-progress" | "completed" | "cancelled";
  postedAt: string;
  deadline: string;
  proposals: Proposal[];
}

export interface FreelancerProfile {
  id: string;
  userId: string;
  title: string;
  bio: string;
  skills: string[];
  hourlyRate: number;
  availability: "full-time" | "part-time" | "contract";
  experience: {
    years: number;
    description: string;
  };
  education: {
    degree: string;
    field: string;
    institution: string;
    year: number;
  }[];
  portfolio: {
    title: string;
    description: string;
    url?: string;
  }[];
  rating: number;
  completedJobs: number;
  successRate: number;
  status: "available" | "busy" | "unavailable";
}

export interface Proposal {
  id: string;
  jobId: string;
  freelancerId: string;
  freelancer: FreelancerProfile;
  coverLetter: string;
  bid: number;
  estimatedDuration: string;
  status: "pending" | "accepted" | "rejected";
  submittedAt: string;
}

export interface JobFilters {
  search?: string;
  category?: string;
  type?: JobListing["type"];
  location?: JobListing["location"]["type"];
  minBudget?: number;
  maxBudget?: number;
  skills?: string[];
  status?: JobListing["status"];
}

export interface FreelancerFilters {
  search?: string;
  skills?: string[];
  availability?: FreelancerProfile["availability"];
  minRating?: number;
  minExperience?: number;
  status?: FreelancerProfile["status"];
}

export interface JobFormData {
  title: string;
  description: string;
  requirements: string[];
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  duration: string;
  type: JobListing["type"];
  category: string;
  skills: string[];
  location: {
    type: JobListing["location"]["type"];
    address?: string;
  };
  deadline: string;
}

export interface ProposalFormData {
  jobId: string;
  coverLetter: string;
  bid: number;
  estimatedDuration: string;
}
