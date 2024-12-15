import React from 'react';
import { X, Clock, MapPin, User, CheckCircle, RotateCcw } from 'lucide-react';
import type { TaskItem as TaskItemType } from '../types';

interface TaskItemProps {
  item: TaskItemType;
  onStatusUpdate: () => void;
  onDelete: () => void;
}

const priorityColors = {
  low: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100',
  medium: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100',
  high: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100'
};

export function TaskItem({ item, onStatusUpdate, onDelete }: TaskItemProps) {
  const priorityColor = priorityColors[item.priority];
  const deadline = new Date(item.deadline);
  const isOverdue = deadline < new Date() && item.status === 'pending';

  return (
    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium text-gray-900 dark:text-white truncate">{item.title}</h3>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={onStatusUpdate}
                className="p-1 text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                title={item.status === 'pending' ? 'Märgi tehtuks' : 'Märgi tegemata'}
              >
                {item.status === 'pending' ? (
                  <CheckCircle size={16} />
                ) : (
                  <RotateCcw size={16} />
                )}
              </button>
              <button
                onClick={onDelete}
                className="p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="mt-1 flex flex-wrap gap-2 text-sm">
            {item.creator && (
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                <User size={14} />
                <span>{item.creator}</span>
              </div>
            )}

            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
              <Clock size={14} />
              <span className={isOverdue ? 'text-red-600 dark:text-red-400 font-medium' : ''}>
                {deadline.toLocaleTimeString('et-EE', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${priorityColor}`}>
              {item.priority === 'low' ? 'Madal' : item.priority === 'medium' ? 'Keskmine' : 'Kõrge'}
            </span>
          </div>

          {item.notes && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{item.notes}</p>
          )}
        </div>
      </div>
    </div>
  );
}