import { createFileRoute } from '@tanstack/react-router'
import { Typography } from 'antd'

const { Title, Paragraph } = Typography

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <div
      style={{
        maxWidth: 800,
        margin: '0 auto',
        padding: '24px 16px',
      }}
    >
      <Title level={2}>About This Project</Title>

      <Paragraph>
        This application is a simple Library Management System designed to help
        administrators manage books, authors, clients, and sales in a clear and
        efficient way.
      </Paragraph>

      <Paragraph>With this platform, administrators can:</Paragraph>

      <ul>
        <li>Keep track of books and their authors</li>
        <li>Manage clients who purchase books</li>
        <li>Register sales and view purchase history</li>
        <li>Navigate easily between different types of data</li>
      </ul>

      <Paragraph>
        The goal is to provide a clean, minimal, and intuitive system that
        simplifies library data management.
      </Paragraph>

      <Title level={4} style={{ marginTop: 32 }}>
        Project Team
      </Title>

      <Paragraph>This project was developed by:</Paragraph>

      <ul>
        <li>Alexandra Mol</li>
        <li>Delia Fragă</li>
        <li>Regina Cavazos</li>
        <li>Angela Michelle</li>
      </ul>

      <Paragraph>
        We hope this tool makes library administration easier and more
        enjoyable.
      </Paragraph>
    </div>
  )
}
