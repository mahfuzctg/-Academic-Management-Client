import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface Grade {
  id: string;
  studentId: string;
  studentName: string;
  courseCode: string;
  courseName: string;
  grade: string;
  marks: number;
}

export default function AcademicPerformance() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [grades, setGrades] = useState<Grade[]>([
    {
      id: "1",
      studentId: "S001",
      studentName: "John Doe",
      courseCode: "CS101",
      courseName: "Introduction to Programming",
      grade: "A",
      marks: 85,
    },
    // Add more sample data as needed
  ]);

  const filteredGrades = grades.filter(
    (grade) =>
      grade.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grade.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grade.courseName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGradeUpdate = (gradeId: string, newMarks: number) => {
    const getGrade = (marks: number): string => {
      if (marks >= 90) return "A+";
      if (marks >= 80) return "A";
      if (marks >= 70) return "B";
      if (marks >= 60) return "C";
      if (marks >= 50) return "D";
      return "F";
    };

    setGrades((prevGrades) =>
      prevGrades.map((grade) =>
        grade.id === gradeId
          ? {
              ...grade,
              marks: newMarks,
              grade: getGrade(newMarks),
            }
          : grade
      )
    );

    toast({
      title: "Grade Updated",
      description: "The student's grade has been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Academic Performance</h1>
        <Button
          onClick={() => {
            toast({
              title: "Coming soon",
              description: "Bulk grade import feature will be available soon.",
            });
          }}
        >
          Import Grades
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search by student or course..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student ID</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead>Course Code</TableHead>
              <TableHead>Course Name</TableHead>
              <TableHead>Marks</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGrades.map((grade) => (
              <TableRow key={grade.id}>
                <TableCell>{grade.studentId}</TableCell>
                <TableCell>{grade.studentName}</TableCell>
                <TableCell>{grade.courseCode}</TableCell>
                <TableCell>{grade.courseName}</TableCell>
                <TableCell>{grade.marks}</TableCell>
                <TableCell>{grade.grade}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    defaultValue={grade.marks}
                    className="w-20"
                    onChange={(e) => {
                      const newMarks = parseInt(e.target.value);
                      if (
                        !isNaN(newMarks) &&
                        newMarks >= 0 &&
                        newMarks <= 100
                      ) {
                        handleGradeUpdate(grade.id, newMarks);
                      }
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
