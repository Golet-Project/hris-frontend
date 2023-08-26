"use client"

import {
  Toast,
  ToastClose,
  CustomToastDescription,
  ToastProvider,
  CustomToastTitle,
  ToastViewport
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <CustomToastTitle>{title}</CustomToastTitle>}
              {description && <CustomToastDescription>{description}</CustomToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
