import React from 'react';
import { Users, Package, DollarSign } from 'lucide-react';
import StatsCard from '../dashboard/statscard';

export default function OverviewTab({ users, products, totalPrice }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatsCard
        title="Total Users"
        value={users.length}
        icon={Users}
        color="bg-blue-500"
      />
      <StatsCard
        title="Total Products"
        value={products.length}
        icon={Package}
        color="bg-green-500"
      />
      <StatsCard
        title="Total Value"
        value={`$${totalPrice.toFixed(2)}`}
        icon={DollarSign}
        color="bg-purple-500"
      />
    </div>
  );
}