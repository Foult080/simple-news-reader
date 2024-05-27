import React from 'react'
import { Button, Container, Icon, Menu } from 'semantic-ui-react'
import logo from '../assets/images/logo64.png'
import { Link } from 'react-router-dom'
import { selectAuth, logOut } from '../reducers/austhSlice'
import { useDispatch, useSelector } from 'react-redux'

/**
 * Меню приложения. В зависимости от наличия авторизации будет отдавать разные элементы
 */
const MainBar = () => {
  const { isAuth, user } = useSelector(selectAuth)
  const dispatch = useDispatch()

  // разлогиниться
  const handleLogOut = () => {
    dispatch(logOut())
  }

  return (
    <Menu stackable>
      <Container>
        {isAuth ? (
          <>
            <Menu.Item as={Link} header to="/">
              <img src={logo} style={{ marginRight: '1.5em' }} />
              News Reader
            </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item as={Link} to="/my" position="right">
                <Icon bordered inverted color="teal" name="user" /> {user?.name}
              </Menu.Item>
              <Menu.Item position="right">
                <Button color="red" content="Выйти" onClick={handleLogOut} />
              </Menu.Item>
            </Menu.Menu>
          </>
        ) : (
          <>
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
          </>
        )}
      </Container>
    </Menu>
  )
}

export default MainBar
