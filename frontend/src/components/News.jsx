import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Header, Icon, Item, List } from 'semantic-ui-react'
import { loadRecord, selectNews } from '../reducers/NewsSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import { formatDateTime } from '../utils/utils'
import Markdown from 'react-markdown'

/**
 * Компонент для просмотра выбранной новости
 */
const News = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { loading, record } = useSelector(selectNews)

  const { title, content, image, user: creator, files, releaseDate } = record

  useEffect(() => {
    dispatch(loadRecord(id))
  }, [])

  return (
    <Container>
      {loading ? (
        <Loader size="large" msg="Загружаю запись..." />
      ) : (
        <>
          <Item.Group>
            <Item>
              {image ? (
                <Item.Image size="medium" src={'/images/' + image.name} alt={image.name} />
              ) : (
                <Item.Image size="medium" src="https://placehold.co/300x200?text=Нет изображения" alt="blank-image" />
              )}
              <Item.Content>
                <Item.Header>{title}</Item.Header>
                <Item.Extra>Статью написал: {creator?.name}</Item.Extra>
                <Item.Meta>Дата публикации: {formatDateTime(releaseDate)}</Item.Meta>
                <Item.Description>
                  <Markdown>{content}</Markdown>
                </Item.Description>
                <List>
                  <Header as="h2" textAlign="left" content="Загружаемые файлы" style={{ marginTop: '2rem' }} />
                  {files.map((file) => (
                    <List.Item key={file._id}>
                      <a href={'/files/' + file.name} download>
                        <Icon size="small" name="file" /> {file.name}
                      </a>
                    </List.Item>
                  ))}
                </List>
              </Item.Content>
            </Item>
          </Item.Group>
        </>
      )}
    </Container>
  )
}

export default News
