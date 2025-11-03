import { useEffect } from 'react'
import { useClientProvider } from '../providers/useClientProvider'
import { Row, Col } from 'antd'
import { ClientListItem } from './ClientListItem'

export function ClientList() {
  const { clients, loadClients } = useClientProvider()

  useEffect(() => {
    loadClients()
  }, [])

  return (
    <div style={{ padding: '0 1rem' }}>
      <Row gutter={[100, 100]}>
        {clients.map(client => (
          <Col key={client.client.id} xs={24} sm={12} lg={8} xl={6}>
            <ClientListItem client={client} />
          </Col>
        ))}
      </Row>
    </div>
  )
}
