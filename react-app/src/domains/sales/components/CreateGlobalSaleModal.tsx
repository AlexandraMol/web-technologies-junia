// domains/sales/components/CreateGlobalSaleModal.tsx
import type { ReactElement } from 'react'
import { useMemo, useState } from 'react'
import { Button, Modal, Space, Select, DatePicker } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'

import type { AuthorModel } from '../../authors/AuthorModel'
import type { BookModel } from '../../books/BookModel'
import type { ClientModel } from '../../clients/ClientModel'
import type { CreateSaleInput } from '../../books/components/CreateSaleModal'

interface CreateGlobalSaleModalProps {
  authors: AuthorModel[]
  books: BookModel[]
  clients: ClientModel[]
  onCreateSale: (input: CreateSaleInput) => Promise<void> | void
}

export function CreateGlobalSaleModal({
  authors,
  books,
  clients,
  onCreateSale,
}: CreateGlobalSaleModalProps): ReactElement {
  const [isOpen, setIsOpen] = useState(false)
  const [authorId, setAuthorId] = useState('')
  const [bookIds, setBookIds] = useState<string[]>([])
  const [clientId, setClientId] = useState('')
  const [date, setDate] = useState('') // 'YYYY-MM-DD'

  const onClose = (): void => {
    setIsOpen(false)
    setAuthorId('')
    setBookIds([])
    setClientId('')
    setDate('')
  }


  const authorOptions = useMemo(
    () =>
      authors.map(a => ({
        label: `${a.author.firstName} ${a.author.lastName}`,
        value: a.author.id,
      })),
    [authors],
  )

  const selectedAuthor = useMemo(
    () => authors.find(a => a.author.id === authorId) ?? null,
    [authors, authorId],
  )

  const bookOptions = useMemo(() => {
    if (!selectedAuthor) return []
    const { firstName, lastName } = selectedAuthor.author

    return books
      .filter(
        b =>
          b.author.firstName === firstName &&
          b.author.lastName === lastName,
      )
      .map(b => ({
        label: b.title,
        value: b.id,
      }))
  }, [books, selectedAuthor])

  const clientOptions = useMemo(
    () =>
      clients.map(c => ({
        label: `${c.firstName} ${c.lastName}`,
        value: c.id,
      })),
    [clients],
  )

  const isOkDisabled =
    !authorId || bookIds.length === 0 || !clientId || !date

  const handleOk = async (): Promise<void> => {
    await Promise.all(
      bookIds.map(bookId =>
        Promise.resolve(
          onCreateSale({
            bookId,
            clientId,
            date, // backend conversion happens in App
          }),
        ),
      ),
    )
    onClose()
  }

  return (
    <>
      <Button
        type="primary"
        icon={<ShoppingCartOutlined />}
        onClick={() => setIsOpen(true)}
        style={{ borderRadius: 8, height: 44, fontWeight: 500 }}
      >
        Create Sale
      </Button>

      <Modal
        title="Create a new sale"
        open={isOpen}
        onCancel={onClose}
        onOk={handleOk}
        okButtonProps={{ disabled: isOkDisabled }}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Select
            placeholder="Select author*"
            value={authorId || undefined}
            onChange={value => {
              setAuthorId(value)
              setBookIds([])
            }}
            options={authorOptions}
            showSearch
            optionFilterProp="label"
          />

          <Select
            mode="multiple"
            placeholder={
              selectedAuthor ? 'Select book(s)*' : 'Select an author first'
            }
            value={bookIds}
            onChange={values => setBookIds(values)}
            options={bookOptions}
            disabled={!selectedAuthor}
            showSearch
            optionFilterProp="label"
          />

          <Select
            placeholder="Select client*"
            value={clientId || undefined}
            onChange={value => setClientId(value)}
            options={clientOptions}
            showSearch
            optionFilterProp="label"
          />

          <DatePicker
            style={{ width: '100%' }}
            placeholder="Select date*"
            onChange={(_, dateString) =>
              setDate(Array.isArray(dateString) ? dateString[0] ?? '' : dateString)
            }
          />
        </Space>
      </Modal>
    </>
  )
}
