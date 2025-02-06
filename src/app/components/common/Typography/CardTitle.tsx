type CardTitleProps = {
  children: React.ReactNode
  showDivider?: boolean
  className?: string
}

const CardTitle = ({
  children,
  showDivider = true,
  className,
}: CardTitleProps) => {
  return (
    <div className={`flex flex-col gap-2 w-full pt-6 pb-0 ${className ?? ""}`}>
      {children}
      {showDivider && <div className="divider mt-0 mb-0"></div>}
      {!showDivider && <div className="py-2"></div>}
    </div>
  )
}

export default CardTitle
