import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import JobList from "@/components/jobs/JobList";

const JobManagement = () => {
  const { user } = useAuth();

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
        <JobList />
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
