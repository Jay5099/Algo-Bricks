import { useNavigate } from "react-router-dom"

interface Card {
  title: string;
  url: string;
  image: string;
  description: string;
  // Add other properties of the card object if needed
}

interface CardProps {
  card: Card;
}

const Card: React.FC<CardProps> = ({ card }) => {
    
    const navigate = useNavigate()

    const handleClickCard = () => {
        // console.log(card.title+" Clicked. Navigating "+card.url) // Use the card prop
        navigate(`${card.url}`)
    }
  return (
    <div className="flex justify-center items-center p-5 bg-slate-100 w-80 mx-auto my-5 hover:cursor-pointer">
    <div  className="flex flex-col justify-center m-5" onClick={handleClickCard}>
        <img  src={card.image} alt={card.description} />
        <div className="text-center  ">
           {card.title}
        </div>
    </div>
    </div>
  )
}

export default Card