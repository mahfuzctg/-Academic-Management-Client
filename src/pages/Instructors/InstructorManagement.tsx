import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import InstructorList from "@/components/instructors/InstructorList";
import InstructorForm from "@/components/instructors/InstructorForm";
import type { Instructor } from "@/types/instructor";

export default function InstructorManagement() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState<
    Instructor | undefined
  >();
  const [isSubjectsDialogOpen, setIsSubjectsDialogOpen] = useState(false);
  const [selectedInstructorForSubjects, setSelectedInstructorForSubjects] =
    useState<Instructor | undefined>();

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setSelectedInstructor(undefined);
  };

  const handleEdit = (instructor: Instructor) => {
    setSelectedInstructor(instructor);
    setIsFormOpen(true);
  };

  const handleViewSubjects = (instructor: Instructor) => {
    setSelectedInstructorForSubjects(instructor);
    setIsSubjectsDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Instructor Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage instructor profiles, assigned subjects, and academic records
          </p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Instructor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <InstructorForm
              instructor={selectedInstructor}
              onSuccess={handleFormSuccess}
            />
          </DialogContent>
        </Dialog>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key="instructor-list"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <InstructorList
            onEdit={handleEdit}
            onViewSubjects={handleViewSubjects}
          />
        </motion.div>
      </AnimatePresence>

      <Dialog
        open={isSubjectsDialogOpen}
        onOpenChange={setIsSubjectsDialogOpen}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedInstructorForSubjects && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">
                  {selectedInstructorForSubjects.firstName}{" "}
                  {selectedInstructorForSubjects.lastName}'s Subjects
                </h2>
                <p className="text-muted-foreground">
                  Department: {selectedInstructorForSubjects.department}
                </p>
              </div>

              <div className="space-y-4">
                {selectedInstructorForSubjects.assignedSubjects.map(
                  (subject) => (
                    <div
                      key={subject.id}
                      className="p-4 border rounded-lg space-y-4"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{subject.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Code: {subject.code} | Semester: {subject.semester}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          View Students
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Student List</h4>
                        <div className="border rounded-md">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left p-2">Student ID</th>
                                <th className="text-left p-2">Name</th>
                                <th className="text-left p-2">Grade</th>
                                <th className="text-left p-2">Attendance</th>
                              </tr>
                            </thead>
                            <tbody>
                              {subject.students.map((student) => (
                                <tr
                                  key={student.studentId}
                                  className="border-b"
                                >
                                  <td className="p-2">{student.studentId}</td>
                                  <td className="p-2">{student.name}</td>
                                  <td className="p-2">
                                    {student.grade || "N/A"}
                                  </td>
                                  <td className="p-2">{student.attendance}%</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Grading History</h4>
                        <div className="border rounded-md">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left p-2">Date</th>
                                <th className="text-left p-2">Student ID</th>
                                <th className="text-left p-2">Grade</th>
                                <th className="text-left p-2">Semester</th>
                              </tr>
                            </thead>
                            <tbody>
                              {subject.gradingHistory.map((record, index) => (
                                <tr key={index} className="border-b">
                                  <td className="p-2">{record.date}</td>
                                  <td className="p-2">{record.studentId}</td>
                                  <td className="p-2">{record.grade}</td>
                                  <td className="p-2">{record.semester}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
