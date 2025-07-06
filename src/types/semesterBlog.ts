import { Types } from "mongoose";

export interface ISemesterBlog {
  _id?: string;
  title: string;
  category: string;
  semesterNo: number;
  description: string;
  link?: string;
  bannerImage?: string;
  profileImage?: string;
  isDeleted?: boolean;
  votes?: number;
  votedBy?: Types.ObjectId[] | string[];
  createdAt?: string;
  updatedAt?: string;
}
