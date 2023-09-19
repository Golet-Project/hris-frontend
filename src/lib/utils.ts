/* eslint-disable space-before-function-paren */
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function debounce<T extends (...args: any[]) => any>(func: T, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  } as T
}

export function isEmpty(param: any): boolean {
  if (typeof param === "undefined" || param === null) return true

  if (typeof param === "string") {
    if (param === "") return true
  }

  if (typeof param === "object") {
    if (Object.keys(param).length === 0) return true
  }

  if (Array.isArray(param)) {
    if (param.length === 0) return true
  }

  return false
}
