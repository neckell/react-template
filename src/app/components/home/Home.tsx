import { FC } from "react"

import Footer from "./Footer"
import Header from "./Header"
import Main from "./Main"

const Home: FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-base-300">
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default Home
