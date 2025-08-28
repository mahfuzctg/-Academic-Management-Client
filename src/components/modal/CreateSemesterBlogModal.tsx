import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useCreateSemesterBlogMutation } from "@/redux/features/semesterBlog/semesterBlogApi";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CreateSemesterBlogModal = ({ open, onClose }: Props) => {
  const { user } = useAppSelector((state) => state.auth);
  const { toast } = useToast();
  const [createSemesterBlog] = useCreateSemesterBlogMutation();

  const [form, setForm] = useState({
    title: "",
    category: "",
    semesterNo: "",
    description: "",
    link: "",
    bannerImage: "",
    profileImage: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { title, category, semesterNo, description } = form;

    if (!title || !category || !semesterNo || !description) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      await createSemesterBlog({
        ...form,
        semesterNo: Number(form.semesterNo),
        createdBy: user?._id,
      }).unwrap();

      toast({
        title: "Semester Blog Created",
        description: "Your semester blog has been successfully posted.",
      });

      setForm({
        title: "",
        category: "",
        semesterNo: "",
        description: "",
        link: "",
        bannerImage: "",
        profileImage: "",
      });
      onClose();
    } catch (err) {
      toast({
        title: "Creation Failed",
        description: "Something went wrong while creating the blog.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="space-y-4">
        <DialogTitle>Create Semester Blog</DialogTitle>
        <DialogDescription>
          Fill in the fields to share your semester experience.
        </DialogDescription>

        <Input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Blog Title"
        />
        <Input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category (e.g. Projects, Experience)"
        />
        <Input
          name="semesterNo"
          type="number"
          value={form.semesterNo}
          onChange={handleChange}
          placeholder="Semester Number (e.g. 1, 2, 3...)"
        />
        <Textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Blog Description"
        />
        <Input
          name="link"
          value={form.link}
          onChange={handleChange}
          placeholder="External Link (optional)"
        />
        <Input
          name="bannerImage"
          value={form.bannerImage}
          onChange={handleChange}
          placeholder="Banner Image URL"
        />
        <Input
          name="profileImage"
          value={form.profileImage}
          onChange={handleChange}
          placeholder="Profile Image URL"
        />

        <div className="flex justify-end">
          <Button onClick={handleSubmit}>Create Semester Blog</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSemesterBlogModal;
