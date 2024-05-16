import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'
import logo from '../assets/images/logo64.png'
import { Link } from 'react-router-dom'

const MainBar = () => {
  return (
    <Menu stackable>
      <Container>
        <Menu.Item as={Link} header to="/">
          <img src={logo} style={{ marginRight: '1.5em' }} />
          News Reader
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item position="right">
            <Link to="/sign-in">
              <Button color="teal" content="Войти" />
            </Link>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  )
}

export default MainBar
