import { useState, useEffect } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  FolderTree,
  Loader2,
  AlertCircle,
  Package
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
  image: string;
}

const mockCategories: Category[] = [
  { id: '1', name: 'Electronics', slug: 'electronics', description: '最新ガジェット tech gadgets and devices', productCount: 45, image: '/images/iPhone15ProMax.svg' },
  { id: '2', name: 'Audio', slug: 'audio', description: 'Headphones, speakers and audio equipment', productCount: 28, image: '/images/SonyWH1000XM5.svg' },
  { id: '3', name: 'Fashion', slug: 'fashion', description: 'Clothing, shoes and accessories', productCount: 89, image: '/images/NikeAirMax270.svg' },
  { id: '4', name: 'Gaming', slug: 'gaming', description: 'Video games and consoles', productCount: 34, image: '/images/PlayStation5.svg' },
  { id: '5', name: 'Home & Garden', slug: 'home', description: 'Furniture and home decor', productCount: 56, image: '/images/LGC3OLED55.svg' },
  { id: '6', name: 'Sports', slug: 'sports', description: 'Sports equipment and fitness', productCount: 23, image: '/images/NikeAirMax270.svg' },
];

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 600));
        setCategories(mockCategories);
      } catch (err) {
        setError('Error al cargar categorías');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (editingCategory) {
        setCategories(prev => prev.map(cat => 
          cat.id === editingCategory.id 
            ? { ...cat, name: formData.name, description: formData.description }
            : cat
        ));
      } else {
        const newCategory: Category = {
          id: Date.now().toString(),
          name: formData.name,
          slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
          description: formData.description,
          productCount: 0,
          image: formData.image,
        };
        setCategories(prev => [...prev, newCategory]);
      }

      setShowModal(false);
      setEditingCategory(null);
      setFormData({ name: '', description: '', image: '' });
    } catch (err) {
      setError('Error al guardar la categoría');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      image: category.image,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 300));
        setCategories(prev => prev.filter(cat => cat.id !== id));
      } catch (err) {
        setError('Error al eliminar la categoría');
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', image: '' });
    setEditingCategory(null);
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
          <h1 className="text-2xl font-bold">Categorías</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Gestiona las categorías de productos
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="btn-primary"
        >
          <Plus size={20} />
          Nueva Categoría
        </button>
      </div>

      {categories.length === 0 ? (
        <div className="card p-12 flex flex-col items-center justify-center gap-4">
          <FolderTree className="w-16 h-16 text-gray-300" />
          <h3 className="text-lg font-semibold">No hay categorías creadas</h3>
          <p className="text-gray-500">Crea tu primera categoría para organizar productos</p>
          <button onClick={() => setShowModal(true)} className="btn-primary">
            Crear primera categoría
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="card p-6 animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  {category.image ? (
                    <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/placeholder/400/400';
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FolderTree className="text-white" size={24} />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold">{category.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {category.productCount} productos
                    </p>
                  </div>
                </div>
              </div>

              {category.description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                  {category.description}
                </p>
              )}

              <div className="flex items-center gap-2 mt-6 pt-4 border-t border-gray-100 dark:border-dark-border">
                <button
                  onClick={() => handleEdit(category)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                >
                  <Edit size={16} />
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-surface rounded-2xl shadow-xl w-full max-w-md animate-scale-in">
            <div className="p-6 border-b border-gray-200 dark:border-dark-border">
              <h2 className="text-xl font-semibold">
                {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Descripción
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="input"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  URL de Imagen (opcional)
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="input"
                  placeholder="https://..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  {editingCategory ? 'Guardar Cambios' : 'Crear Categoría'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}