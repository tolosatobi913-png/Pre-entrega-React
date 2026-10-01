import { NavLink, Outlet } from 'react-router-dom'
import styles from './layout.module.css'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/productos', label: 'Productos' },
  { to: '/carrito', label: 'Carrito' },
]

function Layout() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>Mi Tienda</div>
        <nav className={styles.nav}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <p>© 2026 Mi Tienda</p>
        <p>Dirección: Av. Los Locos Adams</p>
        <p>Contacto: contacto@productosmuybuenos.com</p>
      </footer>
    </div>
  )
}

export default Layout
