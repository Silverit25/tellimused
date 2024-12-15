import React from 'react';
import { GripVertical, X } from 'lucide-react';

interface ColumnHeaderProps {
  title: string;
  onDelete: () => void;
}

export function ColumnHeader({ title, onDelete }: ColumnHeaderProps) {
  return (
    <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50 rounded-t-lg">
      <div className="flex items-center gap-2">
        <GripVertical className="text-gray-400 cursor-move" size={20} />
        <h3 className="font-semibold text-gray-700">{title}</h3>
      </div>
      <button
        onClick={onDelete}
        className="text-gray-400 hover:text-red-500 transition-colors"
      >
        <X size={20} />
      </button>
    </div>
  );
}