import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Header, Item, Pagination } from 'semantic-ui-react'
import { loadMyNews, selectNews } from '../reducers/NewsSlice'
import Loader from './Loader'
import { Link } from 'react-router-dom'
import { formatDateTime } from '../utils/utils'
import DeleteNews from './Modals'

/**
 * Компонент отрисовки элементов на странице
 */
const NewsFeed = ({ data, count, updateFunc }) => {
  // константа с размером страницы
  const pageSize = 5

  // пагинация
  const [currentPage, setCurentPage] = useState(1)
  const paginatedNews = useMemo(() => {
    const tableData = data
    const firstPageIndex = (currentPage - 1) * pageSize
    const lastPageIndex = firstPageIndex + pageSize
    return tableData.slice(firstPageIndex, lastPageIndex)
  }, [data, currentPage])

  // переключалка пагинации
  const handlePaginationChange = (e, { activePage }) => setCurentPage(activePage)

  // всего страниц
  const totalPages = Math.ceil(count / pageSize)

  return (
    <div className="items-list">
      <Item.Group>
        {paginatedNews.map((item) => (
          <Item key={item._id}>
            {item?.image ? (
              <Item.Image size="small" src={'/images/' + item.image.name} alt={item.image.name} />
            ) : (
              <Item.Image size="small" src="https://placehold.co/300x200?text=Нет изображения" alt="blank-image" />
            )}
            <Item.Content>
              <Item.Header as={Link} to={'/news/' + item._id}>
                {item.title}
              </Item.Header>
              <Item.Description>{item.description}</Item.Description>
              <Item.Meta>Дата создания: {formatDateTime(item.date)}</Item.Meta>
              <Item.Meta>Дата публикации: {formatDateTime(item.releaseDate)}</Item.Meta>
              <DeleteNews id={item._id} updateFunc={updateFunc} />
              <Button as={Link} to={'/edit-news/' + item._id} icon="pencil" color="yellow" />
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
      {count > 5 && (
        <div style={{ textAlign: 'center', marginTop: '2em' }}>
          <Pagination activePage={currentPage} onPageChange={handlePaginationChange} firstItem={null} lastItem={null} totalPages={totalPages} />
        </div>
      )}
    </div>
  )
}
NewsFeed.propTypes = { data: PropTypes.array, count: PropTypes.number, updateFunc: PropTypes.func }

/**
 * Компонент для страницы пользователя
 */
const MyPage = () => {
  const dispatch = useDispatch()
  const { loading, news, count } = useSelector(selectNews)

  useEffect(() => {
    dispatch(loadMyNews())
  }, [])

  const updateNews = () => dispatch(loadMyNews())

  return (
    <Container>
      <div className="header" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <Header as="h2" textAlign="left" content="Мои новости:" />
        <div>
          <Button color="green" as={Link} to="/create-news" content="Добавить" icon="plus" />
          <Button color="teal" content="Обновить" icon="refresh" onClick={updateNews} />
        </div>
      </div>
      {loading ? <Loader size="large" msg="Загрузка новостной ленты..." /> : <NewsFeed data={news} count={count} updateFunc={updateNews} />}
    </Container>
  )
}
export default MyPage
