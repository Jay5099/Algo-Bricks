import Card from "./Card"
import cards from "../data/carddetails"

const Cards = () => {
  return (
    <div className=" m-5 p-5 grid lg:grid-cols-3 lg:gap-4 md:grid-cols-2 md:gap-2 ">
        {cards.map((card) => (
            <Card key={card.id} card={card} />
        ))}
    </div>
  )
}

export default Cards