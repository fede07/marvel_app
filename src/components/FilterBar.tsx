import {FC ,useEffect ,useRef ,useState} from "react"
import {fetchData} from "../services/api.ts"

interface FilterBarProps {
  filterType: "comics" | "events" | "series" | "stories"
  selectedItem: string
  setSelectedItem: (comic: string) => void
  limit?: number
}

const FilterBar: FC<FilterBarProps> = ({ filterType, selectedItem, setSelectedItem, limit }) => {

  const [items, setItems] = useState<{ id: number; title: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const fetchItems = async () => {
      if (!hasMore || loading) return

      try {
        setLoading(true)
        const data = await fetchData(filterType, { limit: limit ?? 0, offset: page * (limit ?? 0) })
        if (data?.results.length > 0) {
          setItems((prev) => {
            const newItems = data.results.map((item: { id: number; title: string }) => ({ id: item.id, title: item.title }))
            return [...new Map([...prev ,...newItems].map(item => [item.id ,item])).values()]
          })
          setHasMore(true)
        } else {
          setHasMore(false)
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "Error fetching " + filterType )
      } finally {
        setLoading(false)
      }
    }
    fetchItems().then(() => {})
  } ,[filterType, limit, page])

  useEffect(() => {
    console.log("Cant loaded items: ", items.length)
  } ,[items]);

  useEffect(() => {
    setItems([])
    setPage(0)
    setHasMore(true)
  } ,[filterType]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = scrollRef.current
      if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
        setPage((prev) => prev + 1 )
      }
    }
  }

  return (
    <div className="mb-4">
      <label className="block text-white mb-2">Filter by {filterType}</label>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div
          ref={scrollRef}
          className="p-2 border rounded-2xl w-full bg-blue-100 max-h-60 overflow-auto"
          onScroll={handleScroll}
        >
          <select
            className="w-full bg-transparent outline-none"
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
          >
            <option value="">All {filterType}</option>
            {loading ? (
              <option>Loading...</option>
            ) : (
              items.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))
            )}

          </select>
        </div>
      )}
    </div>
  )
}

export default FilterBar
