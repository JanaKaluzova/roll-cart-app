import { Col, Container, Row } from 'react-bootstrap'
import { useProducts } from '../hooks/useProducts'
import { StoreProps } from '../types/types'
import { StoreItem } from './StoreItem'

export const Store: React.FC<StoreProps> = ({ searchText }) => {
  const { data, error } = useProducts()
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      <Container>
        <Row md={4} xs={2} lg={6} xl={9} className="g-2">
          {data
            .filter((item) => item.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))
            .map((item) => (
              <Col key={item.id}>
                {' '}
                <StoreItem {...item} />{' '}
              </Col>
            ))}
        </Row>
      </Container>
    </>
  )
}
