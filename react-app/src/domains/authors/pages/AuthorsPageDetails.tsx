import { useEffect } from 'react'
import { useParams } from '@tanstack/react-router'
import { Layout, Row, Col, Skeleton, Empty, Typography } from 'antd'
import { useAuthortDetailsProvider } from '../providers/useAuthorDetailsProvider'
import { AuthorDetailsCard } from '../components/AuthorDetailsCard'
import { useAuthorProvider } from '../providers/useAuthorProvider'
import { useAuthorBooksProvider } from '../providers/useAuthorBooksProvider'
import { AuthorStatisticsCard } from '../components/AuthorStatisticsCard'
import { AuthorBooksCardList } from '../components/AuthorBooksCardList'
import { useNavigate } from '@tanstack/react-router'

const { Content } = Layout
const { Title } = Typography

export function AuthorsDetailsPage() {
  const { authorId } = useParams({ from: '/authors/$authorId' })
  const { isLoading, author, loadAuthor } = useAuthortDetailsProvider(authorId)
  const { isLoadingBooks, authorBooks, loadAuthorBooks } =
    useAuthorBooksProvider(authorId)
  const { updateAuthor } = useAuthorProvider()
  const navigate = useNavigate()

  useEffect(() => {
    loadAuthor()
    loadAuthorBooks()
  }, [authorId])

  if (isLoading && isLoadingBooks) {
    return (
      <Content
        style={{ padding: 24, background: '#F7F8FA', minHeight: '100%' }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            paddingTop: 16,
          }}
        >
          <Skeleton active paragraph={{ rows: 8 }} />
        </div>
      </Content>
    )
  }

  if (!author) {
    return (
      <Content
        style={{ padding: 24, background: '#F7F8FA', minHeight: '100%' }}
      >
        <div
          style={{
            maxWidth: 720,
            margin: '0 auto',
            textAlign: 'center',
            paddingTop: 24,
          }}
        >
          <Title level={5} style={{ marginBottom: 8 }}>
            Author not found
          </Title>
          <Empty description="No data available for this author." />
        </div>
      </Content>
    )
  }

  return (
    <Content style={{ padding: 24, minHeight: '100%' }}>
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          paddingTop: 8,
        }}
      >
        <Row gutter={[24, 24]} align="stretch">
          <Col xs={24} md={10} lg={8}>
            <div
              style={{
                background: '#fff',
                borderRadius: 12,
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <AuthorDetailsCard info={author} onUpdate={updateAuthor} />
            </div>
          </Col>

          <Col xs={24} md={14} lg={16}>
            <div
              style={{
                background: '#fff',
                borderRadius: 12,
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              <AuthorStatisticsCard stats={author.stats} />
              <AuthorBooksCardList
                books={authorBooks ?? []}
                onViewDetails={id =>
                  navigate({ to: '/books/$bookId', params: { bookId: id } })
                }
              />
            </div>
          </Col>
        </Row>
      </div>
    </Content>
  )
}
