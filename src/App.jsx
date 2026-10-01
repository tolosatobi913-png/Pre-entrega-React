import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './componentes/layout/layout'
import ItemListContainer from './componentes/layout/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './componentes/layout/ItemListContainer/ItemDetailContainer'
import styles from './componentes/layout/layout.module.css'

const Home = () => <h2>Página de Inicio</h2>

function Carrito({ productos, onQuitar }) {
  if (productos.length === 0) {
    return <h2>Tu carrito está vacío</h2>
  }

  return (
    <div>
      <h2>Carrito de compras</h2>
      {productos.map(({ producto, cantidad }) => (
        <article key={producto.id} className={styles.cartItem}>
          <img src={producto.image} alt={producto.title} className={styles.cartImage} />
          <div>
            <h3>{producto.title}</h3>
            <p>Cantidad: {cantidad}</p>
            <p className={styles.price}>
              Subtotal: $ {(producto.price * cantidad).toLocaleString()}
            </p>
          </div>
          <button type="button" onClick={() => onQuitar(producto.id)}>
            Quitar
          </button>
        </article>
      ))}
      <p className={styles.price}>
        Total: $ {productos.reduce((total, item) => total + item.producto.price * item.cantidad, 0).toLocaleString()}
      </p>
    </div>
  )
}

function App() {
  const [carrito, setCarrito] = useState([])

  function agregarAlCarrito(producto) {
    setCarrito((actual) => {
      const existente = actual.find((item) => item.producto.id === producto.id)

      if (existente) {
        return actual.map((item) =>
          item.producto.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item,
        )
      }

      return [...actual, { producto, cantidad: 1 }]
    })
  }

  function quitarDelCarrito(id) {
    setCarrito((actual) => actual.filter((item) => item.producto.id !== id))
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ItemListContainer onAgregar={agregarAlCarrito} />} />
          <Route path="/detalle/:id" element={<ItemDetailContainer />} />
          <Route path="/carrito" element={<Carrito productos={carrito} onQuitar={quitarDelCarrito} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;