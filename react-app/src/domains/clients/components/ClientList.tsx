import { useEffect } from 'react'
import { useClientProvider } from '../providers/useClientProvider'
import { Row, Col } from 'antd'
import { ClientListItem } from './ClientListItem'
import { CreateClientModal } from './CreateClientModal'

export function ClientList() {
  const { clients, loadClients, createClient, deleteClient } =
    useClientProvider()

  useEffect(() => {
    loadClients()
  }, [])

  return (
    <>
      <CreateClientModal onCreate={createClient} />
      <div style={{ padding: '1rem 0 1rem' }}>
        <Row gutter={[100, 100]}>
          {clients.map(client => (
            <Col key={client.client.id} xs={24} sm={12} lg={8} xl={6}>
              <ClientListItem
                key={client.client.id}
                client={client}
                onDelete={deleteClient}
              />
            </Col>
          ))}
        </Row>
      </div>
    </>
  )
}
