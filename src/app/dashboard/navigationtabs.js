import React from 'react';
import { DollarSign, Users, Package } from 'lucide-react';

export default function NavigationTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'overview', name: 'Overview', icon: DollarSign },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'products', name: 'Products', icon: Package }
  ];

  return (
    <div className="mb-8">
      <nav className="flex space-x-8">
        {tabs.map(({ id, name, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              activeTab === id
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <Icon className="w-4 h-4 mr-2" />
            {name}
          </button>
        ))}
      </nav>
    </div>
  );
}