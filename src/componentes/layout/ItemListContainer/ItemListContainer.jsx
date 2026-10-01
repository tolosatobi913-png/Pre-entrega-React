import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../layout.module.css'
import { obtenerProductos } from '../../../servicios/productos'

function ItemListContainer({ onAgregar }) {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    obtenerProductos()
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al cargar productos:', error))
  }, [])

  return (
    <div>
      <h2>Catálogo de productos</h2>
      <div className={styles.grid}>
        {productos.map((producto) => (
          <article key={producto.id} className={styles.card}>
            <img src={producto.image} alt={producto.title} className={styles.image} />
            <div className={styles.cardBody}>
              <h3>{producto.title}</h3>
              <p className={styles.price}>$ {producto.price.toLocaleString()}</p>
              <Link to={`/detalle/${producto.id}`}>Ver detalle</Link>
              <button type="button" onClick={() => onAgregar(producto)}>
                Agregar al carrito
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default ItemListContainer
