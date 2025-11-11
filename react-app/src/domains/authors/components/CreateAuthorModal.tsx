import { useState } from 'react'
import type { CreateAuthorModel } from '../AuthorModel'
import { Button, Input, Modal, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

interface CreateAuthorModalProps {
  onCreate: (book: CreateAuthorModel) => void
}

export function CreateAuthorModal({ onCreate }: CreateAuthorModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [pictureUrl, setPictureUrl] = useState('')

  const onClose = () => {
    setFirstName('')
    setLastName('')
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
        Create author
      </Button>
      <Modal
        open={isOpen}
        onCancel={onClose}
        onOk={() => {
          onCreate({
            firstName,
            lastName,
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
            placeholder="Picture"
            value={pictureUrl}
            onChange={e => setPictureUrl(e.target.value)}
          />
        </Space>
      </Modal>
    </>
  )
}
