const Title = ({
  icon,
  title,
  className,
}: {
  icon?: React.ReactNode
  title?: React.ReactNode
  className?: string
}) => {
  return (
    <div className={`flex items-center gap-2 ${className || ""}`}>
      {icon}
      <div className="text-sm md:text-base">{title}</div>
    </div>
  )
}

export default Title
