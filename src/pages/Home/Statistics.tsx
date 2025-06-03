import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const stats = [
  {
    id: 1,
    label: "Students Enrolled",
    value: "5,000+",
    icon: "👨‍🎓",
  },
  {
    id: 2,
    label: "Active Instructors",
    value: "120+",
    icon: "👨‍🏫",
  },
  {
    id: 3,
    label: "Jobs Posted",
    value: "300+",
    icon: "💼",
  },
  {
    id: 4,
    label: "Courses Offered",
    value: "100+",
    icon: "📚",
  },
];

const Statistics = () => {
  return (
    <section className="py-12 bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
            >
              <Card className="bg-blue-700 text-white">
                <CardHeader className="flex flex-col items-center pb-2">
                  <span className="text-4xl mb-2">{stat.icon}</span>
                  <CardTitle className="text-3xl font-bold mb-1">
                    {stat.value}
                  </CardTitle>
                  <span className="text-lg">{stat.label}</span>
                </CardHeader>
                <CardContent />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
