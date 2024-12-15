import React from 'react';
import { CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import type { TaskItem } from '../types';

interface TaskStatsProps {
  tasks: TaskItem[];
}

export function TaskStats({ tasks }: TaskStatsProps) {
  const now = new Date();
  const stats = tasks.reduce((acc, task) => {
    const deadline = new Date(task.deadline);
    if (deadline < now) {
      acc.overdue++;
    } else {
      const hoursUntilDeadline = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60);
      if (hoursUntilDeadline <= 24) {
        acc.urgent++;
      }
    }
    return acc;
  }, { overdue: 0, urgent: 0 });

  const completedTasks = tasks.filter(task => task.status === 'completed').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-green-50 p-4 rounded-lg flex items-center gap-3">
        <CheckCircle2 className="text-green-500" size={24} />
        <div>
          <h3 className="font-medium text-green-700">Tehtud Tellimused</h3>
          <p className="text-2xl font-bold text-green-800">{completedTasks}</p>
        </div>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg flex items-center gap-3">
        <Clock className="text-yellow-500" size={24} />
        <div>
          <h3 className="font-medium text-yellow-700">Kiired Tellimused</h3>
          <p className="text-2xl font-bold text-yellow-800">{stats.urgent}</p>
        </div>
      </div>

      <div className="bg-red-50 p-4 rounded-lg flex items-center gap-3">
        <AlertTriangle className="text-red-500" size={24} />
        <div>
          <h3 className="font-medium text-red-700">Hilinenud Tellimused</h3>
          <p className="text-2xl font-bold text-red-800">{stats.overdue}</p>
        </div>
      </div>
    </div>
  );
}