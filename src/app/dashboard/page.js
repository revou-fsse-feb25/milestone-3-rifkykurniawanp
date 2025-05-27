"use client";

import React, { useState, useEffect } from 'react';
import { DollarSign, Users, Package } from 'lucide-react';
// import StatsCard from '../dashboard/statscard';
import NavigationTabs from './navigationtabs';
import OverviewTab from './overviewtab';
import UsersTab from './userstab';
import ProductsTab from './productstab';
import Modal from './modal';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalAction, setModalAction] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Form states
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    avatar: '',
    role: 'customer'
  });

  const [productForm, setProductForm] = useState({
    title: '',
    price: '',
    description: '',
    category: { id: 1, name: 'Clothes' },
    images: ['https://via.placeholder.com/300']
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersRes, productsRes] = await Promise.all([
        fetch("https://api.escuelajs.co/api/v1/users"),
        fetch("https://api.escuelajs.co/api/v1/products")
      ]);

      const [usersData, productsData] = await Promise.all([
        usersRes.json(),
        productsRes.json()
      ]);

      setUsers(usersData.slice(0, 20)); 
      setProducts(productsData.slice(0, 50)); 
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = products.reduce((sum, product) => sum + (product.price || 0), 0);

  const openModal = (type, action, item = null) => {
    setModalType(type);
    setModalAction(action);
    setSelectedItem(item);
    
    if (type === 'user') {
      if (action === 'edit' && item) {
        setUserForm({
          name: item.name || '',
          email: item.email || '',
          avatar: item.avatar || '',
          role: item.role || 'customer'
        });
      } else {
        setUserForm({ name: '', email: '', avatar: '', role: 'customer' });
      }
    } else if (type === 'product') {
      if (action === 'edit' && item) {
        setProductForm({
          title: item.title || '',
          price: item.price?.toString() || '',
          description: item.description || '',
          category: item.category || { id: 1, name: 'Clothes' },
          images: item.images || ['https://via.placeholder.com/300']
        });
      } else {
        setProductForm({
          title: '',
          price: '',
          description: '',
          category: { id: 1, name: 'Clothes' },
          images: ['https://via.placeholder.com/300']
        });
      }
    }
    
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleSave = async () => {
    try {
      if (modalType === 'user') {
        if (modalAction === 'create') {
          const newUser = {
            ...userForm,
            id: Date.now(),
            avatar: userForm.avatar || `https://i.pravatar.cc/150?u=${userForm.email}`
          };
          setUsers([newUser, ...users]);
        } else if (modalAction === 'edit') {
          setUsers(users.map(user => 
            user.id === selectedItem.id ? { ...user, ...userForm } : user
          ));
        }
      } else if (modalType === 'product') {
        if (modalAction === 'create') {
          const newProduct = {
            ...productForm,
            id: Date.now(),
            price: parseFloat(productForm.price) || 0
          };
          setProducts([newProduct, ...products]);
        } else if (modalAction === 'edit') {
          setProducts(products.map(product => 
            product.id === selectedItem.id 
              ? { ...product, ...productForm, price: parseFloat(productForm.price) || 0 }
              : product
          ));
        }
      }
      closeModal();
    } catch (error) {
      console.error('Error saving:', error);
    }
  };

  const handleDelete = (type, id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (type === 'user') {
        setUsers(users.filter(user => user.id !== id));
      } else if (type === 'product') {
        setProducts(products.filter(product => product.id !== id));
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-xl text-gray-600 dark:text-gray-400">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your users and products with full CRUD operations
          </p>
        </div>

        {/* Navigation Tabs */}
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <OverviewTab
            users={users}
            products={products}
            totalPrice={totalPrice}
          />
        )}

        {activeTab === 'users' && (
          <UsersTab
            users={users}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            openModal={openModal}
            handleDelete={handleDelete}
          />
        )}

        {activeTab === 'products' && (
          <ProductsTab
            products={products}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            openModal={openModal}
            handleDelete={handleDelete}
          />
        )}

        {/* Modal */}
        {showModal && (
          <Modal
            modalType={modalType}
            modalAction={modalAction}
            userForm={userForm}
            setUserForm={setUserForm}
            productForm={productForm}
            setProductForm={setProductForm}
            closeModal={closeModal}
            handleSave={handleSave}
          />
        )}
      </div>
      
    </div>

    
  );
}