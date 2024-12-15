import React from 'react';
import { Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { TaskItem } from './TaskItem';
import { TaskSearch } from './TaskSearch';
import type { TaskItem as TaskItemType } from '../types';

interface TaskListProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  pendingTasks: TaskItemType[];
  completedTasks: TaskItemType[];
  onStatusUpdate: (taskId: string, status: 'pending' | 'completed') => void;
  onDeleteTask: (taskId: string) => void;
  onAddTask: () => void;
}

export function TaskList({
  searchQuery,
  onSearchChange,
  pendingTasks,
  completedTasks,
  onStatusUpdate,
  onDeleteTask,
  onAddTask
}: TaskListProps) {
  const [draggedTask, setDraggedTask] = React.useState<string | null>(null);
  const [showCompleted, setShowCompleted] = React.useState(false);

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetStatus: 'pending' | 'completed') => {
    if (draggedTask) {
      onStatusUpdate(draggedTask, targetStatus);
      setDraggedTask(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Päeva Tellimused ({pendingTasks.length + completedTasks.length})
        </h2>
        <button
          onClick={onAddTask}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <Plus size={20} />
          <span>Lisa Tellimus</span>
        </button>
      </div>

      <TaskSearch value={searchQuery} onChange={onSearchChange} />

      <div className="grid grid-cols-1 gap-6">
        <div 
          className="bg-white dark:bg-gray-800 rounded-lg p-4"
          onDragOver={handleDragOver}
          onDrop={() => handleDrop('pending')}
        >
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Tegemata Tellimused ({pendingTasks.length})
          </h3>
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
            {pendingTasks.map(task => (
              <div
                key={task.id}
                draggable
                onDragStart={() => handleDragStart(task.id)}
                className="cursor-move"
              >
                <TaskItem
                  item={task}
                  onStatusUpdate={() => onStatusUpdate(task.id, 'completed')}
                  onDelete={() => onDeleteTask(task.id)}
                />
              </div>
            ))}
            {pendingTasks.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                {searchQuery ? 'Ei leitud ühtegi sobivat tellimust' : 'Pole tegemata tellimusi'}
              </p>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Tehtud Tellimused ({completedTasks.length})
            </h3>
            {showCompleted ? (
              <ChevronUp size={20} className="text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronDown size={20} className="text-gray-500 dark:text-gray-400" />
            )}
          </button>
          
          {showCompleted && (
            <div 
              className="space-y-3 mt-4 max-h-[40vh] overflow-y-auto pr-2"
              onDragOver={handleDragOver}
              onDrop={() => handleDrop('completed')}
            >
              {completedTasks.map(task => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={() => handleDragStart(task.id)}
                  className="cursor-move opacity-75 hover:opacity-100"
                >
                  <TaskItem
                    item={task}
                    onStatusUpdate={() => onStatusUpdate(task.id, 'pending')}
                    onDelete={() => onDeleteTask(task.id)}
                  />
                </div>
              ))}
              {completedTasks.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  {searchQuery ? 'Ei leitud ühtegi sobivat tellimust' : 'Pole tehtud tellimusi'}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}