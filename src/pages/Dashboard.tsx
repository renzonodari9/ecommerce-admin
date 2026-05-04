import { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../services/api';

interface StatCard {
  label: string;
  value: string | number;
  change: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
}

interface RecentOrder {
  id: string;
  customer: string;
  total: number;
  status: string;
  date: string;
}

const mockStats: StatCard[] = [
  { label: 'Ventas Totales', value: '$24,589', change: 12.5, icon: DollarSign, color: 'text-green-500' },
  { label: 'Pedidos', value: '156', change: 8.2, icon: ShoppingCart, color: 'text-blue-500' },
  { label: 'Clientes Nuevos', value: '89', change: -2.4, icon: Users, color: 'text-purple-500' },
  { label: 'Productos', value: '234', change: 5.1, icon: Package, color: 'text-orange-500' },
];

const mockSalesData = [
  { day: 'Lun', sales: 2400 },
  { day: 'Mar', sales: 1398 },
  { day: 'Mié', sales: 3800 },
  { day: 'Jue', sales: 3908 },
  { day: 'Vie', sales: 4800 },
  { day: 'Sáb', sales: 3800 },
  { day: 'Dom', sales: 4300 },
];

const mockOrders: RecentOrder[] = [
  { id: 'ORD-001', customer: 'Juan Pérez', total: 159.99, status: 'pendiente', date: '2024-01-15' },
  { id: 'ORD-002', customer: 'María García', total: 89.50, status: 'procesado', date: '2024-01-15' },
  { id: 'ORD-003', customer: 'Carlos López', total: 245.00, status: 'enviado', date: '2024-01-14' },
  { id: 'ORD-004', customer: 'Ana Martínez', total: 67.25, status: 'entregado', date: '2024-01-14' },
  { id: 'ORD-005', customer: 'Pedro Sánchez', total: 189.99, status: 'pendiente', date: '2024-01-13' },
];

function StatCard({ stat, index }: { stat: StatCard; index: number }) {
  const Icon = stat.icon;
  const isPositive = stat.change >= 0;

  return (
    <div
      className="card-stat animate-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
          <p className="text-3xl font-bold mt-1">{stat.value}</p>
        </div>
        <div className={`p-3 rounded-xl bg-gray-100 dark:bg-gray-800 ${stat.color}`}>
          <Icon size={24} />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1">
        {isPositive ? (
          <TrendingUp className="text-green-500" size={16} />
        ) : (
          <TrendingDown className="text-red-500" size={16} />
        )}
        <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
          {Math.abs(stat.change)}%
        </span>
        <span className="text-gray-400 text-sm">vs mes anterior</span>
      </div>
    </div>
  );
}

function getStatusBadge(status: string) {
  const statusMap: Record<string, string> = {
    pendiente: 'badge-warning',
    procesado: 'badge-info',
    enviado: 'badge-info',
    entregado: 'badge-success',
  };
  return statusMap[status] || 'badge-neutral';
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
      } catch (err) {
        setError('Error al cargar los datos del dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-red-500">{error}</p>
        <button onClick={() => window.location.reload()} className="btn-primary">
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Bienvenido de nuevo. Aquí está el resumen de tu tienda.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockStats.map((stat, index) => (
          <StatCard key={stat.label} stat={stat} index={index} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Ventas de la Semana</h2>
            <button className="text-primary-500 text-sm hover:text-primary-600 flex items-center gap-1">
              Ver más <ArrowRight size={16} />
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockSalesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="day" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorSales)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Pedidos Recientes</h2>
            <button className="text-primary-500 text-sm hover:text-primary-600 flex items-center gap-1">
              Ver todos <ArrowRight size={16} />
            </button>
          </div>
          <div className="space-y-4">
            {mockOrders.slice(0, 4).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0"
              >
                <div>
                  <p className="font-medium text-sm">{order.customer}</p>
                  <p className="text-xs text-gray-500">{order.id}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${order.total.toFixed(2)}</p>
                  <span className={getStatusBadge(order.status)}>{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-semibold">Últimos Pedidos</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="table-admin">
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order) => (
                <tr key={order.id}>
                  <td className="font-medium">{order.id}</td>
                  <td>{order.customer}</td>
                  <td className="text-gray-500">{order.date}</td>
                  <td className="font-semibold">${order.total.toFixed(2)}</td>
                  <td>
                    <span className={getStatusBadge(order.status)}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button className="text-primary-500 hover:text-primary-600 text-sm font-medium">
                      Ver detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}