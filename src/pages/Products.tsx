import { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  Package,
  X
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  status: 'active' | 'inactive' | 'outofstock';
  image: string;
  createdAt: string;
}

const mockProducts: Product[] = [
  { id: '1', name: 'iPhone 15 Pro Max', description: 'Smartphone flagship de Apple', price: 1199.99, stock: 45, category: 'Electronics', status: 'active', image: '/images/iPhone15ProMax.svg', createdAt: '2024-01-10' },
  { id: '2', name: 'Samsung Galaxy S24 Ultra', description: 'Smartphone Android premium', price: 1099.99, stock: 32, category: 'Electronics', status: 'active', image: '/images/SamsungGalaxyS24Ultra.svg', createdAt: '2024-01-09' },
  { id: '3', name: 'MacBook Pro 16"', description: 'Laptop profesional', price: 2499.99, stock: 15, category: 'Electronics', status: 'active', image: '/images/MacBookPro16.svg', createdAt: '2024-01-08' },
  { id: '4', name: 'Sony WH-1000XM5', description: 'Auriculares premium', price: 399.99, stock: 0, category: 'Audio', status: 'outofstock', image: '/images/SonyWH1000XM5.svg', createdAt: '2024-01-07' },
  { id: '5', name: 'Nike Air Max 270', description: 'Zapatillas deportivas', price: 149.99, stock: 78, category: 'Fashion', status: 'active', image: '/images/NikeAirMax270.svg', createdAt: '2024-01-06' },
  { id: '6', name: 'Adidas Ultraboost', description: 'Zapatillas running', price: 179.99, stock: 56, category: 'Fashion', status: 'active', image: '/images/AdidasUltraboost.svg', createdAt: '2024-01-05' },
  { id: '7', name: 'iPad Pro 12.9"', description: 'Tablet profesional', price: 1099.99, stock: 23, category: 'Electronics', status: 'active', image: '/images/iPadPro129.svg', createdAt: '2024-01-04' },
  { id: '8', name: 'Apple Watch Ultra 2', description: 'Smartwatch premium', price: 799.99, stock: 41, category: 'Electronics', status: 'active', image: '/images/AppleWatchUltra2.svg', createdAt: '2024-01-03' },
  { id: '9', name: 'Bose QuietComfort', description: 'Auriculares noise cancelling', price: 329.99, stock: 67, category: 'Audio', status: 'active', image: '/images/BoseQuietComfort.svg', createdAt: '2024-01-02' },
  { id: '10', name: 'LG C3 OLED 55"', description: 'Smart TV OLED', price: 1499.99, stock: 12, category: 'Electronics', status: 'active', image: '/images/LGC3OLED55.svg', createdAt: '2024-01-01' },
  { id: '11', name: 'PlayStation 5', description: 'Consola de videojuegos', price: 499.99, stock: 0, category: 'Gaming', status: 'outofstock', image: '/images/PlayStation5.svg', createdAt: '2023-12-30' },
  { id: '12', name: 'Xbox Series X', description: 'Consola de videojuegos', price: 499.99, stock: 28, category: 'Gaming', status: 'active', image: '/images/XboxSeriesX.svg', createdAt: '2023-12-29' },
];

const ITEMS_PER_PAGE = 8;

const categories = ['Todos', 'Electronics', 'Audio', 'Fashion', 'Gaming'];
const statuses = ['Todos', 'active', 'inactive', 'outofstock'];

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todos');
  const [status, setStatus] = useState('Todos');
  const [sort, setSort] = useState('name');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: 'Electronics',
    status: 'active' as const,
    image: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 600));
        setProducts(mockProducts);
      } catch (err) {
        setError('Error al cargar productos');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'Todos' || product.category === category;
      const matchesStatus = status === 'Todos' || product.status === status;
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      switch (sort) {
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        case 'stock':
          return b.stock - a.stock;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, status, sort]);

  const getStatusBadge = (status: string) => {
    const map: Record<string, string> = {
      active: 'badge-success',
      inactive: 'badge-neutral',
      outofstock: 'badge-danger',
    };
    return map[status] || 'badge-neutral';
  };

  const getStatusLabel = (status: string) => {
    const map: Record<string, string> = {
      active: 'Activo',
      inactive: 'Inactivo',
      outofstock: 'Agotado',
    };
    return map[status] || status;
  };

  const handleView = (product: Product) => {
    setViewingProduct(product);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category,
      status: product.status,
      image: product.image,
    });
    setShowModal(true);
  };

  const handleDelete = (product: Product) => {
    setDeletingProduct(product);
  };

  const confirmDelete = () => {
    if (deletingProduct) {
      setProducts(prev => prev.filter(p => p.id !== deletingProduct.id));
      setDeletingProduct(null);
    }
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      category: 'Electronics',
      status: 'active',
      image: '',
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      if (editingProduct) {
        setProducts(prev => prev.map(p =>
          p.id === editingProduct.id
            ? { ...p, ...formData, price: parseFloat(formData.price), stock: parseInt(formData.stock) }
            : p
        ));
      } else {
        const newProduct: Product = {
          id: Date.now().toString(),
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          category: formData.category,
          status: formData.status,
          image: formData.image || '/images/iPhone15ProMax.svg',
          createdAt: new Date().toISOString().split('T')[0],
        };
        setProducts(prev => [...prev, newProduct]);
      }
      setShowModal(false);
    } finally {
      setLoading(false);
    }
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
        <AlertCircle className="w-10 h-10 text-red-500" />
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
          <h1 className="text-2xl font-bold">Productos</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Gestiona el inventario de tu tienda
          </p>
        </div>
        <button className="btn-primary" onClick={handleCreate}>
          <Plus size={20} />
          Nuevo Producto
        </button>
      </div>

      <div className="card p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-10"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-secondary lg:hidden ${showFilters ? 'bg-primary-50 border-primary-500 text-primary-600' : ''}`}
          >
            <Filter size={20} />
            Filtros
          </button>

          <div className={`grid grid-cols-1 sm:grid-cols-3 lg:flex gap-4 ${showFilters ? 'grid' : 'hidden lg:flex'}`}>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'Todos' ? 'Todas las categorías' : cat}</option>
              ))}
            </select>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="input"
            >
              {statuses.map(s => (
                <option key={s} value={s}>{s === 'Todos' ? 'Todos los estados' : getStatusLabel(s)}</option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="input"
            >
              <option value="name">Ordenar por nombre</option>
              <option value="price_asc">Precio: menor a mayor</option>
              <option value="price_desc">Precio: mayor a menor</option>
              <option value="stock">Stock disponible</option>
            </select>
          </div>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="card p-12 flex flex-col items-center justify-center gap-4">
          <Package className="w-16 h-16 text-gray-300" />
          <h3 className="text-lg font-semibold">No se encontraron productos</h3>
          <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginatedProducts.map((product, index) => (
              <div
                key={product.id}
                className="card p-4 animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg mb-4 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold line-clamp-1">{product.name}</h3>
                    <span className={getStatusBadge(product.status)}>
                      {getStatusLabel(product.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <p className="text-lg font-bold text-primary-600">${product.price}</p>
                      <p className="text-xs text-gray-500">{product.stock} unidades</p>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleView(product)}
                        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="card p-4 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Mostrando {(currentPage - 1) * ITEMS_PER_PAGE + 1} -{' '}
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} de{' '}
                {filteredProducts.length} productos
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
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-primary-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
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
        </>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl w-full max-w-2xl animate-scale-in">
            <div className="p-6 border-b border-gray-200 dark:border-dark-border flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Precio</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stock</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="input"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Categoría</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="input"
                  >
                    {categories.filter(c => c !== 'Todos').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Estado</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' | 'outofstock' })}
                    className="input"
                  >
                    {statuses.filter(s => s !== 'Todos').map(s => (
                      <option key={s} value={s}>{getStatusLabel(s)}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL de Imagen</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="input"
                  placeholder="/images/iPhone15ProMax.svg"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  {editingProduct ? 'Guardar Cambios' : 'Crear Producto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewingProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl w-full max-w-2xl animate-scale-in">
            <div className="p-6 border-b border-gray-200 dark:border-dark-border flex items-center justify-between">
              <h2 className="text-xl font-semibold">Detalle del Producto</h2>
              <button
                onClick={() => setViewingProduct(null)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="aspect-square w-full max-w-[300px] mx-auto rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={viewingProduct.image}
                  alt={viewingProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Nombre</p>
                  <p className="font-medium">{viewingProduct.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Estado</p>
                  <span className={getStatusBadge(viewingProduct.status)}>
                    {getStatusLabel(viewingProduct.status)}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Precio</p>
                  <p className="font-bold text-lg text-primary-600">${viewingProduct.price}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Stock</p>
                  <p className="font-medium">{viewingProduct.stock} unidades</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Categoría</p>
                  <p className="font-medium">{viewingProduct.category}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Fecha de creación</p>
                  <p className="font-medium">{viewingProduct.createdAt}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Descripción</p>
                <p className="text-gray-700 dark:text-gray-300">{viewingProduct.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {deletingProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl w-full max-w-md animate-scale-in">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="text-red-500" size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2">¿Eliminar producto?</h3>
              <p className="text-gray-500 mb-6">
                Estás a punto de eliminar <span className="font-medium">{deletingProduct.name}</span>. Esta acción no se puede deshacer.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setDeletingProduct(null)}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  className="btn-primary bg-red-500 hover:bg-red-600 border-red-500"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}