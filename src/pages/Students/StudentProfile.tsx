import { useGetMeQuery } from "@/redux/features/users/userApi";

const StudentProfile = () => {
  const { data, isLoading, error } = useGetMeQuery(undefined);

  if (isLoading) return <p>Loading profile...</p>;
  if (error) return <p>Error loading profile.</p>;

  const user = data?.data;

  const fullName = `${user?.name?.firstName || ""} ${
    user?.name?.middleName || ""
  } ${user?.name?.lastName || ""}`.trim();

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-6">
          <img
            src={user?.profileImg || "https://i.ibb.co/4pDNDk1/avatar.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{fullName}</h2>
            <p className="text-sm text-gray-500">
              {user?.user?.role?.toUpperCase()}
            </p>
            <p className="text-sm text-gray-600">{user?.email}</p>
          </div>
        </div>

        {/* Personal Info */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Personal Information
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            <p>
              <strong>Student ID:</strong> {user?.id}
            </p>
            <p>
              <strong>Gender:</strong> {user?.gender}
            </p>
            <p>
              <strong>Date of Birth:</strong>{" "}
              {new Date(user?.dateOfBirth).toLocaleDateString()}
            </p>
            <p>
              <strong>Contact No:</strong> {user?.contactNo}
            </p>
            <p>
              <strong>Emergency Contact:</strong> {user?.emergencyContactNo}
            </p>
            <p>
              <strong>Present Address:</strong> {user?.presentAddress}
            </p>
            <p>
              <strong>Permanent Address:</strong> {user?.permanentAddress}
            </p>
            <p>
              <strong>Status:</strong> {user?.user?.status}
            </p>
            <p>
              <strong>Email:</strong> {user?.user?.email}
            </p>
            <p>
              <strong>Needs Password Change:</strong>{" "}
              {user?.user?.needsPasswordChange ? "Yes" : "No"}
            </p>
          </div>
        </div>

        {/* Guardian Info */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Guardian Information
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            <p>
              <strong>Father's Name:</strong> {user?.guardian?.fatherName}
            </p>
            <p>
              <strong>Father's Occupation:</strong>{" "}
              {user?.guardian?.fatherOccupation}
            </p>
            <p>
              <strong>Father's Contact:</strong>{" "}
              {user?.guardian?.fatherContactNo}
            </p>
            <p>
              <strong>Mother's Name:</strong> {user?.guardian?.motherName}
            </p>
            <p>
              <strong>Mother's Occupation:</strong>{" "}
              {user?.guardian?.motherOccupation}
            </p>
            <p>
              <strong>Mother's Contact:</strong>{" "}
              {user?.guardian?.motherContactNo}
            </p>
          </div>
        </div>

        {/* Local Guardian Info */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Local Guardian
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            <p>
              <strong>Name:</strong> {user?.localGuardian?.name}
            </p>
            <p>
              <strong>Occupation:</strong> {user?.localGuardian?.occupation}
            </p>
            <p>
              <strong>Contact:</strong> {user?.localGuardian?.contactNo}
            </p>
            <p>
              <strong>Address:</strong> {user?.localGuardian?.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
