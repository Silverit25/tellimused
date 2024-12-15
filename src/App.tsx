import React from 'react';
import { Calendar } from './components/Calendar';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TaskStats } from './components/TaskStats';
import { ThemeToggle } from './components/ThemeToggle';
import { ThemeProvider } from './contexts/ThemeContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { TaskItem, TaskFormData } from './types';

export default function App() {
  const [tasks, setTasks] = useLocalStorage<TaskItem[]>('tasks', []);
  const [selectedDate, setSelectedDate] = React.useState<string>(new Date().toISOString());
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleAddTask = (formData: TaskFormData) => {
    const newTask: TaskItem = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setTasks(prev => [...prev, newTask]);
    setIsFormOpen(false);
  };

  const handleUpdateStatus = (taskId: string, status: 'pending' | 'completed') => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? { ...task, status, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const getDailyTasks = () => {
    return tasks.filter(task => {
      const taskDate = new Date(task.deadline);
      const selectedDay = new Date(selectedDate);
      return taskDate.toDateString() === selectedDay.toDateString();
    });
  };

  const filterTasks = (tasks: TaskItem[]) => {
    if (!searchQuery) return tasks;
    
    const query = searchQuery.toLowerCase();
    return tasks.filter(task => 
      task.title.toLowerCase().includes(query) ||
      task.notes?.toLowerCase().includes(query) ||
      task.creator?.toLowerCase().includes(query)
    );
  };

  const dailyTasks = getDailyTasks();
  const filteredDailyTasks = filterTasks(dailyTasks);
  const pendingTasks = filteredDailyTasks.filter(task => task.status === 'pending');
  const completedTasks = filteredDailyTasks.filter(task => task.status === 'completed');

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
              Transpordi Tellimused
            </h1>
            <ThemeToggle />
          </div>

          <TaskStats tasks={dailyTasks} />

          <div className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-3">
              <Calendar
                tasks={tasks}
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
              />
            </div>

            <div className="lg:col-span-9">
              <TaskList
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                pendingTasks={pendingTasks}
                completedTasks={completedTasks}
                onStatusUpdate={handleUpdateStatus}
                onDeleteTask={handleDeleteTask}
                onAddTask={() => setIsFormOpen(true)}
              />
            </div>
          </div>

          {isFormOpen && (
            <TaskForm
              selectedDate={selectedDate}
              onSubmit={handleAddTask}
              onClose={() => setIsFormOpen(false)}
            />
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}