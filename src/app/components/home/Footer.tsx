import { FC } from "react"

const Footer: FC = () => {
  return (
    <footer className="bg-neutral text-neutral-content text-center text-sm mt-auto h-24 py-4 px-12 sm:h-12 sm:p-4">
      <p className="flex sm:flex-row flex-col items-center justify-center gap-3">
        <span>Armá tu grilla CR 2025</span>
        <span>Todos los derechos reservados</span>
        <a
          className="link link-neutral-content"
          href={`https://wa.me/+5493435129982`}
          target="_blank"
        >
          Quiero contactarme
        </a>
      </p>
    </footer>
  )
}

export default Footer
