import type { ReactElement } from 'react'
import { useState } from 'react'
import { Button, Modal, Space, Input, Select, DatePicker } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import type { ClientModel } from '../../clients/ClientModel'

export type CreateSaleInput = {
  bookId: string
  clientId: string
  date: string 
}

interface CreateSaleModalProps {
  bookId: string
  bookTitle: string
  clients: ClientModel[]
  onCreate: (input: CreateSaleInput) => void
}

export function CreateSaleModal({
  bookId,
  bookTitle,
  clients,
  onCreate,
}: CreateSaleModalProps): ReactElement {
  const [isOpen, setIsOpen] = useState(false)
  const [clientId, setClientId] = useState('')
  const [date, setDate] = useState('') 

  const onClose = (): void => {
    setIsOpen(false)
    setClientId('')
    setDate('')
  }

  const handleOk = (): void => {
    const soldAt = date ? new Date(date).toISOString() : new Date().toISOString()

    onCreate({
      bookId,
      clientId,
      date,
    })
    onClose()
  }

  const isOkDisabled = !clientId.trim().length || !date.trim().length

  const clientOptions = clients
    .map(c => {
      const anyClient = c as any
      const inner = anyClient.client ?? anyClient
      const id: string | undefined = inner.id
      const first: string = inner.firstName ?? ''
      const last: string = inner.lastName ?? ''
      if (!id) return null
      return { label: `${first} ${last}`.trim() || 'Unnamed client', value: id }
    })
    .filter((opt): opt is { label: string; value: string } => Boolean(opt))

  return (
    <>
      <Button
        block
        type="primary"
        icon={<ShoppingCartOutlined />}
        style={{
          marginTop: 16,
          borderRadius: 8,
          height: 44,
          fontWeight: 500,
        }}
        onClick={() => setIsOpen(true)}
      >
        Create a Sale with this Book
      </Button>

      <Modal
        open={isOpen}
        title="Create a new sale"
        onCancel={onClose}
        onOk={handleOk}
        okButtonProps={{ disabled: isOkDisabled }}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input value={bookTitle} readOnly />

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
