import Cards from "./Cards"
import Navbar from "./Navbar"

const Home = () => {
  // console.log("Home")
  return (
    <div>
      <Navbar />  
      <hr className="my-4" />
      <Cards />
    </div>
  )
}

export default Home
