import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Container, Form } from 'semantic-ui-react'
import { loadRecord, selectNews, updateNewsRecord } from '../reducers/NewsSlice'
import Loader from './Loader'
import { useFormik } from 'formik'

/**
 * Компонент для редактирования записи
 */
const EditRecord = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, record } = useSelector(selectNews)

  // загружаем запись по id из строки адреса
  useEffect(() => {
    dispatch(loadRecord(id))
  }, [])

  const initialValues = record

  const validate = (values) => {
    const errors = {}
    if (!values.title) errors.title = 'Укажите название новости'
    if (!values.releaseDate) errors.releaseDate = 'Укажите дату публикации новости'
    if (!values.description) errors.description = 'Укажите описание к новости'
    if (!values.content) errors.content = 'Укажите содержимое новости'
    return errors
  }
  // подхватываем формик
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
    validate,
    onSubmit: (values) => {
      // убираем обертку и в случае успеха переходим на главную страницу
      dispatch(updateNewsRecord({ id, values }))
        .unwrap()
        .then(() => {
          navigate('/my')
        })
    }
  })

  return (
    <Container>
      {loading ? (
        <Loader size="large" msg="Загружаю запись..." />
      ) : (
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Заголовок"
              placeholder="Наименование новости"
              required
              name="title"
              icon="tag"
              iconPosition="left"
              onChange={formik.handleChange}
              value={formik.values.title}
              error={formik.errors.title ? { content: formik.errors.title, pointing: 'below' } : null}
            />
            <Form.Input
              fluid
              label="Дата публикации"
              required
              name="realeaseDate"
              icon="calendar"
              iconPosition="left"
              onChange={formik.handleChange}
              value={formik.values.releaseDate}
              error={formik.errors.releaseDate ? { content: formik.errors.releaseDate, pointing: 'below' } : null}
            />
          </Form.Group>
          <Form.TextArea
            label="Краткое описание новости"
            placeholder="Укажите краткое описание для новости..."
            rows={3}
            required
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            error={formik.errors.description ? { content: formik.errors.description, pointing: 'below' } : null}
          />
          <Form.TextArea
            label="Содержимое новости"
            placeholder="Укажите содержимое новости..."
            rows={8}
            name="content"
            onChange={formik.handleChange}
            value={formik.values.content}
            error={formik.errors.content ? { content: formik.errors.content, pointing: 'below' } : null}
          />
          <Button type="submit" content="Сохранить" color="green" icon="save" onClick={formik.handleSubmit} />
          <Button type="button" content="Отмена" color="red" icon="close" onClick={formik.resetForm} />
        </Form>
      )}
    </Container>
  )
}

export default EditRecord
