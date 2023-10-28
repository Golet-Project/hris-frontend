"use client"

import cn from "classnames"
import { IoClose, IoWarning } from "react-icons/io5"

type AlertDangerProps = {
  text: string
  handleDismiss: () => void
}

export default function AlertDanger(props: AlertDangerProps) {
  return (
    <figure className={cn("bg-red-200 py-2 px-4 mt-6 rounded-lg", "relative")}>
      <IoWarning className="text-red-400 inline mr-3" />
      <p className="inline text-sm text-gray-600">{props.text}</p>

      {/* Close Button */}
      <span
        className={cn(
          "absolute right-0 top-0 bottom-0 flex items-center w-[50px]",
          "rounded-tr-lg rounded-br-lg",
          "cursor-pointer hover:bg-red-300"
        )}
        onClick={props.handleDismiss}>
        <IoClose className="mx-auto" />
      </span>
    </figure>
  )
}
