import {useEffect, useState} from "react"
import { useParams } from 'react-router-dom'
import {fetchData} from "../services/api"
import Loader from "../components/Loader.tsx"

const DetailPage = () => {
  const { id } = useParams()
  const [character, setCharacter] = useState<{
    name: string
    description: string
    thumbnail?: { path: string; extension: string }
    comics?: { items?: { name: string }[] }
    series?: { items?: { resourceURI: string; name: string }[] }
  } | null>(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      setLoading(true);
      const data = await fetchData(`characters/${id}`);
      setCharacter(data.results[0]);
      setLoading(false);
    }

    fetchCharacterDetails();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        {character?.name}
      </h1>

      {/* Character Image */}
      <div className="flex justify-center mb-6">
        <img
          src={`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`}
          alt={character?.name || "No name available"}
          className="rounded-lg shadow-md object-cover w-80 h-80"
        />
      </div>

      {/* Character Description */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Description</h2>
        <p className="text-gray-600">
          {character?.description || "No description available"}
        </p>
      </div>

      {/* Comics */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Appears in Comics</h2>
        {character?.comics?.items?.length ? (
          <ul className="list-disc list-inside space-y-2">
            {character?.comics?.items?.map((comic, index) => (
              <li key={index} className="text-gray-600">
                {comic.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No comics available.</p>
        )}
      </div>

      {/* Series */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Appears in Series</h2>
        {character?.series?.items?.length ? (
          <ul className="list-disc list-inside space-y-2">
            {character?.series?.items?.map((series, index) => (
              <li key={index} className="text-gray-600">
                {series.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No series available.</p>
        )}
      </div>
    </div>
  )
}

export default DetailPage;
