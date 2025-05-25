import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Recent Job Opportunities</h2>
          <Button asChild>
            <a href="/marketplace">View All Jobs</a>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {recentJobs.map((job, idx) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <Badge variant={typeToVariant(job.type)}>{job.type}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {job.posted}
                  </span>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-xl font-semibold mb-2">
                    {job.title}
                  </CardTitle>
                  <Button variant="link" className="mt-2 p-0 h-auto">
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
