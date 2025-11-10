import { useEffect } from 'react'
import { useParams } from '@tanstack/react-router'
import { Skeleton, Empty, Typography } from 'antd'
import { useClientDetailsProvider } from '../providers/useClientDetailsProvider'
import { ClientDetailsCard } from '../components/ClientDetailsCard'

const { Title } = Typography

export function ClientDetailsPage() {
  const { clientId } = useParams({ from: '/clients/$clientId' })
  const { isLoading, client, loadClient } = useClientDetailsProvider(clientId)

  useEffect(() => {
    loadClient()
  }, [clientId])

  if (isLoading) {
    return (
      <div style={{ padding: '2rem' }}>
        <Skeleton active paragraph={{ rows: 6 }} />
      </div>
    )
  }

  if (!client) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <Title level={5}>Client not found</Title>
        <Empty description="No data available for this client." />
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <ClientDetailsCard
        info={client}
        onEdit={() => console.log('Edit client')}
      />
    </div>
  )
}
