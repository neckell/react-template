import { FC } from "react"

import Footer from "./Footer"
import Header from "./Header"
import MainSelector from "./MainSelector"

const Home: FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-base-300">
      <Header />
      <MainSelector />
      <Footer />
    </div>
  )
}

export default Home
