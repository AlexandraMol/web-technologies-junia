import type { ReactElement, ReactNode, CSSProperties } from 'react'
import { useEffect, useState } from 'react'
import { Row, Col, Card, Typography, Button, List, Input } from 'antd'
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons'
import { useNavigate } from '@tanstack/react-router'

import type { BookModel, UpdateBookModel } from '../BookModel'
import type { ClientModel } from '../../clients/ClientModel'
import { CreateSaleModal, type CreateSaleInput } from './CreateSaleModal'

const { Title, Text } = Typography

interface BookDetailsProps {
  book?: BookModel | null // can be undefined/null while loading
  numberOfClients: number
  clients: ClientModel[]
  buyers: ClientModel[]
  onCreateSale: (input: CreateSaleInput) => void
  onUpdate: (id: string, input: UpdateBookModel) => void
}

const backButtonStyle: CSSProperties = {
  marginBottom: 24,
  borderRadius: 999,
  border: '1px solid #d9d9d9',
  backgroundColor: '#fff',
  paddingInline: 16,
  height: 40,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
}

export function BookDetails({
  book,
  numberOfClients,
  clients,
  buyers,
  onCreateSale,
  onUpdate,
}: BookDetailsProps): ReactElement {
  const navigate = useNavigate()

  if (!book) {
    return (
      <div style={{ padding: 24 }}>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate({ to: '/books' })}
          style={backButtonStyle}
        >
          Go back to books
        </Button>
        <Text type="secondary">Loading book...</Text>
      </div>
    )
  }

  const { id, title, yearPublished, pictureUrl, author } = book

  const authorId =
    (book as any).authorId ?? (author as any).id ?? undefined

  const goToAuthor = (): void => {
    if (!authorId) return
    navigate({ to: '/authors/$authorId', params: { authorId } })
  }

  const [editing, setEditing] = useState(false)
  const [localTitle, setLocalTitle] = useState(title ?? '')
  const [localYear, setLocalYear] = useState(yearPublished?.toString() ?? '')

  useEffect(() => {
    if (!editing) {
      setLocalTitle(title ?? '')
      setLocalYear(yearPublished?.toString() ?? '')
    }
  }, [book, title, yearPublished, editing])

  const handleSave = (): void => {
    const t = (localTitle || '').trim()
    const y = (localYear || '').trim()

    if (!t || !y) {
      alert('You must fill all the fields!')
      return
    }

    const yearNumber = Number(y)
    if (Number.isNaN(yearNumber)) {
      alert('Year of publication must be a number')
      return
    }

    const updated: UpdateBookModel = {
      title: t,
      yearPublished: yearNumber,
    }

    setLocalTitle(t)
    setLocalYear(yearNumber.toString())
    setEditing(false)
    onUpdate(id, updated)
  }

  const buyersLabel =
    numberOfClients === 1
      ? '1 person has bought this book'
      : `${numberOfClients} people have bought this book`

  return (
    <div style={{ padding: 24 }}>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate({ to: '/books' })}
        style={backButtonStyle}
      >
        Go back to books
      </Button>

      <Row gutter={24}>
        <Col xs={24} md={8}>
          <Card
            style={{
              borderRadius: 14,
              boxShadow: '0 3px 8px rgba(0,0,0,0.06)',
            }}
            bodyStyle={{ padding: 16 }}
          >
            <img
              src={pictureUrl}
              alt={title}
              style={{
                width: '100%',
                borderRadius: 12,
                marginBottom: 12,
                objectFit: 'cover',
              }}
            />

            <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
              {buyersLabel}
            </Text>

            <CreateSaleModal
              bookId={id}
              bookTitle={title}
              clients={clients}
              onCreate={onCreateSale}
            />
          </Card>
        </Col>
        <Col xs={24} md={16}>
          <Card
            style={{
              borderRadius: 14,
              boxShadow: '0 3px 8px rgba(0,0,0,0.06)',
              marginBottom: 24,
            }}
            bodyStyle={{ padding: 24 }}
          >
            <Title level={4} style={{ marginBottom: 24 }}>
              Book information
            </Title>

            <div style={{ marginBottom: 16 }}>
              <Text strong>Title</Text>
              {editing ? (
                <Input
                  value={localTitle}
                  onChange={e => setLocalTitle(e.target.value)}
                  style={{ marginTop: 4 }}
                />
              ) : (
                <InputLike>{title}</InputLike>
              )}
            </div>

            <div style={{ marginBottom: 16 }}>
              <Text strong>Author</Text>
              <div
                style={{
                  display: 'flex',
                  gap: 8,
                  marginTop: 4,
                  alignItems: 'stretch',
                }}
              >
                <div style={{ flex: 1 }}>
                  <InputLike>
                    {author.firstName} {author.lastName}
                  </InputLike>
                </div>
                <Button
                  onClick={goToAuthor}
                  disabled={!authorId}
                  style={{
                    borderRadius: 8,
                    height: 40,
                    paddingInline: 16,
                    whiteSpace: 'nowrap',
                    fontWeight: 500,
                  }}
                >
                  See Author
                </Button>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <Text strong>Year of publication</Text>
              {editing ? (
                <Input
                  value={localYear}
                  onChange={e => setLocalYear(e.target.value)}
                  style={{ marginTop: 4 }}
                />
              ) : (
                <InputLike>{yearPublished}</InputLike>
              )}
            </div>

            {editing ? (
              <div
                style={{
                  display: 'flex',
                  gap: 8,
                  marginTop: 8,
                }}
              >
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  block
                  style={{
                    height: 44,
                    borderRadius: 8,
                    background: '#0B0B1A',
                    borderColor: '#0B0B1A',
                    fontWeight: 600,
                  }}
                  onClick={handleSave}
                >
                  Save
                </Button>
                <Button
                  block
                  style={{ height: 44, borderRadius: 8 }}
                  onClick={() => {
                    setEditing(false)
                    setLocalTitle(title ?? '')
                    setLocalYear(yearPublished?.toString() ?? '')
                  }}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                block
                style={{
                  marginTop: 8,
                  height: 44,
                  borderRadius: 8,
                  background: '#0B0B1A',
                  color: '#fff',
                  borderColor: '#0B0B1A',
                  fontWeight: 600,
                }}
                onClick={() => setEditing(true)}
              >
                Edit Information
              </Button>
            )}
          </Card>
        </Col>
      </Row>

      <Card
        style={{
          borderRadius: 14,
          boxShadow: '0 3px 8px rgba(0,0,0,0.06)',
          marginTop: 24,
        }}
        bodyStyle={{ padding: 24 }}
      >
        <Title level={4} style={{ marginBottom: 16 }}>
          Shopping history
        </Title>
        <List
  dataSource={buyers}
  locale={{ emptyText: 'No purchases yet' }}
  renderItem={buyer => {
    const anyBuyer = buyer as any

    

    const firstName = anyBuyer.firstName ?? anyBuyer.client?.firstName ?? ''
    const lastName = anyBuyer.lastName ?? anyBuyer.client?.lastName ?? ''
    const email =
      anyBuyer.email ??
      anyBuyer.client?.email ??
      undefined

    return (
      <List.Item
        style={{
          borderRadius: 12,
          border: '1px solid #f0f0f0',
          padding: 16,
          marginBottom: 12,
        }}
      >
        <div style={{ width: '100%' }}>
          <Text strong style={{ display: 'block' }}>
            {firstName} {lastName}
          </Text>

          {email && (
            <Text type="secondary" style={{ display: 'block' }}>
              {email}
            </Text>
          )}

          
        </div>
      </List.Item>
    )
  }}
/>


      </Card>
    </div>
  )
}

function InputLike({
  children,
  style,
}: {
  children: ReactNode
  style?: CSSProperties
}): ReactElement {
  return (
    <div
      style={{
        marginTop: 4,
        padding: '8px 12px',
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
        color: '#888',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
