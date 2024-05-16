import React from 'react'
import PropTypes from 'prop-types'
import { Message } from 'semantic-ui-react'
import store from '../store'

/**
 * Компонент для всплывающих уведобмлений
 */
const Alerts = ({ icon, alert, onDismiss }) => {
  // Берем метод из стора как в App
  const handleClose = () => store.dispatch(onDismiss())

  // формируем элементы для отображения в алерте
  const { msg, color, errors } = alert
  const list = []
  errors.forEach((element) => list.push(element.msg))

  return <Message icon={icon} color={color} header={msg} list={list} onDismiss={handleClose} />
}

Alerts.propTypes = { alert: PropTypes.object, icon: PropTypes.string, onDismiss: PropTypes.func }

export default Alerts
