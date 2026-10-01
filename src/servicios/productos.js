const PRODUCTOS_URL = '/data/productos.json'

export async function obtenerProductos() {
  const response = await fetch(PRODUCTOS_URL)

  if (!response.ok) {
    throw new Error(`Error al cargar productos: ${response.status}`)
  }

  const productos = await response.json()

  return productos.map((producto) => ({
    id: producto.id,
    title: producto.nombre,
    price: producto.precio,
    description: producto.descripcion,
    image: producto.imagen,
  }))
}
