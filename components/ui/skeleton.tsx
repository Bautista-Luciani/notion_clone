import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      /* Reemplazamos bg-muted por bg-primary/5 */
      className={cn("animate-pulse rounded-md bg-primary/5", className)}
      {...props}
    />
  )
}

export { Skeleton }
