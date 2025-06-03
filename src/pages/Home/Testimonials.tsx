import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "John",
    year: "3rd Year CSE",
    text: "This platform helped me track my grades and find a freelance job!",
    avatar: "👨‍🎓",
  },
  {
    id: 2,
    name: "Sarah",
    year: "2nd Year EEE",
    text: "The academic management features are incredibly helpful for staying organized.",
    avatar: "👩‍🎓",
  },
  {
    id: 3,
    name: "Mike",
    year: "4th Year CSE",
    text: "Found great freelance opportunities that helped me build my portfolio.",
    avatar: "👨‍💻",
  },
];

const Testimonials = () => {
  return (
    <section className="py-12 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Success Stories
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                  <span className="text-4xl">{testimonial.avatar}</span>
                  <div>
                    <CardTitle className="text-lg font-semibold mb-0">
                      {testimonial.name}
                    </CardTitle>
                    <span className="text-sm text-muted-foreground">
                      {testimonial.year}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
