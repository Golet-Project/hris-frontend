type Props = {
  children: React.ReactNode
}

export default function EmployeeLayout(props: Props) {
  return (
    // wrapper
    <div className="mt-4 relative min-h-screen">{props.children}</div>
  )
}
