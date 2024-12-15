import React from 'react';
import { useParams } from '@tanstack/react-router';
import { Calendar } from '../components/Calendar';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { TaskStats } from '../components/TaskStats';
import { TaskFilters } from '../components/TaskFilters';
import { useTaskFilters } from '../hooks/useTaskFilters';
import { getTasksByDate, insertTask, updateTaskStatus, deleteTask } from '../db';
import type { TaskFormData, TaskItem } from '../types';

export function DayView() {
  const { date = new Date().toISOString() } = useParams();
  const [tasks, setTasks] = React.useState<TaskItem[]>([]);
  const [isFormOpen, setIsFormOpen] = React.useState(false);

  const {
    searchQuery,
    setSearchQuery,
    priorityFilter,
    setPriorityFilter,
    filteredTasks
  } = useTaskFilters(tasks);

  React.useEffect(() => {
    const loadTasks = () => {
      const dayTasks = getTasksByDate(date);
      setTasks(dayTasks);
    };

    loadTasks();
  }, [date]);

  const handleAddTask = (formData: TaskFormData) => {
    const newTask: TaskItem = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    insertTask(newTask);
    setTasks(prev => [...prev, newTask]);
    setIsFormOpen(false);
  };

  const handleUpdateStatus = (taskId: string, status: 'pending' | 'completed') => {
    updateTaskStatus(taskId, status);
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? { ...task, status, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <TaskStats tasks={tasks} />
        
        <TaskFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          priorityFilter={priorityFilter}
          onPriorityChange={setPriorityFilter}
        />

        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3">
            <Calendar
              tasks={tasks}
              selectedDate={date}
              onDateSelect={(newDate) => {
                window.location.href = `/day/${newDate}`;
              }}
            />
          </div>

          <div className="lg:col-span-9">
            <TaskList
              tasks={filteredTasks}
              onStatusUpdate={handleUpdateStatus}
              onDeleteTask={handleDeleteTask}
              onAddTask={() => setIsFormOpen(true)}
            />
          </div>
        </div>

        {isFormOpen && (
          <TaskForm
            selectedDate={date}
            onSubmit={handleAddTask}
            onClose={() => setIsFormOpen(false)}
          />
        )}
      </div>
    </div>
  );
}