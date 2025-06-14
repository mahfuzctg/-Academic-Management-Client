import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const recentJobs = [
  {
    id: 1,
    title: "Graphics Designer Needed for Academic Poster",
    type: "Design",
    posted: "2 days ago",
  },
  {
    id: 2,
    title: "Thesis Formatting Support",
    type: "Academic",
    posted: "3 days ago",
  },
  {
    id: 3,
    title: "Research Paper Review",
    type: "Academic",
    posted: "4 days ago",
  },
  {
    id: 4,
    title: "Video Editing for Course Material",
    type: "Design",
    posted: "5 days ago",
  },
  {
    id: 5,
    title: "Mathematics Tutor for College Prep",
    type: "Academic",
    posted: "6 days ago",
  },
  {
    id: 6,
    title: "Logo Design for Student Startup",
    type: "Design",
    posted: "1 week ago",
  },
  {
    id: 7,
    title: "Proofreading Research Abstract",
    type: "Academic",
    posted: "1 week ago",
  },
  {
    id: 8,
    title: "UI Review for Capstone Project",
    type: "Design",
    posted: "8 days ago",
  },
];

const typeToVariant = (type: string) => {
  switch (type) {
    case "Design":
      return "default";
    case "Academic":
      return "secondary";
    default:
      return "outline";
  }
};

const JobBoard = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-[#0F172A] transition-colors duration-500">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Recent Job Opportunities
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2 text-base">
              Freelance academic and creative gigs tailored for students
            </p>
          </div>
          <Button asChild className="text-sm px-5 py-2 rounded-lg">
            <a href="/jobs">View All Jobs</a>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recentJobs.map((job, idx) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <Card className="h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md hover:scale-[1.015] transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <Badge variant={typeToVariant(job.type)}>{job.type}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {job.posted}
                  </span>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-base font-semibold text-gray-800 dark:text-white leading-tight mb-2">
                    {job.title}
                  </CardTitle>
                  <Button variant="link" className="mt-1 px-0 text-sm">
                    View Details →
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobBoard;
