import { useEffect, useState } from 'react';
import api from '../services/api';
import { Search, Eye, XCircle } from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  total: string;
  subtotal: string;
  tax: string;
  shippingCost: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: string;
  items: Array<{
    id: string;
    quantity: number;
    price: string;
    product: {
      name: string;
      images: string[];
    };
  }>;
  user: {
    email: string;
    firstName: string;
    lastName: string;
  };
}

const statusOptions = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  PROCESSING: 'bg-blue-100 text-blue-700',
  SHIPPED: 'bg-purple-100 text-purple-700',
  DELIVERED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data: any = await api.getOrders('sortBy=createdAt&sortOrder=desc');
      setOrders(data.data || []);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await api.updateOrderStatus(orderId, newStatus);
      loadOrders();
      setSelectedOrder(null);
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Error al actualizar el estado');
    }
  };

  const handleCancel = async (orderId: string) => {
    if (confirm('¿Estás seguro de cancelar este pedido?')) {
      try {
        await api.cancelOrder(orderId);
        loadOrders();
        setSelectedOrder(null);
      } catch (error) {
        console.error('Error cancelling order:', error);
        alert('Error al cancelar el pedido');
      }
    }
  };

  const filteredOrders = orders.filter(
    (o) =>
      o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Pedidos</h1>
          <p className="text-gray-500 mt-1">Gestiona los pedidos de tus clientes</p>
        </div>
        <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
          <span className="text-2xl font-bold text-primary-600">{orders.length}</span>
          <span className="text-gray-500 ml-2">pedidos totales</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por número de pedido o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-admin pl-10"
          />
        </div>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-xl" />
          ))}
        </div>
      ) : filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Pedido</p>
                    <p className="font-mono font-bold text-gray-800">{order.orderNumber}</p>
                  </div>
                  <div className="h-12 w-px bg-gray-200 hidden md:block" />
                  <div>
                    <p className="text-sm text-gray-500">{order.user?.email}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString('es-AR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className={`badge ${statusColors[order.status] || 'badge-info'}`}>
                    {order.status}
                  </span>
                  <p className="text-xl font-bold text-gray-800">
                    ${Number(order.total).toFixed(2)}
                  </p>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <Eye size={18} />
                    Ver Detalle
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <p className="text-gray-500">No hay pedidos que coincidan con la búsqueda</p>
        </div>
      )}

      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Detalle del Pedido</h2>
                <p className="text-gray-500 font-mono">{selectedOrder.orderNumber}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XCircle size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">Estado</p>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                    className="input-admin text-sm"
                    disabled={selectedOrder.status === 'CANCELLED' || selectedOrder.status === 'DELIVERED'}
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">Fecha</p>
                  <p className="font-medium">
                    {new Date(selectedOrder.createdAt).toLocaleDateString('es-AR')}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">Subtotal</p>
                  <p className="font-medium">${Number(selectedOrder.subtotal).toFixed(2)}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">Total</p>
                  <p className="font-bold text-lg">${Number(selectedOrder.total).toFixed(2)}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Cliente</p>
                <p className="text-gray-800">
                  {selectedOrder.user?.firstName} {selectedOrder.user?.lastName}
                </p>
                <p className="text-gray-500">{selectedOrder.user?.email}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Dirección de Envío</p>
                <p className="text-gray-800">{selectedOrder.shippingAddress?.street}</p>
                <p className="text-gray-500">
                  {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state}{' '}
                  {selectedOrder.shippingAddress?.zipCode}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Productos</p>
                <div className="space-y-3">
                  {selectedOrder.items?.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 bg-gray-50 rounded-lg p-3">
                      <div className="w-12 h-12 bg-white rounded-lg overflow-hidden">
                        {item.product?.images?.[0] ? (
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{item.product?.name}</p>
                        <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">${Number(item.price).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {selectedOrder.status !== 'CANCELLED' && selectedOrder.status !== 'DELIVERED' && (
                <button
                  onClick={() => handleCancel(selectedOrder.id)}
                  className="btn-danger w-full"
                >
                  Cancelar Pedido
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
