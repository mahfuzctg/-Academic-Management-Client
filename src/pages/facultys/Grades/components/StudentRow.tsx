import { Button } from "@/components/ui/button";
import { SubjectMarksTable, type TStudentMarks } from "./SubjectMarksTable";
import type { TEnrolledCourse } from "@/types/enrolledCourse";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { type FC } from "react";
import { toast } from "sonner";
import { useUpdateEnrolledCourseMarksMutation } from "@/redux/features/enrollmentCourse/enrollmentCourseApi";

export const StudentRow: FC<{
  enrollment: TEnrolledCourse;
  isExpanded: boolean;
  onToggle: (studentId: string) => void;
  studentMarks: TStudentMarks;
  handleMarkChange: (
    studentId: string,
    subjectName: string,
    field: keyof TEnrolledCourse["courseMarks"],
    value: string
  ) => void;
  calculateGrade: (total: number) => string;
  getResultStatus: (total: number) => string;
}> = ({
  enrollment,
  isExpanded,
  onToggle,
  studentMarks,
  handleMarkChange,
  calculateGrade,
  getResultStatus,
}) => {
  const studentFullName = `${enrollment.student.name.firstName} ${
    enrollment.student.name.middleName || ""
  } ${enrollment.student.name.lastName}`;

  const [updateEnrolledCourseMarks, { isLoading: isSubmitting }] =
    useUpdateEnrolledCourseMarksMutation();

  const handleAssignGrades = async () => {
    const toastId = toast.loading("Submitting grades...");
    try {
      const studentId = enrollment.student.id;
      const marksBySubject = studentMarks[studentId];

      if (!marksBySubject || !enrollment.selectedSubjects) {
        toast.error("No marks to submit", { id: toastId });
        return;
      }

      // Collect all subjects and their marks
      const allSubjectMarks = [];
      let totalCourseMarks = {
        classTest1: 0,
        classTest2: 0,
        midTerm: 0,
        finalTerm: 0,
      };
      let totalMarks = 0;
      let subjectCount = 0;

      for (const subjectName of enrollment.selectedSubjects) {
        const marks = marksBySubject[subjectName];
        if (marks) {
          const subjectTotal =
            (marks.classTest1 ?? 0) +
            (marks.classTest2 ?? 0) +
            (marks.midTerm ?? 0) +
            (marks.finalTerm ?? 0);

          // Add to subject marks array
          allSubjectMarks.push({
            subjectName,
            marks,
          });

          // Accumulate course totals
          totalCourseMarks.classTest1 += marks.classTest1 ?? 0;
          totalCourseMarks.classTest2 += marks.classTest2 ?? 0;
          totalCourseMarks.midTerm += marks.midTerm ?? 0;
          totalCourseMarks.finalTerm += marks.finalTerm ?? 0;
          totalMarks += subjectTotal;
          subjectCount++;
        }
      }

      // Calculate average course grade
      const averageMarks = subjectCount > 0 ? totalMarks / subjectCount : 0;
      const courseGrade = calculateGrade(averageMarks);
      const isPassed = getResultStatus(averageMarks) === "PASS";

      const gradeData = {
        studentId,
        courseId: enrollment.course._id,
        courseMarks: totalCourseMarks,
        subjectMarks: allSubjectMarks,
        grade: courseGrade,
        isPassed,
        isMarkSubmitted: true,
      };

      console.log("gradeData", gradeData);

      await updateEnrolledCourseMarks(gradeData).unwrap();

      toast.success("Grades submitted successfully!", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit grades. Please try again.", {
        id: toastId,
      });
    }
  };

  return (
    <>
      <tr
        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
        onClick={() => onToggle(enrollment.student.id)}
      >
        <td className="px-4 py-2 border text-center">
          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </td>
        <td className="px-4 py-2 border font-semibold">
          {studentFullName} ({enrollment.student.id})
        </td>
        <td className="px-4 py-2 border">{enrollment.course.title}</td>
        <td className="px-4 py-2 border text-center">
          {enrollment.selectedSubjects?.length || 0}
        </td>
        <td className="px-4 py-2 border text-center">
          {enrollment.isPassed ? "Passed" : "Failed"}
        </td>
      </tr>
      <AnimatePresence>
        {isExpanded && (
          <tr>
            <td colSpan={5} className="p-0 border-0">
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden bg-gray-50 dark:bg-gray-900/50"
              >
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold mb-2 text-base">
                      Subject Marks for {studentFullName}
                    </h4>
                    <div className="flex justify-end mb-2">
                      <Button
                        onClick={handleAssignGrades}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Saving..." : "Save Grades"}
                      </Button>
                    </div>
                  </div>
                  <SubjectMarksTable
                    enrollment={enrollment}
                    studentId={enrollment.student.id}
                    studentMarks={studentMarks}
                    handleMarkChange={handleMarkChange}
                    calculateGrade={calculateGrade}
                    getResultStatus={getResultStatus}
                  />
                </div>
              </motion.div>
            </td>
          </tr>
        )}
      </AnimatePresence>
    </>
  );
};
