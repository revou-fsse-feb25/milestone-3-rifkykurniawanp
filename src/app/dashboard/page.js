// app/dashboard/page.js
export const revalidate = 60; // ISR aktif: revalidate setiap 60 detik

async function getData() {
  const [usersRes, productsRes] = await Promise.all([
    fetch("https://api.escuelajs.co/api/v1/users?limit=5", { next: { revalidate: 60 } }),
    fetch("https://api.escuelajs.co/api/v1/products?limit=5", { next: { revalidate: 60 } }),
  ]);

  const [users, products] = await Promise.all([usersRes.json(), productsRes.json()]);
  const totalPrice = products.reduce((sum, product) => sum + product.price, 0);

  return { users, products, totalPrice };
}

export default async function Dashboard() {
  const { users, products, totalPrice } = await getData();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Dashboard (ISR)</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card title="Users" value={users.length} />
        <Card title="Products" value={products.length} />
        <Card title="Total Price" value={`$${totalPrice.toFixed(2)}`} />
      </div>

      {/* ... bagian user dan produk sama seperti sebelumnya ... */}
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
      <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
    </div>
  );
}
