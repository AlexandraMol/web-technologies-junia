import './App.css'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { Card, Col, Row, Typography, Button } from 'antd'
import {
  UserOutlined,
  BookOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import axios from 'axios'

import { useAuthorProvider } from './domains/authors/providers/useAuthorProvider'
import { useBookProvider } from './domains/books/providers/useBookProvider'
import { useClientProvider } from './domains/clients/providers/useClientProvider'

import { CreateGlobalSaleModal } from './domains/sales/components/CreateGlobalSaleModal'
import type { CreateSaleInput } from './domains/books/components/CreateSaleModal'

type CardSpec = {
  key: 'clients' | 'books' | 'authors' | 'sale'
  title: string
  description: string
  cta: string
  to?: string
  icon: ReactNode
  highlight?: boolean
}

const CARDS: Readonly<CardSpec[]> = [
  {
    key: 'clients',
    title: 'Clients',
    description: 'See and manage clients that have purchased books',
    cta: 'See Clients',
    to: '/clients',
    icon: <UserOutlined />,
  },
  {
    key: 'books',
    title: 'Books',
    description: 'Explore the catalog of Books available right now',
    cta: 'See Books',
    to: '/books',
    icon: <BookOutlined />,
  },
  {
    key: 'authors',
    title: 'Authors',
    description: 'Discover the authors and their masterpieces',
    cta: 'See Authors',
    to: '/authors',
    icon: <TeamOutlined />,
  },
  {
    key: 'sale',
    title: 'New Sale',
    description: 'Register a new Book Sale',
    cta: 'Create Sale',
    icon: <ShoppingCartOutlined />,
    highlight: true,
  },
]

const { Title, Paragraph } = Typography

function App() {
  const { author: authors, loadAuthor } = useAuthorProvider()

  const { books: rawBooks, loadBooks } = useBookProvider()
  const { clients: rawClients, loadClients } = useClientProvider()

  useEffect(() => {
    loadAuthor()
    loadBooks()
    loadClients()
  }, [])

  const plainBooks = rawBooks.map((b: any) => b.book ?? b)

  const plainClients = rawClients.map((c: any) => c.client ?? c)

  const createSale = async (input: CreateSaleInput) => {
    const soldAt = input.date
      ? new Date(input.date).toISOString()
      : new Date().toISOString()

    await axios.post('http://localhost:3000/sales', {
      bookId: input.bookId,
      clientId: input.clientId,
      soldAt,
    })
  }

  return (
    <div style={{ maxWidth: 1120, margin: '0 auto' }}>
      <div style={{ marginBottom: 32 }}>
        <Title level={3} style={{ marginBottom: 8 }}>
          Library Management System
        </Title>
        <Paragraph style={{ margin: 0, opacity: 0.8 }}>
          Administrate clients, books, authors and sales in a single place, in a
          single click
        </Paragraph>
      </div>

      <Row gutter={[24, 24]}>
        {CARDS.map(({ key, title, description, cta, to, icon, highlight }) => (
          <Col key={key} xs={24} sm={12} lg={6}>
            <Card
              styles={{
                body: {
                  minHeight: 250,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                },
              }}
              style={
                highlight
                  ? {
                      background:
                        'linear-gradient(135deg, #FF7A45 0%, #FF4D4F 50%, #FA541C 100%)',
                      color: 'white',
                      border: 'none',
                    }
                  : undefined
              }
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  display: 'grid',
                  placeItems: 'center',
                  background: highlight ? 'rgba(255,255,255,0.2)' : '#E6F4FF',
                  color: highlight ? 'white' : '#1677FF',
                  fontSize: 22,
                }}
                aria-hidden
              >
                {icon}
              </div>

              <Typography.Title
                level={5}
                style={{ margin: 0, color: highlight ? 'white' : undefined }}
              >
                {title}
              </Typography.Title>

              <Typography.Paragraph
                style={{
                  flex: 1,
                  margin: 0,
                  marginBottom: 5,
                  textAlign: 'justify',
                  color: highlight ? 'white' : undefined,
                }}
              >
                {description}
              </Typography.Paragraph>

              {key === 'sale' ? (
                <CreateGlobalSaleModal
                  authors={authors}
                  books={plainBooks}
                  clients={plainClients}
                  onCreateSale={createSale}
                />
              ) : (
                <Link to={to!}>
                  <Button
                    type={highlight ? 'default' : 'primary'}
                    block
                    style={highlight ? { color: '#141400' } : undefined}
                  >
                    {cta}
                  </Button>
                </Link>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default App
