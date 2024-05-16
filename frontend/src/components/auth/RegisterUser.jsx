import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import logo from '../../assets/images/logo64.png'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { cleanAlert, registerUser, selectAuth } from '../../reducers/austhSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import Loader from '../Loader'
import Alerts from '../Alerts'

const RegisterUser = () => {
  // редирект
  const location = useLocation()
  const auth = useSelector(selectAuth)
  const from = location.state?.from?.pathname || '/'

  // логика приложения
  const dispatch = useDispatch()
  const initialValues = { name: '', email: '', password: '' }

  const validate = (values) => {
    const errors = {}
    if (!values.name) errors.name = 'Укажите Имя пользователя'
    if (!values.email) errors.email = 'Укажите Email пользователя'
    if (!values.password) errors.password = 'Укажите пароль пользователя'
    return errors
  }

  // подхватываем формик
  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validateOnBlur: false,
    validate,
    onSubmit: (values) => {
      dispatch(registerUser(values))
    }
  })

  if (auth.isAuth) return <Navigate to={from} replace />

  return (
    <Grid textAlign="center" style={{ minHeight: '80vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        {auth.loading ? (
          <Loader size="large" msg="Авторизация..." />
        ) : (
          <div>
            <Header as="h2" color="teal" textAlign="center">
              <Image src={logo} /> Регистрация
            </Header>
            {auth.alert && <Alerts alert={auth.alert} icon="user circle" onDismiss={cleanAlert} />}
            <Form size="large" onSubmit={formik.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Имя пользователя"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  error={formik.errors.name ? { content: formik.errors.name, pointing: 'below' } : null}
                />
                <Form.Input
                  fluid
                  icon="mail"
                  iconPosition="left"
                  placeholder="E-mail адрес"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  error={formik.errors.email ? { content: formik.errors.email, pointing: 'below' } : null}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  error={formik.errors.password ? { content: formik.errors.password, pointing: 'below' } : null}
                />
                <Button color="teal" fluid size="large">
                  Зарегистрироваться
                </Button>
              </Segment>
            </Form>
            <Message>
              Уже есть аккаунт? <Link to="/sign-in">Войти</Link>
            </Message>
          </div>
        )}
      </Grid.Column>
    </Grid>
  )
}

export default RegisterUser
