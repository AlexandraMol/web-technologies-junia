import { type ReactElement } from 'react'
import { Card, Table, Typography, Space, Button } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { BookOutlined } from '@ant-design/icons'
import type { ClientBooksModel } from '../ClientModel'

const { Text } = Typography

interface ClientBooksTableProps {
  items?: ClientBooksModel[] | ClientBooksModel | null
  onViewDetails?: (id: string) => void
}

const formatDate = (value: ClientBooksModel['soldAt']) => {
  const d = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(d.getTime())) return ''
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = d.getFullYear()
  return `${dd}-${mm}-${yyyy}`
}

export function ClientBooksTable({
  items,
  onViewDetails,
}: ClientBooksTableProps): ReactElement {
  const data: ClientBooksModel[] = Array.isArray(items)
    ? items
    : items
      ? [items]
      : []
  const columns: ColumnsType<ClientBooksModel> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (value: string) => <Text>{value}</Text>,
    },
    {
      title: 'Author',
      key: 'author',
      responsive: ['sm'],
      render: (_: unknown, record) => (
        <Text>{`${record?.author?.firstName} ${record?.author?.lastName}`}</Text>
      ),
    },
    {
      title: 'Purchased on',
      dataIndex: 'soldAt',
      key: 'soldAt',
      width: 160,
      align: 'left',
      responsive: ['md'],
      render: (value: ClientBooksModel['soldAt']) => (
        <Text>{formatDate(value)}</Text>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 140,
      render: (_: unknown, record) => (
        <Button
          type="link"
          onClick={() => onViewDetails?.(record?.id)}
          style={{ paddingLeft: 0 }}
        >
          View Details
        </Button>
      ),
    },
  ]

  return (
    <Card
      bodyStyle={{ padding: 16 }}
      style={{ borderRadius: 12, boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}
      title={
        <Space size={8} align="center">
          <BookOutlined style={{ color: '#1677FF', fontSize: 20 }} />
          <Text strong>Purchased Books ({data.length})</Text>
        </Space>
      }
    >
      <Table<ClientBooksModel>
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={false}
        size="middle"
        showHeader
        tableLayout="auto"
        style={{ borderRadius: 8 }}
      />
    </Card>
  )
}
