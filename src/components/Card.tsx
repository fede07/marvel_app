import { Link } from "react-router-dom";

const Card = ({ id, name, image }: { id: string; name: string; image: string; }) => {
  return (
    <div className="card border-2 border-b-sky-800 rounded-md overflow-hidden shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg bg-gray-950">
      <Link to={`/details/${id}`} className="text-white hover:underline flex flex-col h-full">
        <div className="p-2 border-4 rounded-md border-blue-100 bg-blue-100">
          <img src={image} alt={name} className="w-full h-48 object-cover rounded-lg" />
        </div>
        <div className="p-4 flex items-center justify-center flex-grow">
          <h2 className="text-lg font-bold text-center text-white truncate, w-full">{name}</h2>
        </div>
      </Link>
    </div>
  )
}

export default Card
