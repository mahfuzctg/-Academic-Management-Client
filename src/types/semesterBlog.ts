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
  votedBy?: string[];
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}

export interface TSemesterBlog {
  _id?: string;
  title: string;
  category: string;
  semesterNo: number;
  description: string;
  link?: string;
  bannerImage?: string;
  profileImage?: string;
  isDeleted?: boolean;
  votedBy?: string[];
  votes?: number;
  status?: "Top-Writer" | "Regular" | "Basic";
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}
