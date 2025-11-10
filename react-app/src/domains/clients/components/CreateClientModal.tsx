import { useState } from 'react'
import type { CreateClientModel } from '../ClientModel'
import { Button, Input, Modal, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

interface CreateClientModalProps {
  onCreate: (book: CreateClientModel) => void
}

export function CreateClientModal({ onCreate }: CreateClientModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [pictureUrl, setPictureUrl] = useState('')

  const onClose = () => {
    setFirstName('')
    setLastName('')
    setEmail('')
    setPictureUrl('')
    setIsOpen(false)
  }

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setIsOpen(true)}
      >
        Create Client
      </Button>
      <Modal
        open={isOpen}
        onCancel={onClose}
        onOk={() => {
          onCreate({
            firstName,
            lastName,
            email,
            pictureUrl,
          })
          onClose()
        }}
        okButtonProps={{
          disabled: !firstName?.length || !lastName,
        }}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            type="text"
            placeholder="First name*"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Last name*"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Picture"
            value={pictureUrl}
            onChange={e => setPictureUrl(e.target.value)}
          />
        </Space>
      </Modal>
    </>
  )
}
