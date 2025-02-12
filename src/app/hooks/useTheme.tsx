import { useEffect, useRef } from "react"
import { useAppDispatch, useAppSelector } from "../redux/config/hooks"
import { setTheme } from "../redux/reducers/settingsSlice"

const useTheme = () => {
  const bodyRef = useRef<HTMLBodyElement | null>(null)
  const currentTheme = useAppSelector(state => state.settings.theme)
  const dispatch = useAppDispatch()

  useEffect(() => {
    let theme = localStorage.getItem("theme")
    if (theme) {
      setTheme(theme)
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }, [])

  useEffect(() => {
    if (!bodyRef.current) {
      bodyRef.current = document.documentElement as HTMLBodyElement
    }
  }, [bodyRef.current])

  useEffect(() => {
    if (bodyRef.current && currentTheme) {
      bodyRef.current.setAttribute("data-theme", currentTheme)
    }
  }, [currentTheme])

  const changeTheme = (theme: string) => {
    dispatch(setTheme(theme))
  }

  return { currentTheme, changeTheme }
}

export default useTheme
