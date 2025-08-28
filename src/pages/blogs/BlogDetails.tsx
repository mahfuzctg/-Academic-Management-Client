import { Badge } from "@/components/ui/badge";
import { useGetSingleBlogQuery } from "@/redux/features/blog/blogApi";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, isLoading } = useGetSingleBlogQuery(id!);

  const formatDate = (dateStr: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (!blog) return <p className="p-6">Blog not found.</p>;

  return (
    <div className="w-11/12 lg:w-8/12 mx-auto py-10 space-y-6">
      {/* Title */}
      <h1 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 dark:text-white">
        {blog.title}
      </h1>

      {/* Category */}
      <div className="flex justify-center mt-2">
        <Badge variant="secondary" className="text-sm">
          {blog.category}
        </Badge>
      </div>

      {/* Banner Image */}
      {blog.bannerImage && (
        <div className="mt-6">
          <img
            src={blog.bannerImage}
            alt="Banner"
            className="w-full h-72 object-cover rounded-xl shadow-sm"
          />
        </div>
      )}

      {/* Profile Image & Date */}
      <div className="flex justify-between items-center mt-6">
        <p className="text-sm text-muted-foreground">
          Posted on: {blog.createdAt ? formatDate(blog.createdAt) : "N/A"}
        </p>
        {blog.profileImage && (
          <img
            src={blog.profileImage}
            alt="Profile"
            className="w-12 h-12 rounded-full border shadow-md object-cover"
          />
        )}
      </div>

      {/* Description */}
      <div className="text-lg leading-8 text-gray-700 dark:text-gray-300 space-y-4">
        <p>{blog.description}</p>

        {/* Static Text Block */}
        <p>
          In today's fast-paced world, blogs offer a unique opportunity to
          reflect, explore, and share diverse perspectives. Whether it's
          technology, education, or personal development, a well-crafted blog
          post can influence minds and ignite new ideas.
        </p>
        <p>
          We believe in showcasing authentic student voices. Each blog here
          represents not just content, but commitment, curiosity, and
          creativity. From coding journeys to semester insights, your stories
          shape the academic community around you.
        </p>
        <p>
          Writing isn't just about expressing — it’s about connecting. When we
          write, we bridge the gap between knowledge and experience, helping
          others navigate their path with more clarity and confidence.
        </p>
        <p>
          If you feel inspired by what you read, let it be a reminder that you,
          too, have something valuable to share. Every line written is a step
          toward growth — both personal and communal.
        </p>
        <p>
          Continue learning. Keep building. And never stop sharing your story.
          Because in your journey, others may find their direction.
        </p>
      </div>

      {/* Optional External Link */}
      {blog.link && (
        <div className="pt-6">
          <a
            href={blog.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 transition"
          >
            Read full article externally
          </a>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
