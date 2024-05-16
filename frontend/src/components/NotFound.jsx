import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Header } from 'semantic-ui-react'

/**
 * Заглушка для 404
 */
const NotFound = () => {
  return (
    <Container>
      <div style={{ justifyContent: 'center', textAlign: 'center', alignItems: 'center' }}>
        <Header as="h2" textAlign="center" content="По вашему запросу ничего не найдено" style={{ marginTop: '1rem' }} />
        <Link to="/">
          <Button color="green" content="Назад на главную" size="large" />
        </Link>
      </div>
    </Container>
  )
}

export default NotFound
