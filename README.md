# E-Commerce Admin Pro

Panel de administración profesional para e-commerce construido con React, TypeScript y Tailwind CSS. Una aplicación SaaS moderna y completa lista para producción.

![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-cyan)
![Vite](https://img.shields.io/badge/Vite-5.4-purple)

## Características

- **Dashboard** - Métricas en tiempo real con gráficos interactivos
- **Gestión de Productos** - CRUD completo con búsqueda y filtros avanzados
- **Gestión de Pedidos** - Seguimiento de estado y detalle de pedidos
- **Gestión de Categorías** - Organización de productos
- **Autenticación** - Login seguro con validación
- **Dark Mode** - Tema oscuro/claro con persistencia
- **Responsive** - Diseño adaptado a todos los dispositivos
- **Loading States** - Estados de carga y error

## Tech Stack

| Tecnología | Propósito |
|-----------|---------|
| React 18 | Framework UI |
| TypeScript | Tipado estático |
| Vite | Build tool |
| Tailwind CSS | Estilos |
| React Router v6 | Routing |
| Recharts | Gráficos |
| Lucide React | Iconos |

## Demo

```
Email: admin@ecommerce.com
Password: Admin123!
```

O simplemente usa el botón "Entrar como Demo" para acceso instantáneo.

## Instalación

```bash
# Clonar el repositorio
git clone <repo-url>
cd ecommerce-admin

# Instalar dependencias
npm install

# Iniciar desarrollo
npm run dev
```

## Scripts

| Script | Descripción |
|--------|------------|
| `npm run dev` | Iniciar servidor de desarrollo |
| `npm run build` | Build para producción |
| `npm run preview` | Preview del build |

## Estructura

```
src/
├── components/     # Componentes reutilizables
│   ├── Layout.tsx
│   └── Sidebar.tsx
├── context/       # Estado global
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
├── pages/         # Páginas principales
│   ├── Dashboard.tsx
│   ├── Products.tsx
│   ├── Orders.tsx
│   ├── Categories.tsx
│   └── Login.tsx
├── services/      # API y utilities
│   └── api.ts
├── App.tsx        # Router principal
├── main.tsx       # Entry point
└── index.css     # Estilos globales
```

## UI/UX

- Diseño limpio tipo SaaS
- Tipografía: Plus Jakarta Sans
- Colores: Palette profesional (Indigo primary)
- Animaciones suaves
- Cards con hover effects
- Skeleton loading
- Responsive breakpoints:

```
Mobile:  < 768px
Tablet:  768px - 1024px
Desktop: > 1024px
```

## Funcionalidades

### Autenticación
- Validación de credenciales
- Sesión persistent (localStorage)
- Protección de rutas

### Dashboard
- 4 stat cards con métricas
- Gráfico de ventas (AreaChart)
- Tabla de pedidos recientes

### Productos
- Grid responsive
- Búsqueda en tiempo real
- Filtros: categoría, estado
- Ordenación: nombre, precio, stock
- Paginación

### Pedidos
- Lista filtrable por estado
- Modal de detalle
- Actualización de estado

## Estado Global

```typescript
// Auth Context
const { user, login, logout } = useAuth();

// Theme Context
const { theme, toggleTheme } = useTheme();
```

## Validación

- Formularios con required
- Email validation
- Password min 6 chars

## API Simulation

Las APIs usan mock data con delays para simular red:

```typescript
await new Promise(resolve => setTimeout(resolve, 600));
```

## Production Ready

- Build optimizado
- Code splitting
- Error boundaries
- Type safety

## Deploy

Deploy en Vercel o Netlify con:

```bash
npm run build
# Publicar dist/
```

## Screenshots

| Página | Descripción |
|--------|------------|
| Login | Formulario con demo button |
| Dashboard | Stats + chart + orders |
| Products | Grid + filters |
| Orders | List + detail modal |
| Categories | Cards + CRUD modal |

## Contributing

1. Fork el repo
2. Crea feature branch
3. Commit cambios
4. Push to branch
5. Open PR

## License

MIT