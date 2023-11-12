type Props = {
  children: React.ReactNode
  modal: React.ReactNode
}

export default function AttendanceLayout(props: Props) {
  return (
    // wrapper
    <div className="mt-6 relative min-h-screen">
      {props.modal}
      {props.children}
    </div>
  )
}
