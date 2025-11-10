import { useEffect } from 'react'
import { Row, Col } from 'antd'
import { useAuthorProvider } from '../providers/useAuthorProvider'
import { AuthorListItem } from './AuthorListItem'
import { CreateAuthorModal } from './CreateAuthorModal'

export function AuthorList() {
  const { author, loadAuthor, createAuthor, deleteAuthor } =
    useAuthorProvider()

  useEffect(() => {
    loadAuthor()
  }, [])

  return (
    <>
  <CreateAuthorModal onCreate={createAuthor} />
      <div style={{ padding: '1rem 0 1rem' }}>
        <Row gutter={[100, 100]}>
          {author.map(author => (
            <Col key={author.author.id} xs={24} sm={12} lg={8} xl={6}>
              <AuthorListItem
                key={author.author.id}
                author={author}
                onDelete={deleteAuthor}
              />
            </Col>
          ))}
        </Row>
      </div>
    </>
  )
}
