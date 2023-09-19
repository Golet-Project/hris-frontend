type Props = {
  children: React.ReactNode
}

export default function Layout(props: Props) {
  return <div className="mt-6 min-h-screen">{props.children}</div>
}
