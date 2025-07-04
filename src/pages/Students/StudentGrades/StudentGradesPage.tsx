import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";

import { toast } from "@/components/ui/use-toast";
import { useGetMyEnrolledCoursesQuery } from "@/redux/features/enrollmentCourse/enrollmentCourseApi";
import { useGetAllSemesterRegistrationsQuery } from "@/redux/features/semesterRegistration/semesterRegistrationApi";
import {
  useGetMeQuery,
  useUpdateStudentMutation,
} from "@/redux/features/student/studentApi";
import type { TEnrolledCourse } from "@/types/enrolledCourse";
import GradingHistoryTable from "./GradingHistoryTable";

/**
 * @description Calculates the best 3 class test marks from 4 class tests
 * @param {number} ct1 - Class Test 1 marks
 * @param {number} ct2 - Class Test 2 marks
 * @param {number} ct3 - Class Test 3 marks
 * @param {number} ct4 - Class Test 4 marks
 * @returns {number} Sum of best 3 class test marks (max 60)
 */
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
  return percentage >= 50 ? "PASS" : "FAIL";
}

export default function StudentGradesPage() {
  const { data: enrolledCoursesData, isLoading: coursesLoading } =
    useGetMyEnrolledCoursesQuery(undefined);

  const { data: semesterRegistrations } =
    useGetAllSemesterRegistrationsQuery(undefined);
  const [updateStudent, { isLoading: updateLoading }] =
    useUpdateStudentMutation();

  const enrolledCourses: TEnrolledCourse[] = enrolledCoursesData?.data || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<TEnrolledCourse | null>(
    null
  );

  const { data: student } = useGetMeQuery();
  const [registrationData, setRegistrationData] = useState({
    preferredSubjects: "",
    academicGoals: "",
    additionalNotes: "",
  });

  // Get current semester as a number (1-8)
  const currentSemesterNumber = student?.data?.currentSemester;
  console.log(currentSemesterNumber);
  // Group enrolled courses by academicSemester (assuming academicSemester is a string like '1st Semester', '2nd Semester', ...)
  const semesterNames = [
    "1st Semester",
    "2nd Semester",
    "3rd Semester",
    "4th Semester",
    "5th Semester",
    "6th Semester",
    "7th Semester",
    "8th Semester",
  ];

  // Map semester name to number for easier comparison
  const semesterNameToNumber = (name: string) => {
    const idx = semesterNames.indexOf(name);
    return idx === -1 ? null : idx + 1;
  };

  // Group courses by semester name
  const coursesBySemester: Record<string, TEnrolledCourse[]> = {};
  enrolledCourses.forEach((course) => {
    const semesterIdx = semesterNameToNumber(course.academicSemester);
    const semesterName = semesterNames[semesterIdx ? semesterIdx - 1 : 0];
    if (!coursesBySemester[semesterName]) coursesBySemester[semesterName] = [];
    coursesBySemester[semesterName].push(course);
  });

  // Get current semester name
  const currentSemesterName = semesterNames[currentSemesterNumber - 1];
  const currentSemesterCourses = coursesBySemester[currentSemesterName] || [];
  console.log("currentSemesterName", currentSemesterName);
  // Check if all current semester courses have isMarkSubmitted: true
  const canRegisterNext =
    currentSemesterCourses.length > 0 &&
    currentSemesterCourses.every((c) => (c as any).isMarkSubmitted === true);

  // Only show tabs up to the student's current semester
  const visibleSemesterNames = semesterNames.slice(0, currentSemesterNumber);
  console.log("visibleSemesterNames", visibleSemesterNames);

  // Controlled tab state
  const [activeTab, setActiveTab] = useState(currentSemesterName);
  useEffect(() => {
    setActiveTab(currentSemesterName);
  }, [currentSemesterName]);

  /**
   * @description Opens the registration modal for a specific course.
   * @param {TEnrolledCourse} course - The course for which to register.
   */
  const openRegistrationModal = (course: TEnrolledCourse) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  /**
   * @description Handles the registration submission and updates student's admission semester
   */
  const handleRegistrationSubmit = async () => {
    try {
      console.log("currentSemesterNumber", parseInt(currentSemesterNumber));
      const nextSemesterNumber = parseInt(currentSemesterNumber) + 1;
      const nextSemesterNumberString = nextSemesterNumber;

      if (nextSemesterNumberString > 8) {
        toast({
          title: "You have completed all semesters!",
          variant: "default",
        });
        return;
      }
      const studentId = student?.data?._id;
      if (!studentId) {
        toast({
          title: "Student ID not found. Please contact administration.",
          variant: "destructive",
        });
        return;
      }

      const updatedData = {
        student: {
          currentSemester: nextSemesterNumberString,
          isNextSemesterRegistrationDone: true,
        },
      };

      await updateStudent({
        id: studentId,
        updatedData,
      }).unwrap();
      toast({
        title: `Registration submitted! You are now in ${nextSemesterNumberString}.`,
        variant: "default",
      });
      setIsModalOpen(false);
      setRegistrationData({
        preferredSubjects: "",
        academicGoals: "",
        additionalNotes: "",
      });
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Failed to submit registration. Please try again.",
        variant: "destructive",
      });
    }
  };

  /**
   * @description Filters courses that the student has passed.
   */
  const passedCourses = enrolledCourses.filter((course) => course.isPassed);

  /**
   * @description Filters courses that the student has failed.
   */
  const failedCourses = enrolledCourses.filter((course) => !course.isPassed);

  return (
    <motion.div
      className="p-6 max-w-7xl mx-auto space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header with Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6" />
            My Academic Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">Passed Courses</h3>
              <p className="text-2xl font-bold text-green-600">
                {passedCourses.length}
              </p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-semibold text-red-800">Failed Courses</h3>
              <p className="text-2xl font-bold text-red-600">
                {failedCourses.length}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800">Total Courses</h3>
              <p className="text-2xl font-bold text-blue-600">
                {enrolledCourses.length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Semester Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full mt-6"
      >
        <TabsList className="flex flex-wrap gap-2">
          {visibleSemesterNames.map((name) => (
            <TabsTrigger key={name} value={name} className="capitalize">
              {name}
            </TabsTrigger>
          ))}
        </TabsList>
        {visibleSemesterNames.map((name) => {
          const semesterCourses = coursesBySemester[name] || [];
          // Show button if all courses in this semester have isExamDone=true and isNextSemesterRegistrationDone is false
          const allExamsDone =
            semesterCourses.length > 0 &&
            semesterCourses.every((c) => c.isExamDone);
          const nextSemesterRegistered =
            semesterCourses.length > 0 &&
            semesterCourses.every((c) => c.isNextSemesterRegistrationDone);
          // Calculate pass/fail summary
          const passedCount = semesterCourses.filter((c) => c.isPassed).length;
          const failedCount = semesterCourses.filter(
            (c) => c.isPassed === false
          ).length;
          const totalCount = semesterCourses.length;
          const semesterPassed = totalCount > 0 && passedCount === totalCount;
          return (
            <TabsContent key={name} value={name}>
              {semesterCourses.length === 0 ? (
                <p className="text-gray-500">No courses for this semester.</p>
              ) : (
                <>
                  {/* Semester Summary */}
                  <div className="mb-4 p-4 rounded-lg bg-gray-100 border flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <span className="font-semibold text-lg">{name}</span>
                      {semesterCourses.length > 0 && (
                        <div className="mt-1 text-sm text-gray-700">
                          <span className="font-medium">Courses:</span>
                          <ul className="list-disc list-inside ml-4">
                            {semesterCourses.map((c) => (
                              <li key={c._id}>
                                {c.course?.title || "Untitled Course"}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <span className="text-green-700 font-medium">
                        Passed: {passedCount}
                      </span>
                      <span className="text-red-700 font-medium">
                        Failed: {failedCount}
                      </span>
                      <span className="text-blue-700 font-medium">
                        Total: {totalCount}
                      </span>
                      <span
                        className={
                          semesterPassed
                            ? "text-green-800 font-bold"
                            : "text-red-800 font-bold"
                        }
                      >
                        Semester Status:{" "}
                        {semesterPassed ? "PASSED" : "NOT PASSED"}
                      </span>
                    </div>
                  </div>
                  {name === currentSemesterName &&
                    allExamsDone &&
                    !nextSemesterRegistered && (
                      <Button
                        className="mb-4 bg-green-600 hover:bg-green-700"
                        onClick={() => {
                          // Use the first course in the semester for registration context
                          openRegistrationModal(semesterCourses[0]);
                        }}
                        disabled={updateLoading}
                      >
                        {updateLoading
                          ? "Processing..."
                          : "Register Next Semester"}
                      </Button>
                    )}
                  <GradingHistoryTable
                    history={semesterCourses}
                    calculateGrade={calculateGrade}
                    getResultStatus={getResultStatus}
                  />
                </>
              )}
            </TabsContent>
          );
        })}
      </Tabs>

      {/* Registration Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Register for Next Semester</DialogTitle>
            <DialogDescription>
              Please provide information for your next semester registration.
              {selectedCourse && (
                <p className="mt-2 font-medium">
                  Course: {selectedCourse.course.title}
                </p>
              )}
              <p className="mt-2 text-sm text-blue-600">
                Your admission semester will be updated to the next semester
                upon successful registration.
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="preferredSubjects" className="text-right">
                Preferred Subjects
              </Label>
              <Input
                id="preferredSubjects"
                value={registrationData.preferredSubjects}
                onChange={(e) =>
                  setRegistrationData((prev) => ({
                    ...prev,
                    preferredSubjects: e.target.value,
                  }))
                }
                className="col-span-3"
                placeholder="e.g., Mathematics, Physics, Computer Science"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="academicGoals" className="text-right">
                Academic Goals
              </Label>
              <Input
                id="academicGoals"
                value={registrationData.academicGoals}
                onChange={(e) =>
                  setRegistrationData((prev) => ({
                    ...prev,
                    academicGoals: e.target.value,
                  }))
                }
                className="col-span-3"
                placeholder="e.g., Improve GPA, Learn new skills"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="additionalNotes" className="text-right">
                Additional Notes
              </Label>
              <Input
                id="additionalNotes"
                value={registrationData.additionalNotes}
                onChange={(e) =>
                  setRegistrationData((prev) => ({
                    ...prev,
                    additionalNotes: e.target.value,
                  }))
                }
                className="col-span-3"
                placeholder="Any additional information..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              disabled={updateLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleRegistrationSubmit}
              disabled={updateLoading}
            >
              {updateLoading ? "Submitting..." : "Submit Registration"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
