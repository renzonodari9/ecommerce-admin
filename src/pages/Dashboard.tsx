import { useEffect, useState } from 'react';
import api from '../services/api';
import {
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

interface Stats {
  products: number;
  orders: number;
  revenue: number;
  recentOrders: any[];
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    products: 0,
    orders: 0,
    revenue: 0,
    recentOrders: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [productsData, ordersData] = await Promise.all([
        api.getProducts('limit=100'),
        api.getOrders('limit=5&sortBy=createdAt&sortOrder=desc'),
      ]);

      const orders = ordersData as any;
      const revenue = orders.data?.reduce(
        (sum: number, order: any) => sum + Number(order.total || 0),
        0
      ) || 0;

      setStats({
        products: (productsData as any).pagination?.total || 0,
        orders: (ordersData as any).pagination?.total || 0,
        revenue,
        recentOrders: (ordersData as any).data || [],
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: 'Productos',
      value: stats.products,
      icon: Package,
      color: 'bg-blue-500',
      trend: '+12%',
      up: true,
    },
    {
      label: 'Pedidos',
      value: stats.orders,
      icon: ShoppingCart,
      color: 'bg-green-500',
      trend: '+8%',
      up: true,
    },
    {
      label: 'Ingresos',
      value: `$${stats.revenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-purple-500',
      trend: '+24%',
      up: true,
    },
    {
      label: 'Crecimiento',
      value: '84%',
      icon: TrendingUp,
      color: 'bg-orange-500',
      trend: '+5%',
      up: true,
    },
  ];

  const statusColors: Record<string, string> = {
    PENDING: 'badge-warning',
    PROCESSING: 'badge-info',
    SHIPPED: 'badge-primary',
    DELIVERED: 'badge-success',
    CANCELLED: 'badge-danger',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 mt-1">Resumen de tu tienda</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="card-stat">
            <div className="flex items-center justify-between">
              <div className={`${stat.color} p-3 rounded-xl`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <div
                className={`flex items-center gap-1 text-sm ${
                  stat.up ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.up ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {stat.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Pedidos Recientes
          </h3>
          {loading ? (
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-gray-100 rounded-lg" />
              ))}
            </div>
          ) : stats.recentOrders.length > 0 ? (
            <div className="space-y-4">
              {stats.recentOrders.map((order: any) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-800">{order.orderNumber}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString('es-AR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">
                      ${Number(order.total).toFixed(2)}
                    </p>
                    <span className={`badge ${statusColors[order.status] || 'badge-info'}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No hay pedidos recientes</p>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Acciones Rápidas
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <a
              href="/products"
              className="flex flex-col items-center justify-center p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
            >
              <Package className="text-blue-600 mb-2" size={32} />
              <span className="text-blue-800 font-medium">Gestionar Productos</span>
            </a>
            <a
              href="/orders"
              className="flex flex-col items-center justify-center p-6 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
            >
              <ShoppingCart className="text-green-600 mb-2" size={32} />
              <span className="text-green-800 font-medium">Ver Pedidos</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
