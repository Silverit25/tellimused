import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface AddItemFormProps {
  onSubmit: (item: string) => void;
}

export function AddItemForm({ onSubmit }: AddItemFormProps) {
  const [newItem, setNewItem] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.trim()) {
      onSubmit(newItem);
      setNewItem('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Lisa uus element..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>
    </form>
  );
}