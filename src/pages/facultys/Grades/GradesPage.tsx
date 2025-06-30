import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetAllEnrolledCoursesQuery,
  useUpdateEnrolledCourseMarksMutation,
} from "@/redux/features/enrollmentCourse/enrollmentCourseApi";
import type { TEnrolledCourse } from "@/types/enrolledCourse";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import GradeEntryTable from "./components/GradeEntryTable";
import type { TStudentMarks } from "./components/SubjectMarksTable";

const calculateBestThreeCT = (
  ct1: number,
  ct2: number,
  ct3: number,
  ct4: number
): number => {
  const marks = [ct1, ct2, ct3, ct4].map((mark) => Math.min(mark, 20)); // Cap each CT at 20
  marks.sort((a, b) => b - a); // Sort in descending order
  return marks.slice(0, 3).reduce((sum, mark) => sum + mark, 0); // Sum of best 3
};

const calculateFinalTotal = (
  ct1: number,
  ct2: number,
  ct3: number,
  ct4: number,
  finalExam: number
): number => {
  const bestThreeCT = calculateBestThreeCT(ct1, ct2, ct3, ct4);
  const finalExamCapped = Math.min(finalExam, 210); // Cap final exam at 210
  const total = bestThreeCT + finalExamCapped;
  return Math.min(total, 210); // Cap total at 210
};

function calculateGrade(marks: number) {
  // Convert marks to percentage (210 is 100%)
  const percentage = (marks / 210) * 100;

  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B";
  if (percentage >= 60) return "C";
  if (percentage >= 50) return "D";
  return "F";
}

function getResultStatus(marks: number) {
  // Convert marks to percentage (210 is 100%)
  const percentage = (marks / 210) * 100;
  return percentage >= 50 ? "PASS" : " FAIL";
}

export default function GradesPage() {
  const {
    data: facultyCoursesData,
    refetch,
    isLoading,
  } = useGetAllEnrolledCoursesQuery(undefined);
  const enrolledCourses: TEnrolledCourse[] = facultyCoursesData?.data || [];

  const [selectedCourseId, setSelectedCourseId] = useState<string>("");

  const courseOptions = useMemo(() => {
    const courses = new Map<string, { _id: string; title: string }>();

    enrolledCourses.forEach((c) => {
      if (c.course && c.course._id) {
        courses.set(
          c.course._id,
          c.course.title as unknown as { _id: string; title: string }
        );
      }
    });
    return Array.from(courses.values());
  }, [enrolledCourses]);

  console.log({ enrolledCourses });
  console.log({ courseOptions });
  const studentsForCourse = useMemo(() => {
    if (!selectedCourseId) return [];
    return enrolledCourses.filter((c) => c.course._id === selectedCourseId);
  }, [enrolledCourses, selectedCourseId]);

  const [studentMarks, setStudentMarks] = useState<TStudentMarks>({});

  const [updateEnrolledCourseMarks, { isLoading: isSubmitting }] =
    useUpdateEnrolledCourseMarksMutation();

  useEffect(() => {
    if (selectedCourseId) {
      const initialMarks: TStudentMarks = {};
      const studentsInCourse = enrolledCourses.filter(
        (c) => c.course._id === selectedCourseId
      );

      studentsInCourse.forEach((enrollment) => {
        initialMarks[enrollment.student?.id] = {};
        enrollment.selectedSubjects?.forEach((subject) => {
          const subjectMarks = enrollment.subjectMarks?.find(
            (sm) => sm.subjectName === subject
          );
          initialMarks[enrollment.student?.id][subject] = {
            classTest1: subjectMarks?.marks.classTest1 || 0,
            classTest2: subjectMarks?.marks.classTest2 || 0,
            classTest3: subjectMarks?.marks.classTest3 || 0,
            classTest4: subjectMarks?.marks.classTest4 || 0,
            finalExam: subjectMarks?.marks.finalExam || 0,
          };
        });
      });
      setStudentMarks(initialMarks);
    } else {
      setStudentMarks({});
    }
  }, [selectedCourseId, enrolledCourses]);

  const handleMarkChange = (
    studentId: string,
    subjectName: string,
    field: keyof TEnrolledCourse["courseMarks"],
    value: string
  ) => {
    setStudentMarks((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [subjectName]: {
          ...prev[studentId]?.[subjectName],
          [field]: Number(value) || 0,
        },
      },
    }));
  };

  const handleAssignGrades = async () => {
    const toastId = toast.loading("Submitting grades...");
    try {
      const promises = studentsForCourse
        .flatMap((student) => {
          const studentId = student.student.id;
          const marksBySubject = studentMarks[studentId];
          if (!marksBySubject) return [];

          return Object.entries(marksBySubject).map(([subjectName, marks]) => {
            const isAlreadyGraded = student.subjectMarks?.some(
              (sm) => sm.subjectName === subjectName
            );
            if (isAlreadyGraded) return null;

            const total = calculateFinalTotal(
              marks.classTest1 ?? 0,
              marks.classTest2 ?? 0,
              marks.classTest3 ?? 0,
              marks.classTest4 ?? 0,
              marks.finalExam ?? 0
            );

            const gradeData = {
              studentId,
              courseId: student.course._id,
              subjectName,
              marks,
              grade: calculateGrade(total),
              isPassed: getResultStatus(total) === "PASS",
            };
            return updateEnrolledCourseMarks(gradeData).unwrap();
          });
        })
        .filter((p) => p !== null);

      await Promise.all(promises);

      toast.success("Grades submitted successfully!", { id: toastId });
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit grades. Please try again.", {
        id: toastId,
      });
    }
  };

  const exportToExcel = () => {
    const dataToExport = studentsForCourse.flatMap((enrollment: any) => {
      const studentFullName = `${enrollment.student.name.firstName} ${
        enrollment.student.name.middleName || ""
      } ${enrollment.student.name.lastName}`;

      if (
        !enrollment.selectedSubjects ||
        enrollment.selectedSubjects.length === 0
      ) {
        return [
          {
            StudentName: studentFullName,
            StudentId: enrollment.student.id,
            Course: enrollment.course.title,
            Subject: "N/A",
            ClassTest1: "N/A",
            ClassTest2: "N/A",
            ClassTest3: "N/A",
            ClassTest4: "N/A",
            Best3CT: "N/A",
            FinalExam: "N/A",
            Total: "N/A",
            Grade: "N/A",
            Result: "N/A",
          },
        ];
      }

      return enrollment.selectedSubjects.map((subject: any) => {
        const marksObj = studentMarks[enrollment.student.id]?.[subject] || {
          classTest1: 0,
          classTest2: 0,
          classTest3: 0,
          classTest4: 0,
          finalExam: 0,
        };

        const bestThreeCT = calculateBestThreeCT(
          marksObj.classTest1 ?? 0,
          marksObj.classTest2 ?? 0,
          marksObj.classTest3 ?? 0,
          marksObj.classTest4 ?? 0
        );

        const total = calculateFinalTotal(
          marksObj.classTest1 ?? 0,
          marksObj.classTest2 ?? 0,
          marksObj.classTest3 ?? 0,
          marksObj.classTest4 ?? 0,
          marksObj.finalExam ?? 0
        );

        const grade = calculateGrade(total);
        const result = getResultStatus(total);

        return {
          StudentName: studentFullName,
          StudentId: enrollment.student.id,
          Course: enrollment.course.title,
          Subject: subject,
          ClassTest1: marksObj.classTest1,
          ClassTest2: marksObj.classTest2,
          ClassTest3: marksObj.classTest3,
          ClassTest4: marksObj.classTest4,
          Best3CT: bestThreeCT,
          FinalExam: marksObj.finalExam,
          Total: total,
          Grade: grade,
          Result: result,
        };
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Grades");
    XLSX.writeFile(
      workbook,
      `grading_sheet_${
        courseOptions.find((c) => c._id === selectedCourseId)?.title || "course"
      }.xlsx`
    );
  };

  return (
    <motion.div
      className="p-6 max-w-7xl mx-auto space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Assign or Update Grades</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-4 flex-wrap items-center">
            <Select
              value={selectedCourseId}
              onValueChange={setSelectedCourseId}
              disabled={isLoading}
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent>
                {courseOptions.map((course) => (
                  <SelectItem key={course._id} value={course._id}>
                    {course.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={handleAssignGrades}
              disabled={
                !selectedCourseId ||
                studentsForCourse.length === 0 ||
                isSubmitting
              }
            >
              {isSubmitting ? "Submitting..." : "Save Grades"}
            </Button>
            <Button
              variant="secondary"
              onClick={exportToExcel}
              disabled={
                !selectedCourseId ||
                studentsForCourse.length === 0 ||
                isSubmitting
              }
            >
              Export to Excel
            </Button>
          </div>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <GradeEntryTable
              studentsForCourse={studentsForCourse}
              studentMarks={studentMarks}
              handleMarkChange={handleMarkChange}
              calculateGrade={calculateGrade}
              getResultStatus={getResultStatus}
              selectedCourseId={selectedCourseId}
            />
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
