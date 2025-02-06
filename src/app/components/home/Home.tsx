import { FC, useState } from "react"

import Footer from "./Footer"
import Header from "./Header"
import Landing from "./Landing"
import MainSelector from "./MainSelector"

const Home: FC = () => {
  const [showSelector, setShowSelector] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-base-300">
      {showSelector ? (
        <>
          <Header />
          <MainSelector />
          <Footer />
        </>
      ) : (
        <Landing onStart={() => setShowSelector(true)} />
      )}
    </div>
  )
}

export default Home
