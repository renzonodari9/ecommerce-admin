import { useState, useEffect } from 'react';
import {
  Search,
  Eye,
  X,
  Loader2,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  email: string;
  total: number;
  status: 'pendiente' | 'procesado' | 'enviado' | 'entregado' | 'cancelado';
  items: OrderItem[];
  date: string;
  shippingAddress: string;
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    customer: 'Juan Pérez',
    email: 'juan@example.com',
    total: 159.99,
    status: 'pendiente',
    items: [
      { id: '1', name: 'iPhone 15 Pro Case', quantity: 2, price: 29.99 },
      { id: '2', name: 'AirPods Pro', quantity: 1, price: 249.99 },
    ],
    date: '2024-01-15',
    shippingAddress: 'Av. Principal 123, Ciudad de México'
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    customer: 'María García',
    email: 'maria@example.com',
    total: 89.50,
    status: 'procesado',
    items: [
      { id: '3', name: 'Samsung Galaxy Buds', quantity: 1, price: 89.50 },
    ],
    date: '2024-01-15',
    shippingAddress: 'Calle Secundaria 456, Guadalajara'
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    customer: 'Carlos López',
    email: 'carlos@example.com',
    total: 245.00,
    status: 'enviado',
    items: [
      { id: '4', name: 'MacBook Air M2', quantity: 1, price: 1199.99 },
      { id: '5', name: 'Mouse Magic', quantity: 1, price: 99.00 },
    ],
    date: '2024-01-14',
    shippingAddress: 'Blvd. Central 789, Monterrey'
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-004',
    customer: 'Ana Martínez',
    email: 'ana@example.com',
    total: 67.25,
    status: 'entregado',
    items: [
      { id: '6', name: 'iPad Screen Protector', quantity: 1, price: 39.00 },
      { id: '7', name: 'Charging Cable', quantity: 2, price: 14.125 },
    ],
    date: '2024-01-14',
    shippingAddress: 'Plaza Mayor 321, Puebla'
  },
  {
    id: '5',
    orderNumber: 'ORD-2024-005',
    customer: 'Pedro Sánchez',
    email: 'pedro@example.com',
    total: 189.99,
    status: 'pendiente',
    items: [
      { id: '8', name: 'Apple Watch Band', quantity: 1, price: 49.99 },
      { id: '9', name: 'MagSafe Charger', quantity: 1, price: 39.00 },
    ],
    date: '2024-01-13',
    shippingAddress: 'Avenida Norte 654, Tijuana'
  },
];

const ITEMS_PER_PAGE = 10;

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 600));
        setOrders(mockOrders);
      } catch (err) {
        setError('Error al cargar pedidos');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders
    .filter(order => {
      const matchesSearch = 
        order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
        order.customer.toLowerCase().includes(search.toLowerCase()) ||
        order.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'Todos' || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  const getStatusConfig = (status: string) => {
    const config: Record<string, { class: string; icon: React.ElementType; label: string }> = {
      pendiente: { class: 'badge-warning', icon: Clock, label: 'Pendiente' },
      procesado: { class: 'badge-info', icon: Package, label: 'Procesado' },
      enviado: { class: 'badge-info', icon: Truck, label: 'Enviado' },
      entregado: { class: 'badge-success', icon: CheckCircle, label: 'Entregado' },
      cancelado: { class: 'badge-danger', icon: XCircle, label: 'Cancelado' },
    };
    return config[status] || config.pendiente;
  };

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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Pedidos</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Gestiona los pedidos de tus clientes
          </p>
        </div>
        <div className="card px-4 py-2">
          <span className="text-2xl font-bold text-primary-600">{orders.length}</span>
          <span className="text-gray-500 ml-2">pedidos totales</span>
        </div>
      </div>

      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por número de pedido o cliente..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input sm:w-48"
          >
            <option value="Todos">Todos los estados</option>
            <option value="pendiente">Pendiente</option>
            <option value="procesado">Procesado</option>
            <option value="enviado">Enviado</option>
            <option value="entregado">Entregado</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="card p-12 flex flex-col items-center justify-center gap-4">
          <Package className="w-16 h-16 text-gray-300" />
          <h3 className="text-lg font-semibold">No se encontraron pedidos</h3>
          <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
        </div>
      ) : (
        <div className="space-y-4">
          {paginatedOrders.map((order, index) => {
            const statusConfig = getStatusConfig(order.status);
            const StatusIcon = statusConfig.icon;
            
            return (
              <div
                key={order.id}
                className="card p-4 md:p-6 animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="text-center min-w-[100px]">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Pedido</p>
                      <p className="font-mono font-bold">{order.orderNumber}</p>
                    </div>
                    <div className="h-12 w-px bg-gray-200 dark:bg-gray-700 hidden md:block" />
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{order.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className={`badge ${statusConfig.class}`}>
                      <StatusIcon size={14} className="mr-1" />
                      {statusConfig.label}
                    </span>
                    <p className="text-xl font-bold">${order.total.toFixed(2)}</p>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="btn-secondary btn-sm"
                    >
                      <Eye size={18} />
                      <span className="hidden sm:inline">Ver Detalle</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {totalPages > 1 && (
            <div className="card p-4 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Mostrando {(currentPage - 1) * ITEMS_PER_PAGE + 1} -{' '}
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredOrders.length)} de{' '}
                {filteredOrders.length} pedidos
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="btn-secondary btn-sm disabled:opacity-50"
                >
                  <ChevronLeft size={18} />
                  Anterior
                </button>
                <span className="px-3 text-sm text-gray-600 dark:text-gray-400">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="btn-secondary btn-sm disabled:opacity-50"
                >
                  Siguiente
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="p-6 border-b border-gray-200 dark:border-dark-border flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Detalle del Pedido</h2>
                <p className="text-gray-500 font-mono">{selectedOrder.orderNumber}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">Estado</p>
                  <span className={`badge ${getStatusConfig(selectedOrder.status).class}`}>
                    {getStatusConfig(selectedOrder.status).label}
                  </span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">Fecha</p>
                  <p className="font-medium">{selectedOrder.date}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">Total</p>
                  <p className="font-bold text-lg">${selectedOrder.total.toFixed(2)}</p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cliente</p>
                <p className="font-medium">{selectedOrder.customer}</p>
                <p className="text-gray-500">{selectedOrder.email}</p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Dirección de Envío</p>
                <p className="text-gray-600 dark:text-gray-400">{selectedOrder.shippingAddress}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Productos</p>
                <div className="space-y-3">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <Package className="text-gray-400" size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-dark-border pt-4">
                <div className="flex justify-between text-lg">
                  <span className="font-medium">Total</span>
                  <span className="font-bold text-primary-600">${selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ChevronLeft({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  );
}

function ChevronRight({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );
}