import React from 'react'
import { useFormik } from 'formik'
import { Button, Container, Form } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import { addNewRecord } from '../reducers/NewsSlice'
import { useNavigate } from 'react-router-dom'

// TODO: Alert при сохранении записи

/**
 * Компонент для создания и редактирования новостей
 * Из-за сохранения и работы с файлами не будут переиспользовать этот компонент.
 */
const CreateRecord = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const initialValues = {
    title: '',
    releaseDate: new Date().toISOString(),
    description: '',
    content: ''
  }

  const validate = (values) => {
    const errors = {}
    if (!values.title) errors.title = 'Укажите название новости'
    if (!values.releaseDate) errors.releaseDate = 'Укажите дату публикации новости'
    if (!values.description) errors.description = 'Укажите описание к новости'
    if (!values.content) errors.content = 'Укажите содержимое новости'
    if (!values.image) errors.image = 'Укажите изображение для новсти'
    if (!values.files) errors.files = 'Добавьте файлы для загрузки'
    return errors
  }
  // подхватываем формик
  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validateOnBlur: false,
    validate,
    onSubmit: (values) => {
      // убираем обертку и в случае успеха переходим на главную страницу
      dispatch(addNewRecord(values))
        .unwrap()
        .then(() => {
          navigate('/my')
        })
    }
  })

  return (
    <Container>
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

        <Form.Input
          type="file"
          label="Изображение для новости"
          required
          icon="upload"
          iconPosition="left"
          id="image"
          name="image"
          onChange={(event) => formik.setFieldValue('image', event.currentTarget.files[0])}
          error={formik.errors.image ? { content: formik.errors.image, pointing: 'below' } : null}
        />
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
        <Form.Input
          type="file"
          label="Файлы для новости"
          multiple
          required
          icon="upload"
          iconPosition="left"
          id="files"
          name="files"
          onChange={(event) => formik.setFieldValue('files', event.currentTarget.files)}
          error={formik.errors.files ? { content: formik.errors.files, pointing: 'below' } : null}
        />
        <Button type="submit" content="Сохранить" color="green" icon="save" onClick={formik.handleSubmit} />
        <Button type="button" content="Отмена" color="red" icon="close" onClick={formik.resetForm} />
      </Form>
    </Container>
  )
}

export default CreateRecord
