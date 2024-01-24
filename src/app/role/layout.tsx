type Props = {
  children: React.ReactNode
}

export default function Layout(props: Props) {
  return <div className="mt-4 min-h-screen">{props.children}</div>
}
