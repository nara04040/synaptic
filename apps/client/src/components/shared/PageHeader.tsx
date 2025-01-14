interface PageHeaderProps {
  heading: string
  description?: string
}

export function PageHeader({ heading, description }: PageHeaderProps) {
  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-semibold">{heading}</h1>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  )
} 