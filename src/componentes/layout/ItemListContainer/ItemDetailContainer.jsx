import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from '../layout.module.css'
import { obtenerProductos } from '../../../servicios/productos'

function ItemDetailContainer() {
  const { id } = useParams()
  const [producto, setProducto] = useState(null)

  useEffect(() => {
    obtenerProductos()
      .then((data) => {
        const item = data.find((p) => p.id === Number(id))
        setProducto(item)
      })
      .catch((error) => console.error('Error al cargar producto:', error))
  }, [id])

  if (!producto) {
    return <p>Cargando producto...</p>
  }

  return (
    <div className={styles.detail}>
      <img src={producto.image} alt={producto.title} className={styles.detailImage} />
      <h2 className={styles.title}>{producto.title}</h2>
      <p>{producto.description}</p>
      <p className={styles.price}>$ {producto.price.toLocaleString()}</p>
      <Link to='/productos' className={styles.backLink}>Volver al catálogo</Link>
    </div>
  )
}

export default ItemDetailContainer
