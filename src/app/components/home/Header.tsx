import MoonIcon from "@heroicons/react/24/outline/MoonIcon"
import SunIcon from "@heroicons/react/24/outline/SunIcon"
import { FC } from "react"
import { getImageUrl, getLogoImage } from "../../assets/loaders/imagesLoader"
import useTheme from "../../hooks/useTheme"

const Header: FC = () => {
  const { currentTheme, changeTheme } = useTheme()
  const logoUrl = getImageUrl(getLogoImage())

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-neutral backdrop-blur-sm shadow-lg p-4 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between gap-3">
        <span className="w-12 h-12">
          <img
            src={logoUrl}
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </span>
        <h1 className="font-semibold text-center text-lg">
          Armá tu Grilla - CR 2025{" "}
          <span className="sm:inline sm:ml-1 inline-block">15 y 16 de Febrero</span>
        </h1>
        <div className="space-x-10">
          <a className="cursor-pointer">
            <SunIcon
              onClick={() => changeTheme("light")}
              className={
                "fill-current w-6 h-6 " +
                (currentTheme === "dark" ? "block" : "hidden")
              }
            />
            <MoonIcon
              onClick={() => changeTheme("dark")}
              className={
                "fill-current w-6 h-6 " +
                (currentTheme === "light" ? "block" : "hidden")
              }
            />
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
