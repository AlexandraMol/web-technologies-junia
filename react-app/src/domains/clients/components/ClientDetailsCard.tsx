import type { ReactElement } from 'react'
import { Card, Typography, Input, Button, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import type { ClientModel } from '../ClientModel'

const { Title, Text } = Typography

interface ClientDetailsCardProps {
  info: ClientModel
  onEdit?: () => void
}

export function ClientDetailsCard({
  info,
  onEdit,
}: ClientDetailsCardProps): ReactElement {
  return (
    <Card
      style={{
        borderRadius: 12,
        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
      }}
      bodyStyle={{
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <Title level={5} style={{ marginBottom: 4 }}>
        Personal Information
      </Title>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Avatar
          size={72}
          src={info.pictureUrl || undefined}
          icon={!info.pictureUrl ? <UserOutlined /> : undefined}
          style={{
            backgroundColor: info.pictureUrl ? 'transparent' : '#E6F4FF',
            color: '#1677FF',
            fontSize: 26,
          }}
        />
      </div>

      <div
        style={{
          display: 'grid',
          gap: 14,
          width: '100%',
          textAlign: 'left',
        }}
      >
        <div>
          <Text strong>First name:</Text>
          <Input value={info?.firstName} disabled placeholder="—" />
        </div>
        <div>
          <Text strong>Last name:</Text>
          <Input value={info?.lastName} disabled placeholder="—" />
        </div>
        <div>
          <Text strong>Email:</Text>
          <Input value={info.email ?? ''} disabled placeholder="—" />
        </div>
      </div>

      <Button
        block
        style={{
          marginTop: 18,
          height: 42,
          borderRadius: 8,
          background: '#0B0B1A',
          color: '#fff',
          borderColor: '#0B0B1A',
          fontWeight: 600,
        }}
        onClick={onEdit}
      >
        Edit Information
      </Button>
    </Card>
  )
}
