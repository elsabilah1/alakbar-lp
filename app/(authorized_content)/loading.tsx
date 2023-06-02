import { Icons } from "@/components/icons"

export default function Loading() {
  return (
    <div className="absolute top-1/2 left-1/2">
      <Icons.loader className="h-8 w-8 animate-spin" />
    </div>
  )
}
