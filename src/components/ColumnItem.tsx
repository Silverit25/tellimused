import React from 'react';
import { X } from 'lucide-react';

interface ColumnItemProps {
  item: string;
  onDelete: () => void;
}

export function ColumnItem({ item, onDelete }: ColumnItemProps) {
  return (
    <div className="p-3 bg-gray-50 rounded-md flex justify-between items-center group hover:bg-gray-100 transition-colors">
      <span className="text-gray-700">{item}</span>
      <button
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
      >
        <X size={16} />
      </button>
    </div>
  );
}