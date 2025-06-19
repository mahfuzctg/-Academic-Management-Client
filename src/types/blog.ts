export interface IBlog {
  _id?: string;
  title: string;
  category: string;
  description: string;
  link?: string;
  profileImage?: string;
  bannerImage?: string;
  createdAt?: string; // add createdAt date string
  updatedAt?: string; // optional updatedAt too
}
