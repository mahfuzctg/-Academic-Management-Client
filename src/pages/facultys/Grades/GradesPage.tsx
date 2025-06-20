import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import * as XLSX from "xlsx";
import {
  useGetAllFacultyCoursesQuery,
  useAddMarkMutation,
} from "@/redux/features/faculty/facultyCourses.api";
import type { TEnrolledCourse } from "@/types/enrolledCourse";

function calculateGrade(marks: number) {
  if (marks >= 90) return "A+";
  if (marks >= 80) return "A";
  if (marks >= 70) return "B";
  if (marks >= 60) return "C";
  if (marks >= 50) return "D";
  return "F";
}

function getResultStatus(marks: number) {
  return marks >= 50 ? "PASS" : "FAIL";
}

export default function GradesPage() {
  // Fetch all enrolled courses for this faculty
  const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery(undefined);
  const enrolledCourses: TEnrolledCourse[] = facultyCoursesData?.data || [];

  // Dropdown state
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");

  // Find selected course object
  const selectedCourse = useMemo(
    () => enrolledCourses.find((c) => c.course === selectedCourseId),
    [enrolledCourses, selectedCourseId]
  );

  // Get unique course options
  const courseOptions = useMemo(() => {
    const courses = new Map<string, string>();
    enrolledCourses.forEach((c) => {
      if (c.course && typeof c.course === "string")
        courses.set(c.course, c.course);
    });
    return Array.from(courses.entries());
  }, [enrolledCourses]);

  // Filter students for the selected course
  const students = useMemo(() => {
    if (!selectedCourseId) return [];
    return enrolledCourses.filter((c) => c.course === selectedCourseId);
  }, [enrolledCourses, selectedCourseId]);

  // Grading state
  const [studentMarks, setStudentMarks] = useState<
    Record<
      string,
      {
        classTest1: number;
        classTest2: number;
        midTerm: number;
        finalTerm: number;
      }
    >
  >({});
  const [history, setHistory] = useState<TEnrolledCourse[]>([]);

  // Add mark mutation
  const [addMark] = useAddMarkMutation();

  // Load grading history for selected course
  useEffect(() => {
    if (enrolledCourses && selectedCourseId) {
      setHistory(enrolledCourses.filter((g) => g.course === selectedCourseId));
    }
  }, [enrolledCourses, selectedCourseId]);

  // Handle mark input change
  const handleMarkChange = (
    studentId: string,
    field: keyof TEnrolledCourse["courseMarks"],
    value: string
  ) => {
    setStudentMarks((prev) => {
      const prevMarks = prev[studentId] || {
        classTest1: 0,
        classTest2: 0,
        midTerm: 0,
        finalTerm: 0,
      };
      return { ...prev, [studentId]: { ...prevMarks, [field]: Number(value) } };
    });
  };

  // Assign or update grades for all students in the course
  const handleAssignGrades = async () => {
    for (const student of students) {
      const marksObj = studentMarks[student.student] || {
        classTest1: 0,
        classTest2: 0,
        midTerm: 0,
        finalTerm: 0,
      };
      const totalMarks =
        marksObj.classTest1 +
        marksObj.classTest2 +
        marksObj.midTerm +
        marksObj.finalTerm;
      const grade = calculateGrade(totalMarks);
      const resultStatus = getResultStatus(totalMarks);
      await addMark({
        studentId: student.student,
        courseId: student.course,
        marks: marksObj,
        totalMarks,
        grade,
        resultStatus,
      });
    }
  };

  // Export grading history to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(history);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Grades");
    XLSX.writeFile(workbook, "grading_history.xlsx");
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
            >
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent>
                {courseOptions.map(([id, name]) => (
                  <SelectItem key={id} value={id}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={handleAssignGrades}
              disabled={!selectedCourseId || students.length === 0}
            >
              Save Grades
            </Button>
            <Button variant="secondary" onClick={exportToExcel}>
              Export to Excel
            </Button>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full text-sm text-left border rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border">Student ID</th>
                  <th className="px-4 py-2 border">Course</th>
                  <th className="px-4 py-2 border">Class Test 1</th>
                  <th className="px-4 py-2 border">Class Test 2</th>
                  <th className="px-4 py-2 border">Mid Term</th>
                  <th className="px-4 py-2 border">Final Term</th>
                  <th className="px-4 py-2 border">Total</th>
                  <th className="px-4 py-2 border">Grade</th>
                  <th className="px-4 py-2 border">Result</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-4">
                      No students found for this course.
                    </td>
                  </tr>
                ) : (
                  students.map((student) => {
                    const marksObj = studentMarks[student.student] || {
                      classTest1: 0,
                      classTest2: 0,
                      midTerm: 0,
                      finalTerm: 0,
                    };
                    const total =
                      marksObj.classTest1 +
                      marksObj.classTest2 +
                      marksObj.midTerm +
                      marksObj.finalTerm;
                    const grade = calculateGrade(total);
                    const result = getResultStatus(total);
                    return (
                      <tr key={student.student}>
                        <td className="px-4 py-2 border">{student.student}</td>
                        <td className="px-4 py-2 border">{student.course}</td>
                        <td className="px-4 py-2 border">
                          <Input
                            type="number"
                            min={0}
                            max={25}
                            value={marksObj.classTest1}
                            onChange={(e) =>
                              handleMarkChange(
                                student.student,
                                "classTest1",
                                e.target.value
                              )
                            }
                            className="w-20"
                          />
                        </td>
                        <td className="px-4 py-2 border">
                          <Input
                            type="number"
                            min={0}
                            max={25}
                            value={marksObj.classTest2}
                            onChange={(e) =>
                              handleMarkChange(
                                student.student,
                                "classTest2",
                                e.target.value
                              )
                            }
                            className="w-20"
                          />
                        </td>
                        <td className="px-4 py-2 border">
                          <Input
                            type="number"
                            min={0}
                            max={25}
                            value={marksObj.midTerm}
                            onChange={(e) =>
                              handleMarkChange(
                                student.student,
                                "midTerm",
                                e.target.value
                              )
                            }
                            className="w-20"
                          />
                        </td>
                        <td className="px-4 py-2 border">
                          <Input
                            type="number"
                            min={0}
                            max={25}
                            value={marksObj.finalTerm}
                            onChange={(e) =>
                              handleMarkChange(
                                student.student,
                                "finalTerm",
                                e.target.value
                              )
                            }
                            className="w-20"
                          />
                        </td>
                        <td className="px-4 py-2 border font-semibold">
                          {total}
                        </td>
                        <td className="px-4 py-2 border font-semibold">
                          {grade}
                        </td>
                        <td className="px-4 py-2 border font-semibold">
                          {result}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Grading History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border">Student ID</th>
                  <th className="px-4 py-2 border">Course</th>
                  <th className="px-4 py-2 border">Class Test 1</th>
                  <th className="px-4 py-2 border">Class Test 2</th>
                  <th className="px-4 py-2 border">Mid Term</th>
                  <th className="px-4 py-2 border">Final Term</th>
                  <th className="px-4 py-2 border">Total</th>
                  <th className="px-4 py-2 border">Grade</th>
                  <th className="px-4 py-2 border">Result</th>
                </tr>
              </thead>
              <tbody>
                {history.length > 0 ? (
                  history.map((h, idx) => {
                    const total =
                      h.courseMarks.classTest1 +
                      h.courseMarks.classTest2 +
                      h.courseMarks.midTerm +
                      h.courseMarks.finalTerm;
                    const grade = calculateGrade(total);
                    const result = getResultStatus(total);
                    return (
                      <tr key={h.student + idx}>
                        <td className="px-4 py-2 border">{h.student}</td>
                        <td className="px-4 py-2 border">{h.course}</td>
                        <td className="px-4 py-2 border">
                          {h.courseMarks.classTest1}
                        </td>
                        <td className="px-4 py-2 border">
                          {h.courseMarks.classTest2}
                        </td>
                        <td className="px-4 py-2 border">
                          {h.courseMarks.midTerm}
                        </td>
                        <td className="px-4 py-2 border">
                          {h.courseMarks.finalTerm}
                        </td>
                        <td className="px-4 py-2 border">{total}</td>
                        <td className="px-4 py-2 border">{grade}</td>
                        <td className="px-4 py-2 border">{result}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td className="px-4 py-2 border text-center" colSpan={9}>
                      No grading history found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
