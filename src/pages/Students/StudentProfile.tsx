import { useGetMeQuery } from "@/redux/features/users/userApi";

const StudentProfile = () => {
  const { data, error, isLoading } = useGetMeQuery();

  if (isLoading) return <p>Loading profile...</p>;
  if (error) return <p>Error loading profile</p>;

  const user = data?.data;

  if (!user) return <p>No profile data found.</p>;

  return (
    <div>
      <h2>User Profile</h2>
      <p>
        <strong>Full Name:</strong> {user.fullName || "N/A"}
      </p>
      <p>
        <strong>Email:</strong> {user.email || "N/A"}
      </p>
      <p>
        <strong>Role:</strong> {user.role}
      </p>

      {user.role === "student" && <p>Student-specific info can go here</p>}
      {user.role === "admin" && <p>Admin-specific info can go here</p>}
      {user.role === "faculty" && <p>Faculty-specific info can go here</p>}
    </div>
  );
};

export default StudentProfile;
