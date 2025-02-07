import {useEffect, useState, useRef} from "react"
import {fetchData} from "../services/api.ts"
import Loader from "../components/Loader"
import Card from "../components/Card.tsx"
import SearchBar from "../components/SearchBar.tsx"
import FilterBar from "../components/FilterBar.tsx"

interface Character {
  id: number
  name: string
  thumbnail: {
    path: string
    extension: string
  }
}

const CHARACTERS_PER_PAGE = 16
const ITEM_LIMIT = 100

const HomePage = () => {

  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [debounceSearchTerm, setDebounceSearchTerm] = useState(searchTerm)
  const [hasMore, setHasMore] = useState(true)
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [selectedComic] = useState<string | undefined>(undefined)
  const [selectedEvent, setSelectedEvent] = useState<string | undefined>(undefined)

  const observer = useRef<IntersectionObserver | null>(null)
  const lastCharacterRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceSearchTerm(searchTerm)
      setCharacters([])
      setPage(1)
      setHasMore(true)
      setIsFirstLoad(true)
    }, 500)

    return () => clearTimeout(handler)
  } ,[searchTerm]);

  useEffect(() => {
    setCharacters([])
    setPage(1)
    setHasMore(true)
    setIsFirstLoad(true)
  } ,[selectedComic]);

  useEffect(() => {
    setCharacters([])
    setPage(1)
    setHasMore(true)
    setIsFirstLoad(true)
  } ,[selectedEvent]);

  useEffect(() => {
    const fetchCharacters = async () => {
      let endpoint = "characters"
      if(!hasMore) return

      try {
        setLoading(true)

        const params: Record<string, unknown> = {
          limit: CHARACTERS_PER_PAGE,
          offset: (page - 1) * CHARACTERS_PER_PAGE
        }

        if (debounceSearchTerm) {
          params.nameStartsWith = debounceSearchTerm
        }

        if (selectedComic && selectedComic !== "All Comics") {
          endpoint = "comics/" + selectedComic + "/characters"
        } else {
          endpoint = "characters"
        }

        if (selectedEvent && selectedEvent !== "All Events") {
          endpoint = "events/" + selectedEvent + "/characters"
        } else {
          endpoint = "characters"
        }

        console.log(endpoint, params)

        const data = await fetchData(endpoint, params)

        if (data && data.results.length > 0) {
          setCharacters((prev) => (isFirstLoad? data.results : [...prev, ...data.results]))
          setIsFirstLoad(false)
        } else {
          setHasMore(false)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err))
        setCharacters([])
      } finally {
        setLoading(false)
      }
    }
    fetchCharacters().then(() => {})
  }, [page, debounceSearchTerm, selectedComic, selectedEvent])

  useEffect(() => {
    if (loading || !hasMore) return

    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1)
        }
      },
      {threshold: 1}
    )

    if (lastCharacterRef.current) {
      observer.current.observe(lastCharacterRef.current)
    }
  } ,[loading, hasMore]);

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl bg-white">
      <h1 className="text-2xl font-bold text-white text-center w-full">Marvel DB</h1>
      <div className="w-full max-w-md mx-auto p-6 md:p-8">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        {/*<FilterBar filterType="comics" selectedItem={selectedComic ?? ""} setSelectedItem={setSelectedComic} />*/}
        <FilterBar filterType="events" selectedItem={selectedEvent ?? ""} setSelectedItem={setSelectedEvent} limit={ITEM_LIMIT} />
      </div>

      {characters.length === 0 && !loading && (
        <p className="text-center text-gray-400">No characters found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-2">
        {characters.map((character, index) => {
          if (index === characters.length - 1) {
            return (
              <div ref={lastCharacterRef} key={character.id}>
                <Card
                  id={character.id.toString()}
                  name={character.name}
                  image={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                />
              </div>
            );
          } else {
            return (
              <Card
                key={character.id}
                id={character.id.toString()}
                name={character.name}
                image={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              />
            );
          }
        })}
      </div>
      {loading && <Loader />}
    </div>
  )
}

export default HomePage
