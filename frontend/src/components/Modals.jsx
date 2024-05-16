import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Header, Icon, Loader, Modal } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import { deleteRecord } from '../reducers/NewsSlice'

const DeleteNews = ({ id, updateFunc }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const closeProcess = () => {
    setLoading(true)
    dispatch(deleteRecord(id))
      .unwrap()
      .then(() => {
        setLoading(false)
        setOpen(false)
        dispatch(updateFunc())
      })
      .catch(() => {
        setLoading(false)
        setOpen(false)
      })
  }

  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
      trigger={<Button icon="trash" color="red" content="Удалить" />}
    >
      {loading ? (
        <Loader active size="big" content="Удаление записи" />
      ) : (
        <>
          <Header icon>
            <Icon name="trash" />
            Удалить запись?
          </Header>
          <Modal.Actions>
            <div style={{ textAlign: 'center' }}>
              <Button color="green" onClick={closeProcess}>
                <Icon name="checkmark" /> Завершить
              </Button>
              <Button color="red" onClick={() => setOpen(false)}>
                <Icon name="remove" /> Отмена
              </Button>
            </div>
          </Modal.Actions>
        </>
      )}
    </Modal>
  )
}

DeleteNews.propTypes = { id: PropTypes.string, updateFunc: PropTypes.func }

export default DeleteNews
