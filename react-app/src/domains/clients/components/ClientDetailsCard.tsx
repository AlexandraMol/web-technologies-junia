import { useEffect, useState, type ReactElement } from 'react'
import { Card, Typography, Input, Button, Avatar, Space } from 'antd'
import { UserOutlined, SaveOutlined } from '@ant-design/icons'
import type { ClientModel } from '../ClientModel'

const { Title, Text } = Typography

interface ClientDetailsCardProps {
  info: ClientModel
  onUpdate: (id: string, input: ClientModel) => void
}

export function ClientDetailsCard({
  info,
  onUpdate,
}: ClientDetailsCardProps): ReactElement {
  const [editing, setEditing] = useState(false)

  const [firstName, setFirstName] = useState(info.firstName ?? '')
  const [lastName, setLastName] = useState(info.lastName ?? '')
  const [email, setEmail] = useState(info.email ?? '')
  const [pictureUrl, setPictureUrl] = useState(info.pictureUrl ?? '')

  const [currentPicture, setCurrentPicture] = useState(info.pictureUrl ?? '')

  useEffect(() => {
    if (!editing) {
      setFirstName(info.firstName ?? '')
      setLastName(info.lastName ?? '')
      setEmail(info.email ?? '')
      setPictureUrl(info.pictureUrl ?? '')
      setCurrentPicture(info.pictureUrl ?? '')
    }
  }, [info])

  const handleSave = (): void => {
    const fn = (firstName || '').trim()
    const ln = (lastName || '').trim()
    if (!fn || !ln) {
      alert('You must add a first name and a last name')
      return
    }
    const em = (email || '').trim()
    const pic = (pictureUrl || '').trim()

    const updated: ClientModel = {
      ...info,
      firstName: fn,
      lastName: ln,
      email: em,
      pictureUrl: pic,
    }

    setFirstName(fn)
    setLastName(ln)
    setEmail(em)
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

        <div>
          <Text strong>Email:</Text>
          <Input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
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
