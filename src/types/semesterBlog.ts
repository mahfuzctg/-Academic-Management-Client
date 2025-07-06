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
}
