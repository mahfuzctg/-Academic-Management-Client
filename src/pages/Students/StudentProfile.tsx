// src/pages/StudentProfile.tsx

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetStudentProfileQuery,
  useUpdateStudentMutation,
} from "@/redux/features/student/studentApi";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";

export default function StudentProfile() {
  const { user } = useAppSelector((state) => state.auth);
  const studentId = user?.id;

  const { data: studentData, isLoading } = useGetStudentProfileQuery(
    studentId!,
    {
      skip: !studentId,
    }
  );

  const [updateStudent, { isLoading: isUpdating }] = useUpdateStudentMutation();

  const student = studentData?.data;
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    profileImage: "",
    gender: "male",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });

  useEffect(() => {
    if (student && !isEditing) {
      setFormData({
        firstName: student.firstName || "",
        lastName: student.lastName || "",
        contactNumber: student.contactNumber || "",
        profileImage: student.profileImage || "",
        gender: student.gender || "male",
        address: {
          street: student.address?.street || "",
          city: student.address?.city || "",
          state: student.address?.state || "",
          zipCode: student.address?.zipCode || "",
          country: student.address?.country || "",
        },
      });
    }
  }, [student]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    group?: "address"
  ) => {
    const { name, value } = e.target;

    if (group === "address") {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleGenderChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      gender: value as "male" | "female" | "other",
    }));
  };

  const handleSubmit = async () => {
    try {
      await updateStudent({ id: studentId, body: formData }).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Student Profile</h2>

      <div className="mb-4 flex justify-center">
        <img
          src={formData.profileImage || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover"
        />
      </div>

      {isEditing ? (
        <>
          {/* Editable Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>First Name</Label>
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Contact Number</Label>
              <Input
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Profile Image URL</Label>
              <Input
                name="profileImage"
                value={formData.profileImage}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Gender</Label>
              <Select
                value={formData.gender}
                onValueChange={handleGenderChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Street</Label>
              <Input
                name="street"
                value={formData.address.street}
                onChange={(e) => handleChange(e, "address")}
              />
            </div>
            <div>
              <Label>City</Label>
              <Input
                name="city"
                value={formData.address.city}
                onChange={(e) => handleChange(e, "address")}
              />
            </div>
            <div>
              <Label>State</Label>
              <Input
                name="state"
                value={formData.address.state}
                onChange={(e) => handleChange(e, "address")}
              />
            </div>
            <div>
              <Label>Zip Code</Label>
              <Input
                name="zipCode"
                value={formData.address.zipCode}
                onChange={(e) => handleChange(e, "address")}
              />
            </div>
            <div>
              <Label>Country</Label>
              <Input
                name="country"
                value={formData.address.country}
                onChange={(e) => handleChange(e, "address")}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <Button onClick={handleCancel} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isUpdating}>
              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </>
      ) : (
        <>
          {/* View Mode */}
          <p>
            <strong>Name:</strong> {student?.firstName} {student?.lastName}
          </p>
          <p>
            <strong>Email:</strong> {student?.email}
          </p>
          <p>
            <strong>Gender:</strong> {student?.gender}
          </p>
          <p>
            <strong>Contact:</strong> {student?.contactNumber}
          </p>
          <p>
            <strong>Address:</strong> {student?.address?.street},{" "}
            {student?.address?.city}, {student?.address?.state}{" "}
            {student?.address?.zipCode}, {student?.address?.country}
          </p>

          <div className="mt-6 text-right">
            <Button onClick={handleEdit}>Edit Profile</Button>
          </div>
        </>
      )}
    </div>
  );
}
