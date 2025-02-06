import { Card } from "../../daisy"
import CardTitle from "../Typography/CardTitle"

interface SimpleCardProps {
  className?: string
  title?: React.ReactNode
  children: React.ReactNode
}

const SimpleCard = ({ className, title, children }: SimpleCardProps) => {
  return (
    <Card className={`shadow shadow-md bg-base-100 ${className ?? ""}`}>
      {title && <CardTitle className="px-4 relative">{title}</CardTitle>}
      <Card.Body className="p-4">{children}</Card.Body>
    </Card>
  )
}

export default SimpleCard
