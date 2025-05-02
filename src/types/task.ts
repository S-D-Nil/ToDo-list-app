export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string; // ISO string format
  completedAt?: string; // ISO string format, optional
}
