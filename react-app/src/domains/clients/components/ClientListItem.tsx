import type { ReactElement } from 'react'
import type { ClientModel } from '../ClientModel'
import { Card, Typography, Button, Avatar, Row } from 'antd'
import { DeleteOutlined, UserOutlined } from '@ant-design/icons'

const { Text, Title } = Typography

interface ClientListItemProps {
  client: ClientModel
}

export function ClientListItem({ client }: ClientListItemProps): ReactElement {
  const { firstName, lastName, email, pictureUrl } = client.client

  return (
    <Card
      hoverable
      style={{
        borderRadius: 14,
        boxShadow: '0 3px 8px rgba(0,0,0,0.06)',
        minWidth: 280,
        minHeight: 350,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      bodyStyle={{
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <Row
        justify="space-between"
        align="middle"
        style={{ width: '100%', marginBottom: 8 }}
      >
        <Avatar
          size={60}
          src={pictureUrl || undefined}
          icon={!pictureUrl ? <UserOutlined /> : undefined}
          style={{
            backgroundColor: pictureUrl ? 'transparent' : '#E6F4FF',
            color: '#1677FF',
            fontSize: 24,
          }}
        />
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          style={{ fontSize: 18 }}
        />
      </Row>
      <div style={{ textAlign: 'center' }}>
        <Title level={5} style={{ marginBottom: 4 }}>
          {`${firstName} ${lastName}`}
        </Title>
        {email && (
          <Text type="secondary" style={{ fontSize: 14 }}>
            {email}
          </Text>
        )}
      </div>
      <Button
        block
        style={{
          marginTop: 8,
          borderRadius: 8,
          fontWeight: 500,
          height: 40,
        }}
      >
        View Details
      </Button>
    </Card>
  )
}
