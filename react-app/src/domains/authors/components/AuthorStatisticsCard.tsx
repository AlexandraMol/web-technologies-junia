import { type ReactElement } from 'react'
import { Card, Typography, Statistic, Tooltip } from 'antd'
import { BookOutlined, LineChartOutlined } from '@ant-design/icons'
import type { AuthorStatsModel } from '../AuthorModel'

const { Text } = Typography

interface AuthorStatisticsCardProps {
  stats?: AuthorStatsModel | null
  title?: string
}

export function AuthorStatisticsCard({
  stats,
  title = 'Statistics',
}: AuthorStatisticsCardProps): ReactElement {
  const safe = stats ?? {
    booksCount: 0,
    salesCount: 0,
    averageSalesPerBook: 0,
  }

  const items = [
    {
      key: 'booksCount',
      label: 'Books total',
      value: safe.booksCount,
      icon: <BookOutlined />,
      tooltip: 'Total number of books by this author',
    },
    {
      key: 'salesCount',
      label: 'Total Sales',
      value: safe.salesCount ?? '—',
      icon: <LineChartOutlined />,
      tooltip: 'Total number of books sold',
    },
    {
      key: 'averageSalesPerBook',
      label: 'Average sales per Book',
      value: safe.averageSalesPerBook ?? '—',
      icon: <LineChartOutlined />,
      tooltip: 'Average sales per book',
    },
  ]

  return (
    <Card
      style={{
        borderRadius: 12,
        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
        padding: 0,
      }}
      bodyStyle={{
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <Text strong style={{ fontSize: 16, alignSelf: 'flex-start' }}>
        {title}
      </Text>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 16,
        }}
      >
        {items.map(item => (
          <Tooltip key={item.key} title={item.tooltip}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: 12,
                background: '#F9FAFB',
                borderRadius: 10,
                transition: 'background 0.2s',
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: 8,
                  background: '#F0F5FF',
                  color: '#1677FF',
                  fontSize: 18,
                  flex: '0 0 auto',
                }}
              >
                {item.icon}
              </div>

              <div style={{ flex: 1 }}>
                <Text type="secondary" style={{ fontSize: 13 }}>
                  {item.label}
                </Text>
                <Statistic
                  value={item.value}
                  valueStyle={{ fontSize: 18, fontWeight: 600, marginTop: 4 }}
                />
              </div>
            </div>
          </Tooltip>
        ))}
      </div>
    </Card>
  )
}
