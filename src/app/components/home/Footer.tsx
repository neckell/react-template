import { FC } from "react"

const Footer: FC = () => {
  return (
    <footer className="p-4 bg-neutral text-neutral-content text-center text-sm mt-auto">
      <p>
        Armá tu grilla CR 2025 - Todos los derechos reservados -{" "}
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
