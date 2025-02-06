import { FC } from "react"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import { getImageUrl } from "../../assets/loaders/imagesLoader"

interface LandingProps {
  onStart: () => void
}

const Landing: FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat brightness-50"
        style={{ backgroundImage: `url(${getImageUrl("landing")})` }}
      />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          Armá tu Grilla
          CR 2025
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
          Creá tu grilla personalizada para el festival más esperado del año
        </p>
        <button
          onClick={onStart}
          className="btn btn-primary btn-lg gap-2 animate-bounce"
        >
          Comenzar
          <ArrowRightIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

export default Landing
