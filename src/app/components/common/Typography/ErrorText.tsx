interface ErrorTextProps {
  className?: string
  children: React.ReactNode
}

const ErrorText = ({ className, children }: ErrorTextProps) => {
  return (
    <div className={`text-center  text-error ${className}`}>{children}</div>
  )
}

export default ErrorText
