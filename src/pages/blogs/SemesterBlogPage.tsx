import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import {
  useGetAllSemesterBlogsQuery,
  useVoteSemesterBlogMutation,
} from "@/redux/features/semesterBlog/semesterBlogApi";
import { useAppSelector } from "@/redux/hooks";
import { CheckCircle, ThumbsUp } from "lucide-react";
import React, { useState } from "react";

const formatDate = (dateStr: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};

const SemesterBlogPage: React.FC = () => {
  const { data: blogs, isLoading } = useGetAllSemesterBlogsQuery();
  const [voteSemesterBlog] = useVoteSemesterBlogMutation();
  const { user } = useAppSelector((state) => state.auth);
  const { toast } = useToast();
  const [votedBlogIds, setVotedBlogIds] = useState<string[]>([]);

  const handleVote = async (blogId: string) => {
    try {
      await voteSemesterBlog(blogId).unwrap();
      setVotedBlogIds((prev) => [...prev, blogId]);
      toast({
        title: "Voted Successfully",
        description: "Thanks for voting on this blog!",
      });
    } catch (error) {
      toast({
        title: "Vote Failed",
        description: "You may have already voted or something went wrong.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-10/12 mx-auto py-8 space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Card
                key={i}
                className="p-6 space-y-6 animate-pulse rounded-lg shadow-md dark:shadow-gray-800"
              >
                <Skeleton className="h-44 w-full rounded-xl" />
                <div className="flex items-center justify-between">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-5 w-full" />
                <div className="flex justify-between">
                  <Skeleton className="h-6 w-28 rounded-md" />
                  <Skeleton className="h-6 w-32 rounded-md" />
                </div>
              </Card>
            ))
          : blogs?.map((blog) => {
              const hasVoted =
                votedBlogIds.includes(blog._id!) ||
                blog.votedBy?.includes(user?._id);

              let statusLabel = "Basic";
              if (blog.votes! >= 3) statusLabel = "Top-Writer";
              else if (blog.votes! === 2) statusLabel = "Regular";

              return (
                <Card
                  key={blog._id}
                  className="overflow-hidden border rounded-lg shadow-lg dark:border-gray-700 dark:shadow-gray-800 hover:shadow-xl dark:hover:shadow-gray-700 transition-shadow duration-300 bg-white dark:bg-gray-900"
                >
                  {blog.bannerImage && (
                    <img
                      src={blog.bannerImage}
                      alt="Banner"
                      className="w-full h-44 sm:h-52 object-cover"
                    />
                  )}

                  <CardContent className="px-6 py-5 space-y-5">
                    <div className="flex items-center justify-between">
                      {blog.profileImage ? (
                        <img
                          src={blog.profileImage}
                          alt="Profile"
                          className="w-12 h-12 rounded-full object-cover border"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-muted" />
                      )}
                      <Badge variant="outline" className="text-xs">
                        Semester {blog.semesterNo}
                      </Badge>
                    </div>

                    <CardTitle className="text-xl font-semibold line-clamp-2">
                      {blog.title}
                    </CardTitle>

                    <Badge variant="secondary" className="text-xs">
                      {blog.category}
                    </Badge>

                    <p className="text-base text-muted-foreground line-clamp-3">
                      {blog.description}
                    </p>

                    <div className="flex justify-between items-center pt-4">
                      {blog.link && (
                        <a
                          href={blog.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-primary underline hover:text-primary/80"
                        >
                          Read more
                        </a>
                      )}
                      <span className="text-sm text-muted-foreground">
                        {blog.createdAt ? formatDate(blog.createdAt) : "N/A"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <Badge className="text-xs">{statusLabel}</Badge>
                      <button
                        onClick={() =>
                          blog._id && !hasVoted && handleVote(blog._id)
                        }
                        disabled={hasVoted}
                        className={`flex items-center gap-2 border rounded-md px-4 py-1.5 text-sm font-medium transition-all ${
                          hasVoted
                            ? "bg-gray-900 text-white cursor-not-allowed"
                            : "bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                        }`}
                      >
                        {hasVoted ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-white" />
                            Voted
                          </>
                        ) : (
                          <>
                            <ThumbsUp className="w-4 h-4" />
                            Vote ({blog.votes ?? 0})
                          </>
                        )}
                      </button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
      </div>
    </div>
  );
};

export default SemesterBlogPage;
