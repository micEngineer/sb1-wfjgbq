import React from 'react';
import { Category, CATEGORIES } from '../types/inventory';

interface CategoryTabProps {
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  itemCounts: Record<string, number>;
}

export function CategoryTab({ activeCategory, onCategoryChange, itemCounts }: CategoryTabProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-4 overflow-x-auto py-4 px-4" aria-label="カテゴリー">
        <button
          onClick={() => onCategoryChange(null)}
          className={`
            px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap
            ${
              activeCategory === null
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-500 hover:text-gray-700'
            }
          `}
        >
          全て ({itemCounts.all || 0})
        </button>
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`
              px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap
              ${
                activeCategory === category
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }
            `}
          >
            {category} ({itemCounts[category] || 0})
          </button>
        ))}
      </nav>
    </div>
  );
}