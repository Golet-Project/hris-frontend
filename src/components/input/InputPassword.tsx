"use client"

import cn from "classnames"
import { ChangeEvent, useState } from "react"

type InputPasswordProps = {
  className?: string
  label: string
  name?: string

  onChange?: (e?: ChangeEvent<HTMLInputElement>) => void
}

export default function InputPassword(props: InputPasswordProps) {
  const [isFocus, setIsFocus] = useState(false)
  const [value, setValue] = useState("")

  const handleOnChange = (e?: ChangeEvent<HTMLInputElement>) => {
    setValue(e?.target.value ?? "")
    if (props.onChange !== undefined) {
      props.onChange(e)
    }
  }

  return (
    <div
      className={cn(
        "px-4 py-2 mb-4 border border-solid border-gray-300 relative rounded-lg",
        isFocus ? "border-primary" : "",
        props.className
      )}>
      <span
        className={cn("transition-all duration-300 ease-in-out", "text-gray-400", {
          "absolute left-2 -top-2 bg-white px-2 text-xs": isFocus || value,

          "absolute px-2 left-3 top-1/2 -translate-y-1/2": !isFocus && value === "",
          "text-base bg-transparent": !isFocus && value === "",
          "inline-block align-middle": !isFocus && value === ""
        })}>
        {props.label}
      </span>

      <input
        type="password"
        id={props.label}
        name={props.name}
        autoComplete="off"
        className={cn(
          "focus:outline-none w-full border-none bg-transparent" // base style
        )}
        onChange={handleOnChange}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </div>
  )
}
