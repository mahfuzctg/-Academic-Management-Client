import CreateSemesterBlogModal from "@/components/modal/CreateSemesterBlogModal";
import EditBlogModal from "@/components/modal/EditBlogModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import {
  useDeleteSemesterBlogMutation,
  useGetAllSemesterBlogsQuery,
  useVoteSemesterBlogMutation,
} from "@/redux/features/semesterBlog/semesterBlogApi";
import { useAppSelector } from "@/redux/hooks";
import type { ISemesterBlog } from "@/types/semesterBlog";
import {
  CheckCircle,
  Pencil,
  PlusCircle,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";

const formatDate = (dateStr: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};

const MySemesterBlogSection: React.FC = () => {
  const { data: blogs, isLoading } = useGetAllSemesterBlogsQuery();
  const [voteSemesterBlog] = useVoteSemesterBlogMutation();
  const [deleteSemesterBlog] = useDeleteSemesterBlogMutation();
  const { user } = useAppSelector((state) => state.auth);
  const { toast } = useToast();
  const [votedBlogIds, setVotedBlogIds] = useState<string[]>([]);
  const [editingBlog, setEditingBlog] = useState<ISemesterBlog | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const handleVote = async (blogId: string) => {
    try {
      await voteSemesterBlog(blogId).unwrap();
      setVotedBlogIds((prev) => [...prev, blogId]);
      toast({
        title: "Vote Successful!",
        description: "You voted your blog.",
      });
    } catch {
      toast({
        title: "Vote Failed",
        description: "Maybe you already voted or something went wrong.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSemesterBlog(id).unwrap();
      toast({
        title: "Blog Deleted",
        description: "Your semester blog has been removed.",
      });
    } catch {
      toast({
        title: "Delete Failed",
        description: "Something went wrong while deleting.",
        variant: "destructive",
      });
    }
  };

  const mySemesterBlogs = blogs?.filter((blog) => blog.createdBy === user?._id);

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">My Semester Blogs</h2>
        <Button onClick={() => setCreateModalOpen(true)} className="gap-2">
          <PlusCircle className="w-5 h-5" />
          Create New Blog
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card
              key={i}
              className="p-6 space-y-6 animate-pulse rounded-lg shadow-md dark:shadow-gray-800"
            >
              <Skeleton className="h-44 w-full rounded-xl" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-6 w-24" />
            </Card>
          ))
        ) : mySemesterBlogs?.length ? (
          mySemesterBlogs.map((blog) => {
            const hasVoted =
              votedBlogIds.includes(blog._id!) ||
              blog.votedBy?.includes(user?._id);

            return (
              <Card
                key={blog._id}
                className="overflow-hidden border rounded-lg shadow-lg dark:border-gray-700 dark:shadow-gray-800 hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-900"
              >
                {blog.bannerImage && (
                  <img
                    src={blog.bannerImage}
                    alt="Blog Banner"
                    className="w-full h-44 object-cover"
                  />
                )}

                <CardContent className="px-6 py-5 space-y-5">
                  <div className="flex items-center justify-between">
                    <img
                      src={blog.profileImage || "/default-avatar.png"}
                      alt="Author"
                      className="w-12 h-12 rounded-full object-cover border"
                    />
                    <Badge variant="outline" className="text-sm">
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
                        className="text-sm text-primary underline"
                      >
                        Read full article
                      </a>
                    )}
                    <span className="text-sm text-muted-foreground">
                      {formatDate(blog?.createdAt)}
                    </span>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setEditingBlog(blog)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id!)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <button
                    onClick={() =>
                      blog._id && !hasVoted && handleVote(blog._id)
                    }
                    disabled={hasVoted}
                    className={`mt-4 w-full flex items-center justify-center gap-3 rounded-lg border px-5 py-2 text-sm font-semibold shadow-sm transition-colors duration-300
                      ${
                        hasVoted
                          ? "bg-gray-900 text-white cursor-not-allowed"
                          : "bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                      }`}
                  >
                    {hasVoted ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : (
                      <ThumbsUp className="w-5 h-5" />
                    )}
                    {hasVoted ? "Voted" : `Vote (${blog.votes ?? 0})`}
                  </button>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <p className="text-muted-foreground">No semester blogs posted yet.</p>
        )}
      </div>

      {editingBlog && (
        <EditBlogModal
          blog={editingBlog}
          onClose={() => setEditingBlog(null)}
        />
      )}

      {createModalOpen && (
        <CreateSemesterBlogModal
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MySemesterBlogSection;
