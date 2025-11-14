import type { ReactElement } from 'react'
import { useState } from 'react'
import type { CreateBookModel } from '../BookModel'
import type { AuthorModel } from '../../authors/AuthorModel'
import { Button, Input, Modal, Space, Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

interface CreateBookModalProps {
  onCreate: (book: CreateBookModel) => void
  authors?: AuthorModel[]
}

export function CreateBookModal({
  onCreate,
  authors,
}: CreateBookModalProps): ReactElement {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [authorId, setAuthorId] = useState('')
  const [yearPublished, setYearPublished] = useState('')
  const [pictureUrl, setPictureUrl] = useState('')

  const onClose = (): void => {
    setTitle('')
    setAuthorId('')
    setYearPublished('')
    setPictureUrl('')
    setIsOpen(false)
  }

  const handleOk = (): void => {
    onCreate({
      authorId,
      title,
      yearPublished: Number(yearPublished),
      pictureUrl,
    })
    onClose()
  }

  const isOkDisabled =
    !title.trim().length ||
    !authorId.trim().length ||
    !yearPublished.trim().length

  const hasAuthors = authors && authors.length > 0

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setIsOpen(true)}
      >
        Create book
      </Button>

      <Modal
        open={isOpen}
        title="Create a new book"
        onCancel={onClose}
        onOk={handleOk}
        okButtonProps={{ disabled: isOkDisabled }}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            type="text"
            placeholder="Title*"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          {hasAuthors ? (
            <Select
              placeholder="Author*"
              value={authorId || undefined}
              onChange={value => setAuthorId(value)}
              options={authors!.map(a => ({
                label: `${a.author.firstName} ${a.author.lastName}`,
                value: a.author.id,
              }))}
              showSearch
              optionFilterProp="label"
            />
          ) : (
            <Input
              type="text"
              placeholder="Author ID*"
              value={authorId}
              onChange={e => setAuthorId(e.target.value)}
            />
          )}

          <Input
            type="number"
            placeholder="Year published*"
            value={yearPublished}
            onChange={e => setYearPublished(e.target.value)}
          />

          <Input
            type="text"
            placeholder="Picture URL"
            value={pictureUrl}
            onChange={e => setPictureUrl(e.target.value)}
          />
        </Space>
      </Modal>
    </>
  )
}
