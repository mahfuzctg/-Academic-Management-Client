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

interface Student {
  id: string;
  name: string;
  email: string;
  department: string;
  batch: string;
  enrollmentDate: string;
}

export default function StudentManagement() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [students] = useState<Student[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      department: "Computer Science",
      batch: "2023",
      enrollmentDate: "2023-09-01",
    },
    // Add more sample data as needed
  ]);

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Student Management</h1>
        <Button
          onClick={() => {
            toast({
              title: "Coming soon",
              description:
                "Student registration feature will be available soon.",
            });
          }}
        >
          Add New Student
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search students..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Batch</TableHead>
              <TableHead>Enrollment Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.department}</TableCell>
                <TableCell>{student.batch}</TableCell>
                <TableCell>{student.enrollmentDate}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      toast({
                        title: "Coming soon",
                        description:
                          "Student profile editing will be available soon.",
                      });
                    }}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
