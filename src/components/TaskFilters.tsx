import React from 'react';
import { Search, Filter } from 'lucide-react';

interface TaskFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  priorityFilter: string;
  onPriorityChange: (priority: 'all' | 'low' | 'medium' | 'high') => void;
}

export function TaskFilters({
  searchQuery,
  onSearchChange,
  priorityFilter,
  onPriorityChange
}: TaskFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Otsi tellimusi..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div className="flex items-center gap-2">
        <Filter size={20} className="text-gray-500" />
        <select
          value={priorityFilter}
          onChange={(e) => onPriorityChange(e.target.value as 'all' | 'low' | 'medium' | 'high')}
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">Kõik prioriteedid</option>
          <option value="low">Madal</option>
          <option value="medium">Keskmine</option>
          <option value="high">Kõrge</option>
        </select>
      </div>
    </div>
  );
}