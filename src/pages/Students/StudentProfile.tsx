import StudentProfileSkeleton from "@/components/skeleton/Profile/StudentProfileSkeleton";
import { useGetMeQuery } from "@/redux/features/users/userApi";

const StudentProfile = () => {
  const { data, isLoading, error } = useGetMeQuery(undefined);

  if (isLoading) return <StudentProfileSkeleton />;

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 dark:text-red-400">Error loading profile.</p>
      </div>
    );

  const user = data?.data;

  const fullName = `${user?.name?.firstName || ""} ${
    user?.name?.middleName || ""
  } ${user?.name?.lastName || ""}`.trim();

  return (
    <div className="flex justify-center bg-gray-50 dark:bg-gray-900 p-4 min-h-screen transition-colors duration-500">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-3xl p-5 space-y-5">
        {/* Header */}
        <div className="flex items-center gap-4">
          <img
            src={user?.profileImg || "https://i.ibb.co/4pDNDk1/avatar.png"}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border border-gray-300 dark:border-gray-600"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              {fullName}
            </h2>
            <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
              {user?.user?.role}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-xs">
              {user?.email}
            </p>
          </div>
        </div>

        {/* Sections */}
        <Section title="Personal Information">
          <InfoGrid>
            <InfoItem label="Student ID" value={user?.id} />
            <InfoItem label="Gender" value={user?.gender} />
            <InfoItem
              label="Date of Birth"
              value={
                user?.dateOfBirth
                  ? new Date(user.dateOfBirth).toLocaleDateString()
                  : "-"
              }
            />
            <InfoItem label="Contact No" value={user?.contactNo} />
            <InfoItem
              label="Emergency Contact"
              value={user?.emergencyContactNo}
            />
            <InfoItem label="Present Address" value={user?.presentAddress} />
            <InfoItem
              label="Permanent Address"
              value={user?.permanentAddress}
            />
            <InfoItem label="Status" value={user?.user?.status} />
            <InfoItem label="Email" value={user?.user?.email} />
            <InfoItem
              label="Needs Password Change"
              value={user?.user?.needsPasswordChange ? "Yes" : "No"}
            />
          </InfoGrid>
        </Section>

        <Section title="Guardian Information">
          <InfoGrid>
            <InfoItem
              label="Father's Name"
              value={user?.guardian?.fatherName}
            />
            <InfoItem
              label="Father's Occupation"
              value={user?.guardian?.fatherOccupation}
            />
            <InfoItem
              label="Father's Contact"
              value={user?.guardian?.fatherContactNo}
            />
            <InfoItem
              label="Mother's Name"
              value={user?.guardian?.motherName}
            />
            <InfoItem
              label="Mother's Occupation"
              value={user?.guardian?.motherOccupation}
            />
            <InfoItem
              label="Mother's Contact"
              value={user?.guardian?.motherContactNo}
            />
          </InfoGrid>
        </Section>

        <Section title="Local Guardian">
          <InfoGrid>
            <InfoItem label="Name" value={user?.localGuardian?.name} />
            <InfoItem
              label="Occupation"
              value={user?.localGuardian?.occupation}
            />
            <InfoItem label="Contact" value={user?.localGuardian?.contactNo} />
            <InfoItem label="Address" value={user?.localGuardian?.address} />
          </InfoGrid>
        </Section>
      </div>
    </div>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3 border-b border-gray-200 dark:border-gray-600 pb-1">
      {title}
    </h3>
    {children}
  </div>
);

const InfoGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700 dark:text-gray-300">
    {children}
  </div>
);

const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined | null;
}) => (
  <p>
    <span className="font-medium text-gray-900 dark:text-white">{label}: </span>
    <span>{value || "-"}</span>
  </p>
);

export default StudentProfile;
