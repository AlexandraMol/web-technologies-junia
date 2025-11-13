import type { ReactElement } from 'react'
import type { BookModel, UpdateBookModel } from '../BookModel'
import { Card, Typography, Button, Modal } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useNavigate } from '@tanstack/react-router'

const { Text, Title } = Typography

interface BookListItemProps {
  book: BookModel
  numberOfClients: number
  onDelete: (id: string) => void
  onUpdate?: (id: string, input: UpdateBookModel) => void
}

export function BookListItem({
  book,
  numberOfClients,
  onDelete,
}: BookListItemProps): ReactElement {
  const navigate = useNavigate()
  const { id, title, yearPublished, pictureUrl, author } = book
  const [modal, contextHolder] = Modal.useModal()

  const goToDetails = (): void => {
    navigate({ to: '/books/$bookId', params: { bookId: id } })
  }

  const confirmDelete = (): void => {
    modal.confirm({
      title: 'Delete this book?',
      content: `Are you sure you want to delete "${title}"? This action cannot be undone.`,
      okText: 'Delete',
      cancelText: 'Cancel',
      okButtonProps: { danger: true },
      onOk: () => onDelete(id),
    })
  }

  const buyersLabel =
    numberOfClients === 1
      ? 'Bought by 1 person'
      : `Bought by ${numberOfClients} people`

  return (
    <>
      {contextHolder}
      <Card
        hoverable
        onClick={goToDetails}
        style={{
          borderRadius: 14,
          boxShadow: '0 3px 8px rgba(0,0,0,0.06)',
          minWidth: 260,
          minHeight: 360,
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
        {/* COVER + DELETE */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 8,
          }}
        >
          <img
            src={pictureUrl}
            alt={title}
            style={{
              width: '70%',
              height: 140,
              objectFit: 'cover',
              borderRadius: 10,
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
        </div>

        {/* TITLE + AUTHOR */}
        <div style={{ textAlign: 'center' }}>
          <Title level={5} style={{ marginBottom: 4 }}>
            {title}
          </Title>
          <Text type="secondary" style={{ display: 'block', fontSize: 14 }}>
            {author.firstName} {author.lastName}
          </Text>
        </div>

        {/* YEAR + BUYERS */}
        <Text type="secondary" style={{ fontSize: 13 }}>
          Published in <b>{yearPublished}</b>
        </Text>
        <Text type="secondary" style={{ fontSize: 13 }}>
          {buyersLabel}
        </Text>

        {/* VIEW DETAILS BUTTON */}
        <Button
          block
          style={{
            marginTop: 8,
            borderRadius: 8,
            fontWeight: 500,
            height: 40,
          }}
          onClick={e => {
            e.stopPropagation()
            goToDetails()
          }}
        >
          View Details
        </Button>
      </Card>
    </>
  )
}
