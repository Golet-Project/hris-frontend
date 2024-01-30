import { NavigateOptions } from "next/dist/shared/lib/app-router-context"

export type ProgressBarRouter = {
  push: (
    href: string,
    options?: NavigateOptions,
    NProgressOptions?: {
      showProgressBar?: boolean
    }
  ) => void
  back: (NProgressOptions?: { showProgressBar?: boolean }) => void
  forward(): void
  refresh(): void
  replace(href: string, options?: NavigateOptions | undefined): void
  prefetch(href: string, options?: import("next/dist/shared/lib/app-router-context").PrefetchOptions | undefined): void
}
