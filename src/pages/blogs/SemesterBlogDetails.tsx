import { Badge } from "@/components/ui/badge";
import { useGetSingleSemesterBlogQuery } from "@/redux/features/semesterBlog/semesterBlogApi";
import { useParams } from "react-router-dom";

const SemesterBlogDetails = () => {
  const { id } = useParams();
  const { data: blog, isLoading } = useGetSingleSemesterBlogQuery(id!);

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (!blog) return <p className="p-6">Blog not found.</p>;

  return (
    <div className="w-11/12 md:w-9/12 mx-auto py-10 space-y-10">
      {/* Banner Image */}
      <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-md">
        <img
          src={blog.bannerImage}
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title + Date + Profile */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {blog.title}
          </h1>
          <div className="mt-2 flex items-center gap-3">
            <Badge variant="secondary">{blog.category}</Badge>
            <span className="text-sm text-muted-foreground">
              Semester {blog.semesterNo}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <p className="text-sm text-muted-foreground">
            {new Date(blog.createdAt!).toLocaleDateString()}
          </p>
          {blog.profileImage && (
            <img
              src={blog.profileImage}
              alt="Profile"
              className="w-16 h-16 rounded-full border-2 border-white dark:border-gray-800 object-cover shadow-md"
            />
          )}
        </div>
      </div>

      {/* Static Info */}
      <div className="bg-muted/50 p-6 rounded-lg border text-base leading-relaxed space-y-4 text-gray-700 dark:text-gray-300">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          About This Blog Series
        </h2>
        <p>
          Welcome to our Semester Blog showcase — a place where students from
          different batches share their academic journey and creative
          explorations.
        </p>
        <p>
          From course insights to project highlights, these posts provide a real
          glimpse into the growth and learning happening semester by semester.
        </p>
        <p>
          Whether you're just starting out or deep into your academic path,
          you'll find inspiration, tips, and shared struggles that mirror your
          own experience.
        </p>
        <p>
          Each blog is peer-voted, and standout writers are awarded “Top Writer”
          and “Regular” status based on votes.
        </p>
        <p>Scroll down to read the full blog and support your peers!</p>
      </div>

      {/* Blog Description */}
      <div className="space-y-6 text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
        <p>{blog.description}</p>
        {blog.link && (
          <a
            href={blog.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm text-blue-600 hover:text-blue-800 underline transition"
          >
            🔗 Read Full Blog (External Link)
          </a>
        )}
      </div>
    </div>
  );
};

export default SemesterBlogDetails;
