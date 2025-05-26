import React from 'react';
import { Save, X } from 'lucide-react';
import UserForm from './userform';
import ProductForm from './productform';

export default function Modal({
  modalType,
  modalAction,
  userForm,
  setUserForm,
  productForm,
  setProductForm,
  closeModal,
  handleSave
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {modalAction === 'create' ? 'Add' : 'Edit'} {modalType === 'user' ? 'User' : 'Product'}
          </h3>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {modalType === 'user' ? (
          <UserForm userForm={userForm} setUserForm={setUserForm} />
        ) : (
          <ProductForm productForm={productForm} setProductForm={setProductForm} />
        )}

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={closeModal}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}