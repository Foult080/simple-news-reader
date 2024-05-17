import React from 'react'
import { Button, Container, Form } from 'semantic-ui-react'

/**
 * Компонент для создания и редактирования новостей
 */
const EditNews = () => {
  return (
    <Container>
      <Form>
        <Form.Group widths="equal">
          <Form.Input fluid label="Заголовок" placeholder="Наименование новости" />
          <Form.Input fluid label="Дата публикации" />
        </Form.Group>
        <label htmlFor="file" style={additionalStyles.inputFile}>
          Изображение для новости
        </label>
        <input type="file" id="file" />
        <Form.TextArea label="Краткое описание новости" placeholder="Укажите краткое описание для новости..." rows={3} />
        <Form.TextArea label="Содержимое новости" placeholder="Укажите содержимое новости..." rows={8} />
        <Form.Checkbox label="I agree to the Terms and Conditions" />
        <Form.Field>
          <input type="file" id="file" multiple />
        </Form.Field>
        <Button type="submit" content="Сохранить" color="green" icon="save" />
        <Button type="button" content="Отмена" color="red" icon="close" />
      </Form>
    </Container>
  )
}

// Дополнительные стили для страницы
const additionalStyles = {
  inputFile: {
    display: 'block',
    margin: '0 0 .28571429rem 0',
    color: 'rgba(0,0,0,.87)',
    fontSize: '.92857143em',
    fontWeight: 700
  }
}

export default EditNews
