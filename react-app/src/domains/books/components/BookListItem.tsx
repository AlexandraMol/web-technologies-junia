import { useState } from 'react'
import type { BookModel, UpdateBookModel } from '../BookModel'
import { Button, Input } from 'antd'
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { Link } from '@tanstack/react-router'

interface BookListItemProps {
  book: BookModel
  onDelete: (id: string) => void
  onUpdate: (id: string, input: UpdateBookModel) => void
}

export function BookListItem({ book, onDelete, onUpdate }: BookListItemProps) {
  const [title, setTitle] = useState(book.title)
  const [isEditing, setIsEditing] = useState(false)

  const onCancelEdit = () => {
    setIsEditing(false)
    setTitle(book.title)
  }

  const onValidateEdit = () => {
    onUpdate(book.id, { title })
    setIsEditing(false)
  }

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        height: '100%',
      }}
    >
      {/* COVER IMAGE */}
      <img
        src={book.pictureUrl}
        alt={book.title}
        style={{
          width: '100%',
          height: '220px',
          objectFit: 'cover',
          borderRadius: '8px',
          marginBottom: '1rem',
        }}
      />

      {/* TITLE (editable) */}
      {isEditing ? (
        <Input
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ marginBottom: '.5rem' }}
        />
      ) : (
        <h3 style={{ margin: 0, marginBottom: '.5rem' }}>{book.title}</h3>
      )}

      {/* AUTHOR */}
      <p style={{ margin: 0, marginBottom: '.25rem', color: '#555' }}>
        {book.author.firstName} {book.author.lastName}
      </p>

      {/* YEAR */}
      <p style={{ margin: 0, marginBottom: '.75rem', color: '#888' }}>
        Published: {book.yearPublished}
      </p>

      {/* BOTTOM ACTION ROW */}
      <div
        style={{
          marginTop: 'auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '.5rem',
        }}
      >
        <Link
          to="/books/$bookId"
          params={{ bookId: book.id }}
          style={{ textDecoration: 'underline', fontSize: '.9rem' }}
        >
          See details
        </Link>

        <div style={{ display: 'flex', gap: '.25rem' }}>
          {isEditing ? (
            <>
              <Button type="primary" onClick={onValidateEdit}>
                <CheckOutlined />
              </Button>
              <Button onClick={onCancelEdit}>
                <CloseOutlined />
              </Button>
            </>
          ) : (
            <Button type="primary" onClick={() => setIsEditing(true)}>
              <EditOutlined />
            </Button>
          )}
          <Button type="primary" danger onClick={() => onDelete(book.id)}>
            <DeleteOutlined />
          </Button>
        </div>
      </div>
    </div>
  )
}
