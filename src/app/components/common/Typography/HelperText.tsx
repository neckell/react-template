interface HelperTextProps {
  className?: string
  children: React.ReactNode
}

const HelperText = ({ className, children }: HelperTextProps) => {
  return <div className={`text-slate-400 ${className}`}>{children}</div>
}

export default HelperText
