import { createFileRoute } from '@tanstack/react-router'
import { Typography, Layout, Card, List, Divider } from 'antd'

const { Title, Paragraph, Text } = Typography
const { Content } = Layout

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <Layout
      style={{
        maxWidth: 800,
        margin: '0 auto',
      }}
    >
      <Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '40px 16px',
        }}
      >
        <Card
          style={{
            maxWidth: 900,
            width: '100%',
            borderRadius: 16,
          }}
          bodyStyle={{ padding: '32px 28px' }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              marginBottom: 12,
            }}
          >
            <Title level={2} style={{ margin: 0 }}>
              About This Project
            </Title>

            <Paragraph style={{ marginBottom: 4 }}>
              This application is a simple Library Management System designed to
              help administrators manage books, authors, clients, and sales in a
              clear and efficient way.
            </Paragraph>

            <Paragraph style={{ marginBottom: 0 }}>
              With this platform, administrators can:
            </Paragraph>
          </div>

          <List
            style={{ marginBottom: 16 }}
            dataSource={[
              'Keep track of books and their authors',
              'Manage clients who purchase books',
              'Register sales and view purchase history',
              'Navigate easily between different types of data',
            ]}
            renderItem={item => (
              <List.Item style={{ paddingLeft: 0, paddingRight: 0 }}>
                <Text>• {item}</Text>
              </List.Item>
            )}
          />

          <Paragraph style={{ marginTop: 4 }}>
            The goal is to provide a clean, minimal, and intuitive system that
            simplifies library data management.
          </Paragraph>

          <Divider style={{ margin: '24px 0' }} />

          <Title level={4} style={{ marginTop: 0, marginBottom: 8 }}>
            Project Team
          </Title>

          <Paragraph style={{ marginBottom: 8 }}>
            This project was developed by:
          </Paragraph>

          <List
            size="small"
            dataSource={[
              'Maria-Alexandra MOLNAR',
              'Delia FRAGA',
              'Regina CAVAZOS VALDES',
              'Ange Michelle TCHEMTCHOUA DJUEDJON',
            ]}
            renderItem={name => (
              <List.Item
                style={{ paddingLeft: 0, paddingRight: 0, border: 'none' }}
              >
                <Text>• {name}</Text>
              </List.Item>
            )}
          />

          <Paragraph style={{ marginTop: 16, marginBottom: 0 }}>
            We hope this tool makes library administration easier and more
            enjoyable.
          </Paragraph>
        </Card>
      </Content>
    </Layout>
  )
}
