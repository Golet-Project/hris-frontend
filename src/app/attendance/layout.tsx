type Props = {
  children: React.ReactNode
}

export default function AttendanceLayout(props: Props) {
  return (
    // wrapper
    <div className="mt-6 relative min-h-screen">{props.children}</div>
  )
}
