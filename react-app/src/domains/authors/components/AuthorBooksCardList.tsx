import { type ReactElement } from 'react'
import { Card, Typography, Row, Col, Image, Button } from 'antd'
import type { BookModel } from '../../books/BookModel'

const { Text } = Typography

interface AuthorBooksCardListProps {
  books: BookModel[]
  onViewDetails?: (id: string) => void
}

export function AuthorBooksCardList({
  books,
  onViewDetails,
}: AuthorBooksCardListProps): ReactElement {
  return (
    <Card
      style={{
        borderRadius: 12,
        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
      }}
      bodyStyle={{ padding: 20 }}
      title={<Text strong>Books by the author</Text>}
    >
      {books.length === 0 ? (
        <Text type="secondary">This author has no books yet.</Text>
      ) : (
        <Row gutter={[16, 16]}>
          {books.map(book => (
            <Col key={book.id} xs={24} sm={12} md={8}>
              <Card
                hoverable
                style={{
                  borderRadius: 10,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
                bodyStyle={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 12,
                  padding: 12,
                  alignItems: 'flex-start',
                }}
              >
                <Image
                  src={book.pictureUrl || '/placeholder.png'}
                  alt={book.title}
                  width={70}
                  height={90}
                  style={{
                    borderRadius: 8,
                    objectFit: 'cover',
                  }}
                  preview={false}
                />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <Text strong style={{ fontSize: 15 }}>
                    {book.title}
                  </Text>
                  <div style={{ color: '#666', fontSize: 13, marginTop: 2 }}>
                    {book.yearPublished}
                  </div>

                  <div style={{ marginTop: 8 }}>
                    <Button
                      type="link"
                      style={{
                        padding: 0,
                        fontWeight: 600,
                        color: '#0B0B1A',
                      }}
                      onClick={() => onViewDetails?.(book.id)}
                    >
                      See details
                    </Button>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Card>
  )
}
