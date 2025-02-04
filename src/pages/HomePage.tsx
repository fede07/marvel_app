import {useEffect, useState} from "react"
import {fetchData} from "../services/api.ts"
import Loader from "../components/Loader"
import Pagination from "../components/Pagination"
import Card from "../components/Card.tsx";

const HomePage = () => {
  interface Character {
    id: number;
    name: string;
    thumbnail: {
      path: string;
      extension: string;
    };
  }

  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true)
        const data = await fetchData("characters", {limit: 12, offset: page * 10})
        if (data) {
          setCharacters(data.results)
        } else {
          setError("No data available\n. Please try again later.")
          setCharacters([])
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err))
        setCharacters([])
      } finally {
        setLoading(false)
      }
    }
    fetchCharacters()
  }, [page])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Marvel DB</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {characters.map(character => (
            <Card
              key={character.id}
              id={character.id.toString()}
              name={character.name}
              image={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            />
          ))}
        </div>
      )}
      <Pagination page={page} setPage={setPage}/>
    </div>
  )
}

export default HomePage
