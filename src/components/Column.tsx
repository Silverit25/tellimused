import React from 'react';
import { TaskItem } from './TaskItem';
import type { ColumnProps } from '../types';

export function Column({
  id,
  title,
  items,
  onDragStart,
  onDragOver,
  onDrop,
  onDeleteItem,
}: ColumnProps) {
  return (
    <div
      className="bg-gray-50 rounded-lg p-4 h-[calc(100vh-12rem)] flex flex-col"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, id)}
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800 sticky top-0 bg-gray-50 py-2">
        {title}
      </h2>
      
      <div className="space-y-3 overflow-y-auto flex-1 pr-2">
        {items.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => onDragStart(e, item.id)}
            className="cursor-move"
          >
            <TaskItem
              item={item}
              onDelete={() => onDeleteItem(id, item.id)}
            />
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-gray-500 text-center py-4">
            Pole tellimusi
          </div>
        )}
      </div>
    </div>
  );
}