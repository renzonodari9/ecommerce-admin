# E-Commerce Admin Dashboard - Specification

## 1. Project Overview

**Project Name:** E-Commerce Admin Pro
**Type:** Web Application (SPA - Single Page Application)
**Core Functionality:** Panel de administración profesional para gestión de tienda e-commerce con métricas en tiempo real, gestão de productos, pedidos y clientes.
**Target Users:** Administradores de tiendas e-commerce, gerentes de ventas.

## 2. UI/UX Specification

### Layout Structure

- **Sidebar lateral** (280px fixed width, collapsible en móvil)
- **Header** (64px height) con búsqueda global, notificaciones y perfil de usuario
- **Main content** (fluid, con padding de 24px)
- **Breakpoints:**
  - Mobile: < 768px (sidebar hidden, hamburguer menu)
  - Tablet: 768px - 1024px (sidebar collapsed)
  - Desktop: > 1024px (sidebar visible)

### Visual Design

**Color Palette:**
```css
--primary: #6366f1 (Indigo-500)
--primary-dark: #818cf8
--primary-light: #a5b4fc
--secondary: #64748b (Slate-500)
--accent: #10b981 (Emerald-500)
--danger: #ef4444 (Red-500)
--warning: #f59e0b (Amber-500)
--background-light: #f8fafc
--background-dark: #0f172a
--surface-light: #ffffff
--surface-dark: #1e293b
--text-primary-light: #1e293b
--text-primary-dark: #f1f5f9
--text-secondary-light: #64748b
--text-secondary-dark: #94a3b8
--border-light: #e2e8f0
--border-dark: #334155
```

**Typography:**
- Font Family: "Plus Jakarta Sans" (headings), "Inter" (body)
- Headings: H1 (32px/700), H2 (24px/600), H3 (20px/600), H4 (16px/600)
- Body: Regular (14px/400), Small (12px/400)
- Line height: 1.5

**Spacing System:**
- Base: 4px
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, 2xl: 48px

**Visual Effects:**
- Border radius: 8px (cards), 6px (buttons), 12px (modals)
- Shadows:
  - sm: 0 1px 2px rgba(0,0,0,0.05)
  - md: 0 4px 6px rgba(0,0,0,0.1)
  - lg: 0 10px 15px rgba(0,0,0,0.1)
- Transitions: 200ms ease-in-out

### Components

1. **Sidebar**
   - Logo superior
   - Navegación con iconos + labels
   - Items activos con indicador visual
   - Footer con settings y logout
   - Hover: background change + slight scale

2. **Header**
   - Search bar (expandible)
   - Notificaciones (dropdown)
   - Perfil usuario (dropdown)
   - Dark mode toggle
   - Mobile: hamburguer menu

3. **Stat Cards**
   - Icono decorativo
   - Valor principal (grande)
   - Label y trend indicator
   - Mini gráfico
   - Hover: elevate + border glow

4. **Data Table**
   - Sortable columns
   - Pagination
   - Row actions (edit, delete, view)
   - Selection checkbox
   - Loading skeleton

5. **Forms**
   - Labels flotantes
   - Validation messages
   - Input states (error, success)
   - Helper text

6. **Buttons**
   - Primary, Secondary, Ghost, Danger
   - Sizes: sm, md, lg
   - Loading state con spinner
   -Disabled state

## 3. Functionality Specification

### Core Features

**1. Autenticación simulada**
- Login con email/password
- Validación de campos (email válido, password > 6 chars)
- Remember me checkbox
- Sesión persistida en localStorage
- Logout con limpieza de sesión

**2. Dashboard**
- Métricas principales:
  - Ventas totales (hoy/semana/mes)
  - Pedidos pendientes
  - Clientes nuevos
  - Productos en stock
- Gráfico de ventas (últimos 7 días)
- Recent orders table
- Quick actions

**3. Productos**
- Listado con paginación (12 por página)
- Búsqueda por nombre
- Filtros: categoría, estado, rango de precio
- Ordenar: nombre, precio, stock, fecha
- CRUD simulada
- Estados: activos, inactivos, agotados

**4. Pedidos**
- Listado de pedidos
- Estados: pendiente, procesado, enviado, entregado
- Detalle de pedido
- Actualización de estado

**5. Clientes**
- Listado de clientes
- Información de contacto
- Historial de pedidos

**6. Configuración**
- Perfil de usuario
- Preferencias (dark mode)
- Theme toggle persistence

### User Interactions

- Sidebar collapse/expand con animación
- Dropdowns con transición suave
- Modales con backdrop blur
- Toast notifications para acciones
- Loading states durante operaciones
- Error handling con retry

### Data Handling

- API simulate con setTimeout (500-1000ms)
- Mock data realistic
- pagination server-side simulation
- Estados: loading, success, error, empty

### Edge Cases

- Sin datos: mensaje informativo con ilustración
- Error de red: retry button + mensaje
- Sesión expirada: redirect a login
- Búsqueda sin resultados: mensaje + sugerencias

## 4. Acceptance Criteria

- [ ] Login valida campos y muestra errores apropiados
- [ ] Dashboard muestra 4 stat cards con datos dinámicos
- [ ] Gráfico de ventas renderiza correctamente
- [ ] Productos muestran paginación funcional
- [ ] Búsqueda filtra productos en tiempo real
- [ ] Filtros combinan correctamente
- [ ] Dark mode toggle funciona y persiste
- [ ] Sidebar es responsive (collapse en móvil)
- [ ] Todas las páginas tienen routing correcto
- [ ] Loading states visibles durante carga
- [ ] Error states handling implementado
- [ ] Animaciones suaves (no laggy)
- [ ] Build sin errores
- [ ] Lighthouse performance > 90

## 5. Technical Stack

- React 18 + Vite
- React Router v6
- Context API para estado global
- Tailwind CSS
- Lucide React (iconos)
- Recharts (gráficos)
- date-fns (fechas)
- Vercel ready