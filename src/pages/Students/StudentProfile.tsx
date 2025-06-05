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
  const studentId = user?._id;

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
    email: "",
    contactNumber: "",
    profileImage: "",
    gender: "male" as "male" | "female" | "other",
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
        email: student.email || "",
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
  }, [student, isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (student) {
      setFormData({
        firstName: student.firstName || "",
        lastName: student.lastName || "",
        email: student.email || "",
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
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </div>
            <div>
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="Enter contact number"
              />
            </div>
            <div>
              <Label htmlFor="profileImage">Profile Image URL</Label>
              <Input
                id="profileImage"
                name="profileImage"
                value={formData.profileImage}
                onChange={handleChange}
                placeholder="Enter image URL"
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
              <Label htmlFor="street">Street</Label>
              <Input
                id="street"
                name="street"
                value={formData.address.street}
                onChange={(e) => handleChange(e, "address")}
                placeholder="Enter street"
              />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={formData.address.city}
                onChange={(e) => handleChange(e, "address")}
                placeholder="Enter city"
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                name="state"
                value={formData.address.state}
                onChange={(e) => handleChange(e, "address")}
                placeholder="Enter state"
              />
            </div>
            <div>
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input
                id="zipCode"
                name="zipCode"
                value={formData.address.zipCode}
                onChange={(e) => handleChange(e, "address")}
                placeholder="Enter zip code"
              />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                value={formData.address.country}
                onChange={(e) => handleChange(e, "address")}
                placeholder="Enter country"
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
          {/* Default view: only profile picture, full name and role */}
          <p className="text-center text-xl font-semibold">
            {student?.firstName} {student?.lastName}
          </p>
          <p className="text-center text-gray-600 mt-1">
            Role: {student?.role || "Student"}
          </p>

          <div className="mt-6 text-center">
            <Button onClick={handleEdit}>Edit Profile</Button>
          </div>
        </>
      )}
    </div>
  );
}
