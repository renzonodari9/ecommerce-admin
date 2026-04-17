# 🚀 E-commerce Admin Dashboard

Panel de administración profesional para gestionar tiendas e-commerce. Dashboard completo con estadísticas, gráficos y gestión de productos.

## 📌 Descripción
Panel administrativo que permite gestionar productos, categorías, pedidos y visualizar estadísticas de la tienda. Diseñado para administradores de e-commerce con una interfaz moderna e intuitiva.

## 🛠️ Tecnologías
- React 18
- TypeScript
- Tailwind CSS
- React Router v6
- Lucide React
- Recharts
- Vite

## ⚡ Features
- Dashboard con estadísticas y gráficos
- Gestión completa de productos (CRUD)
- Gestión de categorías
- Visualización y gestión de pedidos
- Cambio de estado de pedidos
- Sistema de autenticación
- Diseño responsive
- Tema oscuro

## 🌐 Demo
**https://admin-ecommerce-demo.netlify.app/**

## 🔐 Credenciales (Desarrollo)
- **Email**: admin@ecommerce.com
- **Contraseña**: Admin123!

## 📦 Instalación

```bash
# Clonar el repo
git clone https://github.com/renzonodari9/ecommerce-admin.git
cd ecommerce-admin

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

**Importante**: Requiere que el backend (ecommerce-api) esté corriendo en el puerto 3001.

## 📁 Estructura

```
src/
├── components/     # Componentes reutilizables
├── context/       # Contextos (Auth)
├── pages/         # Páginas principales
├── services/      # Servicios API
└── App.tsx        # Rutas y configuración
```

## 🌐 Variables de Entorno

```env
VITE_API_URL=http://localhost:3001
```

## 👨‍💻 Autor
**Renzo Nodari** - Desarrollador Full Stack
- GitHub: @renzonodari9
