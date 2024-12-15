import React from 'react';
import { TaskItem } from './TaskItem';
import type { DailyTasksProps } from '../types';
import { formatDate } from '../utils/dateUtils';

export function DailyTasks({ date, tasks, onTaskUpdate }: DailyTasksProps) {
  const formattedDate = formatDate(new Date(date));

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">
        Tellimused: {formattedDate}
      </h2>
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            Sellel päeval pole tellimusi
          </p>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              item={task}
              onDelete={() => {/* Handle delete */}}
            />
          ))
        )}
      </div>
    </div>
  );
}