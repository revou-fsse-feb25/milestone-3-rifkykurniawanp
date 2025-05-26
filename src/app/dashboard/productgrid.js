import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

export default function ProductGrid({ products, openModal, handleDelete }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <img
            src={product.images?.[0] || 'https://via.placeholder.com/300'}
            alt={product.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {product.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">
              {product.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-green-600">
                ${product.price}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => openModal('product', 'edit', product)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete('product', product.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}