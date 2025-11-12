import { useEffect, useState, type ReactElement } from 'react'
import { Card, Typography, Input, Button, Avatar, Space } from 'antd'
import { UserOutlined, SaveOutlined } from '@ant-design/icons'
import type { AuthorExtendedModel, UpdateAuthorModel } from '../AuthorModel'

const { Title, Text } = Typography

interface AuthorDetailsCardProps {
  info: AuthorExtendedModel
  onUpdate: (id: string, input: UpdateAuthorModel) => void
}

export function AuthorDetailsCard({
  info,
  onUpdate,
}: AuthorDetailsCardProps): ReactElement {
  const [editing, setEditing] = useState(false)

  const [firstName, setFirstName] = useState(info.firstName ?? '')
  const [lastName, setLastName] = useState(info.lastName ?? '')
  const [pictureUrl, setPictureUrl] = useState(info.pictureUrl ?? '')

  const [currentPicture, setCurrentPicture] = useState(info.pictureUrl ?? '')

  useEffect(() => {
    if (!editing) {
      setFirstName(info.firstName ?? '')
      setLastName(info.lastName ?? '')
      setPictureUrl(info.pictureUrl ?? '')
      setCurrentPicture(info.pictureUrl ?? '')
    }
  }, [info])

  const handleSave = (): void => {
    const fn = (firstName || '').trim()
    const ln = (lastName || '').trim()
    const pic = (pictureUrl || '').trim()
    if (!fn || !ln || !pic) {
      alert('You must fill all the fields!')
      return
    }

    const updated: UpdateAuthorModel = {
      firstName: fn,
      lastName: ln,
      pictureUrl: pic,
    }

    setFirstName(fn)
    setLastName(ln)
    setPictureUrl(pic)
    setCurrentPicture(pic)

    setEditing(false)
    onUpdate(info.id, updated)
  }

  return (
    <Card
      style={{ borderRadius: 12, boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}
      bodyStyle={{
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <Title level={5} style={{ marginBottom: 4 }}>
        Personal Information
      </Title>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Avatar
          size={72}
          src={currentPicture || undefined}
          icon={!currentPicture ? <UserOutlined /> : undefined}
          style={{
            backgroundColor: currentPicture ? 'transparent' : '#E6F4FF',
            color: '#1677FF',
            fontSize: 26,
          }}
        />
      </div>

      <div
        style={{ display: 'grid', gap: 14, width: '100%', textAlign: 'left' }}
      >
        <div>
          <Text strong>First name:</Text>
          <Input
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            disabled={!editing}
          />
        </div>

        <div>
          <Text strong>Last name:</Text>
          <Input
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            disabled={!editing}
          />
        </div>

        {editing && (
          <div>
            <Text strong>Picture URL:</Text>
            <Input
              type="url"
              value={pictureUrl}
              onChange={e => {
                setPictureUrl(e.target.value)
                setCurrentPicture(e.target.value)
              }}
              placeholder="https://example.com/avatar.jpg"
            />
          </div>
        )}
      </div>

      {editing ? (
        <Space style={{ width: '100%' }}>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            block
            style={{
              height: 42,
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
            style={{ height: 42, borderRadius: 8 }}
            onClick={() => {
              setEditing(false)
            }}
          >
            Cancel
          </Button>
        </Space>
      ) : (
        <Button
          block
          style={{
            marginTop: 8,
            height: 42,
            borderRadius: 8,
            background: '#0B0B1A',
            color: '#fff',
            borderColor: '#0B0B1A',
            fontWeight: 600,
          }}
          onClick={() => {
            setEditing(true)
          }}
        >
          Edit Information
        </Button>
      )}
    </Card>
  )
}
