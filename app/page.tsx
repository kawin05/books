import { getBookSummaries } from '@/lib/books'
import { HomeClient } from '@/components/HomeClient'

export default function Home() {
  const books = getBookSummaries()
  return <HomeClient books={books} />
}
