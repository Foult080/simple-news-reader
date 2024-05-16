import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Header, Icon } from 'semantic-ui-react'

/**
 * Заглушка для 401
 */
const Forbidden = () => {
  return (
    <Container>
      <div style={{ justifyContent: 'center', textAlign: 'center', alignItems: 'center', marginTop: '2rem' }}>
        <Icon size="massive" name="close" color="red" />
        <Header as="h2" textAlign="center" content="Действие запрещено" style={{ marginTop: '1rem' }} />
        <Link to="/">
          <Button color="teal" content="Назад на главную" size="medium" />
        </Link>
      </div>
    </Container>
  )
}

export default Forbidden
