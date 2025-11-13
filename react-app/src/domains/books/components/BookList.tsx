import { useEffect } from 'react'
import { useBookProvider } from '../providers/useBookProvider'
import { useAuthorProvider } from '../../authors/providers/useAuthorProvider'
import { BookListItem } from './BookListItem'
import { CreateBookModal } from './CreateBookModal'

export function BookList() {
  const { books, loadBooks, deleteBook, updateBook, createBook } =
    useBookProvider()
  const { author, loadAuthor } = useAuthorProvider()

  useEffect(() => {
    loadBooks()
    loadAuthor()
  }, [])

  return (
    <>
      {/* Here we DO pass authors → Select with names appears */}
      <CreateBookModal onCreate={createBook} authors={author} />

      {/* grid of books */}
      <div
        style={{
          padding: '1rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {books.map(({ book, numberOfClients }) => (
          <BookListItem
            key={book.id}
            book={book}
            numberOfClients={numberOfClients}
            onDelete={deleteBook}
            onUpdate={updateBook}
          />
        ))}
      </div>
    </>
  )
}
