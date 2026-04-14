# 🛒 E-commerce Admin Dashboard

Panel de administración profesional para gestionar tu tienda e-commerce.

## 🚀 Funcionalidades

- **Dashboard** - Estadísticas y resumen de la tienda
- **Productos** - CRUD completo de productos
- **Categorías** - Gestión de categorías
- **Pedidos** - Ver y gestionar pedidos con cambio de estado
- **Autenticación** - Login/logout seguro

## 🛠️ Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- React Router v6
- Lucide Icons
- Recharts (gráficos)

## 📦 Instalación

```bash
npm install
```

## 🚀 Ejecución

```bash
npm run dev
```

Abrir http://localhost:5174

## 🔐 Credenciales

- **Email**: admin@ecommerce.com
- **Contraseña**: Admin123!

## 🌐 API Backend

El admin se conecta a la API en http://localhost:3001

Asegurate de tener el backend corriendo antes de iniciar el admin.

## 📁 Estructura

```
src/
├── components/    # Componentes reutilizables
├── context/      # Contextos de React (Auth)
├── pages/        # Páginas principales
├── services/     # Servicios API
└── App.tsx       # Rutas y configuración
```

## 🚀 Deploy

Desplegar en Netlify:

1. Conectar repo de GitHub
2. Root directory: `ecommerce-admin`
3. Build command: `npm run build`
4. Publish directory: `dist`

Agregar variable de entorno:
- `VITE_API_URL` = URL del backend desplegado
