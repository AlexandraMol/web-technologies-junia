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
type ClientLike = ClientModel | { client: ClientModel }

interface CreateSaleModalProps {
  bookId: string
  bookTitle: string
  clients: ClientLike[]
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
    onCreate({
      bookId,
      clientId,
      date,
    })
    onClose()
  }

  const isOkDisabled = !clientId.trim().length || !date.trim().length

  const clientOptions = clients.map(clientLike => {
    const c = 'client' in clientLike ? clientLike.client : clientLike

    const fullName = `${c.firstName} ${c.lastName}`.trim() || 'Unnamed client'

    return {
      label: fullName,
      value: c.id,
    }
  })

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

          <Select<string>
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
              setDate(
                Array.isArray(dateString) ? (dateString[0] ?? '') : dateString,
              )
            }
          />
        </Space>
      </Modal>
    </>
  )
}
