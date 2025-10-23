function StatCard({ title, value, icon: Icon, trend, trendValue }) {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-heading font-bold text-foreground">{value}</p>
          {trend && (
            <div className={`flex items-center mt-1 text-sm ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        <div className="bg-primary/10 rounded-full p-3">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </div>
  )
}

export default StatCard
