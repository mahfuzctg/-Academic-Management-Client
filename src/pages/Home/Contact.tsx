import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const faqs = [
  {
    id: 1,
    question: "How do I register for subjects?",
    answer:
      "You can register for subjects through the Course Registration section in your dashboard.",
  },
  {
    id: 2,
    question: "How does the grading system work?",
    answer:
      "Grades are calculated based on assignments, midterms, and final exams as per university guidelines.",
  },
  {
    id: 3,
    question: "How can I apply for freelance jobs?",
    answer:
      "Browse available jobs in the Marketplace section and submit your application through the platform.",
  },
];

const Contact = () => {
  return (
    <section className="py-12 ">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Support Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0, duration: 0.5 }}
          >
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-3xl font-bold mb-6">
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">💬</div>
                  <div>
                    <span className="font-semibold">Live Chat Support</span>
                    <p className="text-gray-600">
                      Available 24/7 for immediate assistance
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">📧</div>
                  <div>
                    <span className="font-semibold">Email Support</span>
                    <p className="text-gray-600">
                      support@academicmanagement.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (idx + 1) * 0.15, duration: 0.5 }}
                >
                  <Card className="hover:shadow-md transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="font-semibold mb-2">
                        {faq.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
