import { Button, Stack } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { useProducts } from '../hooks/useProducts'
import { CartItemProps } from '../types/types'
import { formatCurrency } from '../utilities/formatCurrency'

export const CartItem: React.FC<CartItemProps> = ({ id, quantity }) => {
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart()

  const { data } = useProducts()
  const item = data?.find((i) => i.id === id)
  if (item == null) return null

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img src={item.image} style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
      <div className="me-auto">
        <div className="text-muted" style={{ fontSize: '0.75rem' }}>
          {item.name}
        </div>
        <div className="text-muted" style={{ fontSize: '0.75rem' }}>
          {formatCurrency(item.price.full)}
        </div>
      </div>

      <div
        className="d-flex align-items-center justify-content-center me-auto"
        style={{ gap: '0.5rem', fontSize: '0.95rem' }}
      >
        <Button variant="outline-primary" size="sm" onClick={() => decreaseCartQuantity(id)}>
          -
        </Button>
        <div>
          <span style={{ fontSize: '1rem' }}>{quantity}</span>
        </div>
        <Button variant="outline-primary" size="sm" onClick={() => increaseCartQuantity(id)}>
          +
        </Button>
      </div>
      <div>{formatCurrency(item.price.full * quantity)}</div>
      <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)}>
        &times;
      </Button>
    </Stack>
  )
}
