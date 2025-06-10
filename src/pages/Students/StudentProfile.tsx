import { useGetMeQuery } from "@/redux/features/users/userApi";

const StudentProfile = () => {
  const { data, isLoading, error } = useGetMeQuery(undefined);

  if (isLoading) return <p>Loading profile...</p>;
  if (error) return <p>Error loading profile.</p>;

  const user = data?.data;

  // Protect against undefined access
  const fullName = `${user?.name?.firstName || ""} ${
    user?.name?.middleName || ""
  } ${user?.name?.lastName || ""}`.trim();

  return (
    <div>
      <h2>Student Profile</h2>
      <p>
        <strong>Full Name:</strong> {fullName}
      </p>
      <p>
        <strong>Email:</strong> {user?.email}
      </p>
      <p>
        <strong>Role:</strong> {user?.user?.role}
      </p>
      {/* Add more fields safely like above */}
    </div>
  );
};

export default StudentProfile;
