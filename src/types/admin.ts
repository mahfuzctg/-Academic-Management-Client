import type { TUser } from "./user";

export interface SystemStats {
  totalStudents: number;
  totalInstructors: number;
  totalCourses: number;
  activeDepartments: number;
  serverStatus: "online" | "offline";
  databaseStatus: "healthy" | "unhealthy";
  lastBackup: string;
}

export interface RecentActivity {
  id: string;
  type: string;
  count: number;
  period: string;
  progress: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  createdBy: TUser;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: TUser;
  roomId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatRoom {
  id: string;
  name: string;
  participants: TUser[];
  lastMessage?: ChatMessage;
  createdAt: string;
  updatedAt: string;
}
