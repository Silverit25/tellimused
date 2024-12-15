import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getDaysInMonth, getMonthDays } from '../utils/dateUtils';
import type { TaskItem } from '../types';

interface CalendarProps {
  tasks: TaskItem[];
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

export function Calendar({ tasks, selectedDate, onDateSelect }: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const selected = new Date(selectedDate);

  const daysInMonth = getDaysInMonth(currentDate);
  const monthDays = getMonthDays(currentDate);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getTaskCountForDate = (date: Date) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.deadline);
      return taskDate.toDateString() === date.toDateString();
    }).length;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {currentDate.toLocaleString('et-EE', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['E', 'T', 'K', 'N', 'R', 'L', 'P'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-600 dark:text-gray-400 py-2">
            {day}
          </div>
        ))}

        {monthDays.map((date, index) => {
          const isCurrentMonth = date.getMonth() === currentDate.getMonth();
          const isSelected = date.toDateString() === selected.toDateString();
          const taskCount = getTaskCountForDate(date);

          return (
            <button
              key={index}
              onClick={() => onDateSelect(date.toISOString())}
              className={`
                p-2 text-sm relative
                ${isCurrentMonth ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400 dark:text-gray-500'}
                ${isSelected ? 'bg-blue-500 text-white dark:text-white rounded-lg' : 'hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg'}
              `}
            >
              <span>{date.getDate()}</span>
              {taskCount > 0 && (
                <span className={`
                  absolute bottom-1 right-1 w-2 h-2 rounded-full
                  ${isSelected ? 'bg-white' : 'bg-blue-500'}
                `} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}