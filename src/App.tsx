import React, { useState } from 'react';
import { CategoryTab } from './components/CategoryTab';
import { InventoryList } from './components/InventoryList';
import { SearchBar } from './components/SearchBar';
import { SearchStats } from './components/SearchStats';
import { InventoryItem, InventoryFormData } from './types/inventory';
import { sampleInventoryItems } from './data/sampleData';
import { ShieldCheck, Plus } from 'lucide-react';
import { InventoryModal } from './components/InventoryModal';
import { useInventory } from './hooks/useInventory';
import { calculateItemCounts } from './utils/categoryUtils';

function App() {
  const {
    items,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    addItem,
    editItem,
    deleteItem,
    totalItems,
    filteredCount,
  } = useInventory(sampleInventoryItems);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | undefined>();

  const itemCounts = calculateItemCounts(items);

  const handleAddItem = (formData: InventoryFormData) => {
    addItem(formData);
    setIsModalOpen(false);
  };

  const handleEditItem = (formData: InventoryFormData) => {
    if (!editingItem) return;
    editItem(editingItem.id, formData);
    setEditingItem(undefined);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('このアイテムを削除してもよろしいですか？')) {
      deleteItem(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ShieldCheck className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">防災備蓄管理</h1>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              新規追加
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <SearchStats
              totalItems={totalItems}
              filteredCount={filteredCount}
              searchQuery={searchQuery}
            />
          </div>
          
          <CategoryTab
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            itemCounts={itemCounts}
          />
          
          <div className="p-6">
            <InventoryList
              items={items}
              onEditItem={setEditingItem}
              onDeleteItem={handleDeleteItem}
            />
          </div>
        </div>
      </main>

      <InventoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddItem}
        title="新規アイテムの追加"
      />

      <InventoryModal
        isOpen={!!editingItem}
        onClose={() => setEditingItem(undefined)}
        onSubmit={handleEditItem}
        initialData={editingItem}
        title="アイテムの編集"
      />
    </div>
  );
}

export default App;