import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Header, Item, Pagination } from 'semantic-ui-react'
import { selectNews, loadNews } from '../reducers/NewsSlice'
import Loader from './Loader'
import { formatDateTime } from '../utils/utils'

/**
 * Новостная лента
 */
const NewsFeed = ({ news, count }) => {
  /* <Image  wrapped ui={false} /> */

  // константа с размером страницы
  const pageSize = 15

  // пагинация
  const [currentPage, setCurentPage] = useState(1)
  const data = useMemo(() => {
    const tableData = news
    const firstPageIndex = (currentPage - 1) * pageSize
    const lastPageIndex = firstPageIndex + pageSize
    return tableData.slice(firstPageIndex, lastPageIndex)
  }, [news, currentPage])

  // переключалка
  const handlePaginationChange = (e, { activePage }) => setCurentPage(activePage)

  // всего страниц
  const totalPages = Math.ceil(count / pageSize)

  console.log(data)
  return (
    <div className="items-list">
      <Item.Group>
        {news.map((item) => (
          <Item key={item._id}>
            {item?.image ? (
              <Item.Image size="small" src={'/images/' + item.image.name} alt={item.image.name} />
            ) : (
              <Item.Image size="small" src="https://placehold.co/300x200?text=Нет изображения" alt="blank-image" />
            )}
            <Item.Content>
              <Item.Header as="a">{item.title}</Item.Header>
              <Item.Meta>Дата публикации: {formatDateTime(item.releaseDate)}</Item.Meta>
              <Item.Description>{item.description}</Item.Description>
              <Item.Extra>Статью написал: {item.user.name}</Item.Extra>
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
NewsFeed.propTypes = { news: PropTypes.array, count: PropTypes.number }

/**
 * Основной компонент приложения
 */
const MainPage = () => {
  const dispatch = useDispatch()
  const { loading, news, count } = useSelector(selectNews)

  useEffect(() => {
    dispatch(loadNews())
  }, [])

  const updateNews = () => dispatch(loadNews())
  console.log(news)

  return (
    <Container>
      <div className="header" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <Header as="h2" textAlign="left" content="Новости за сегодня:" />
        <div>
          <Button color="teal" icon="refresh" onClick={updateNews} />
        </div>
      </div>
      {loading ? (
        <Loader msg="Загрузка новостной ленты" size="large" />
      ) : (
        <div className="news-feed">
          <NewsFeed count={count} news={news} />{' '}
        </div>
      )}
    </Container>
  )
}
export default MainPage
