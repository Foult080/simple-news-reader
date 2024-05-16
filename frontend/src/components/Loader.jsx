import React from 'react'
import PropTypes from 'prop-types'
import { Header, Image } from 'semantic-ui-react'
import loader from '../assets/images/loader.svg'

const Loader = ({ size, msg = 'Загрузка...' }) => {
  return (
    <div className="loader">
      <Image src={loader} size={size} centered />
      <Header as="h2" color="teal" textAlign="center">
        {msg}
      </Header>
    </div>
  )
}

Loader.propTypes = { size: PropTypes.string, msg: PropTypes.string }

export default Loader
