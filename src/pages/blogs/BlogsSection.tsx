import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllBlogsQuery } from "@/redux/features/blog/blogApi";
import React from "react";

const formatDate = (dateStr: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};

const BlogsSection: React.FC = () => {
  const { data: blogs, isLoading } = useGetAllBlogsQuery();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 sm:p-6">
      {isLoading
        ? Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="p-4 space-y-4">
              <Skeleton className="h-40 w-full rounded-xl" />
              <div className="flex items-center justify-between">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <div className="flex justify-between">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-24" />
              </div>
            </Card>
          ))
        : blogs?.map((blog) => (
            <Card
              key={blog._id}
              className="overflow-hidden border shadow-sm hover:shadow-md transition-all"
            >
              {/* Banner Image */}
              {blog.bannerImage && (
                <img
                  src={blog.bannerImage}
                  alt="Blog Banner"
                  className="w-full h-40 sm:h-48 md:h-56 object-cover"
                />
              )}

              <CardContent className="px-4 sm:px-6 py-4 space-y-4">
                {/* Profile & Category */}
                <div className="flex items-center justify-between">
                  <img
                    src={blog.profileImage}
                    alt="Author"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border"
                  />
                  <Badge variant="outline" className="text-xs sm:text-sm">
                    {blog.category}
                  </Badge>
                </div>

                {/* Title */}
                <CardTitle className="text-lg sm:text-xl font-semibold line-clamp-2">
                  {blog.title}
                </CardTitle>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {blog.description}
                </p>

                {/* Link and Date */}
                <div className="flex justify-between items-center">
                  {blog.link && (
                    <a
                      href={blog.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base text-primary underline"
                    >
                      Read full article
                    </a>
                  )}
                  <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                    {blog.createdAt ? formatDate(blog.createdAt) : "No date"}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
    </div>
  );
};

export default BlogsSection;
