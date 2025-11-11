import { useEffect } from 'react'
import { useParams } from '@tanstack/react-router'
import { Layout, Row, Col, Skeleton, Empty, Typography } from 'antd'
import { useClientDetailsProvider } from '../providers/useClientDetailsProvider'
import { ClientDetailsCard } from '../components/ClientDetailsCard'
import { useClientProvider } from '../providers/useClientProvider'
import { useClientBooksProvider } from '../providers/useClientBooksProvider'
import { ClientBooksTable } from '../components/ClientBooksTable'
import { useNavigate } from '@tanstack/react-router'

const { Content } = Layout
const { Title } = Typography

export function ClientDetailsPage() {
  const navigate = useNavigate()
  const { clientId } = useParams({ from: '/clients/$clientId' })
  const { isLoading, client, loadClient } = useClientDetailsProvider(clientId)
  const { isLoadingBooks, clientBooks, loadClientBooks } =
    useClientBooksProvider(clientId)
  const { updateClient } = useClientProvider()

  useEffect(() => {
    loadClient()
    loadClientBooks()
  }, [clientId])

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

  // Not found
  if (!client) {
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
            Client not found
          </Title>
          <Empty description="No data available for this client." />
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
                height: '100%', // ✅ fills parent height
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <ClientDetailsCard info={client} onUpdate={updateClient} />
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
              }}
            >
              <ClientBooksTable
                items={clientBooks}
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
