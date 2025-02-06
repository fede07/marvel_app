import {FC} from "react"

interface SearchBarProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
}

const SearchBar: FC<SearchBarProps> = ( {searchTerm, setSearchTerm}) => {
  return (
    <div className="mb-4">
      <input type="text"
             placeholder="Search character..."
             className="p-2 border rounded-2xl w-full bg-blue-100"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  )
}

export default SearchBar
