export interface TaskItem {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high';
  notes?: string;
  status: 'pending' | 'completed';
  createdAt: string;
  updatedAt: string;
  deadline: string;
  client?: string;
  address?: string;
  creator?: string; // Added creator field
}

export interface TaskFormData {
  title: string;
  priority: 'low' | 'medium' | 'high';
  notes?: string;
  deadline: string;
  client?: string;
  address?: string;
  creator?: string; // Added creator field
}

export interface DailyTasksProps {
  date: string;
  tasks: TaskItem[];
  onTaskUpdate: (task: TaskItem) => void;
}