import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Header, Icon } from 'semantic-ui-react'

/**
 * Заглушка для 404
 */
const NotFound = () => {
  return (
    <Container>
      <div style={{ justifyContent: 'center', textAlign: 'center', alignItems: 'center', marginTop: '2rem' }}>
        <Icon size="massive" name="newspaper" color="teal" />
        <Header as="h2" textAlign="center" content="По вашему запросу ничего не найдено" style={{ marginTop: '1rem' }} />
        <Link to="/">
          <Button color="teal" content="Назад на главную" size="medium" />
        </Link>
      </div>
    </Container>
  )
}

export default NotFound
