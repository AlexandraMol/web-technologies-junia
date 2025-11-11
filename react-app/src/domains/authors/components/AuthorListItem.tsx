import type { ReactElement } from 'react'
import type { AuthorModel } from '../AuthorModel'
import { Card, Typography, Button, Avatar, Row, Modal } from 'antd'
import { DeleteOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from '@tanstack/react-router'

const { Text, Title } = Typography

interface AuthorListItemProps {
  author: AuthorModel
  onDelete: (id: string) => void
}

export function AuthorListItem({
  author,
  onDelete,
}: AuthorListItemProps): ReactElement {
  const navigate = useNavigate()
  const { id, firstName, lastName, pictureUrl } = author.author
  const { numberOfBooks } = author
  const [modal, contextHolder] = Modal.useModal()

  const goToDetails = (): void => {
    navigate({ to: '/authors/$authorId', params: { authorId: id } })
  }

  const confirmDelete = (): void => {
    modal.confirm({
      title: 'Delete this author?',
      content: `Are you sure you want to delete "${firstName} ${lastName}"? This action cannot be undone.`,
      okText: 'Delete',
      cancelText: 'Cancel',
      okButtonProps: { danger: true },
      onOk: () => onDelete(id),
    })
  }

  return (
    <>
      {contextHolder}
      <Card
        onClick={goToDetails}
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
            onClick={e => {
              e.stopPropagation()
              confirmDelete()
            }}
          />
        </Row>
        <div style={{ textAlign: 'center' }}>
          <Title level={5} style={{ marginBottom: 4 }}>
            {`${firstName} ${lastName}`}
          </Title>
        </div>
        <Text
          type="secondary"
          style={{ display: 'block', fontSize: 14, height: 40 }}
        >
          Number of books written: <b>{numberOfBooks}</b>
        </Text>

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
    </>
  )
}
