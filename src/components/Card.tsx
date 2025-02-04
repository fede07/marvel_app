import { Link } from "react-router-dom";

const Card = ({ id, name, image }: { id: string; name: string; image: string }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-bold">{name}</h2>
        <Link to={`/details/${id}`} className="text-blue-500 hover:underline">
          View details
        </Link>
      </div>
    </div>
  );
};

export default Card;
