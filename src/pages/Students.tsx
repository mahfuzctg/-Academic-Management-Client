import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import StudentList from "@/components/students/StudentList";
import StudentForm from "@/components/students/StudentForm";
import type { Student } from "@/types/student";

const Students = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>();

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setSelectedStudent(undefined);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Student Management</h1>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button>Add New Student</Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <StudentForm
              student={selectedStudent}
              onSuccess={handleFormSuccess}
            />
          </DialogContent>
        </Dialog>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key="student-list"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <StudentList />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Students;
