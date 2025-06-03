import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const announcements = [
  {
    id: 1,
    title: "Spring 2025 Enrollment Now Open",
    date: "2024-03-15",
    type: "enrollment",
  },
  {
    id: 2,
    title: "Assignment Deadlines Updated",
    date: "2024-03-14",
    type: "academic",
  },
  {
    id: 3,
    title: "New Freelance Opportunities Available",
    date: "2024-03-13",
    type: "job",
  },
];

const typeToVariant = (type: string) => {
  switch (type) {
    case "enrollment":
      return "default";
    case "academic":
      return "secondary";
    case "job":
      return "outline";
    default:
      return "default";
  }
};

const Announcements = () => {
  return (
    <section className="py-12 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Latest Announcements
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {announcements.map((announcement, idx) => (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <Badge variant={typeToVariant(announcement.type)}>
                    {announcement.type.charAt(0).toUpperCase() +
                      announcement.type.slice(1)}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {announcement.date}
                  </span>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-xl font-semibold mb-2">
                    {announcement.title}
                  </CardTitle>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Announcements;
