import { Link } from "react-router-dom";

const Card = ({ id, name, image }: { id: string; name: string; image: string }) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg bg-blue-100">
      <Link to={`/details/${id}`} className="text-blue-500 hover:underline">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <div className="p-4 flex justify-between">
          <h2 className="text-lg font-bold">{name}</h2>
        </div>
      </Link>
    </div>
  )
}

export default Card;
