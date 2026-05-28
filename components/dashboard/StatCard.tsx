import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  gradient?: string;
  className?: string;
}

export function StatCard({ label, value, change, changeLabel, icon, gradient, className }: StatCardProps) {
  const isPositive = (change ?? 0) >= 0;

  return (
    <Card className={cn("card-hover relative overflow-hidden", className)}>
      {gradient && (
        <div className={cn("absolute inset-0 opacity-5", gradient)} />
      )}
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="text-3xl font-bold tracking-tight">{value}</p>
            {change !== undefined && (
              <div className={cn("flex items-center gap-1 text-xs font-medium", isPositive ? "text-emerald-600" : "text-red-500")}>
                {isPositive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                <span>{isPositive ? "+" : ""}{change}%</span>
                {changeLabel && <span className="text-muted-foreground font-normal">{changeLabel}</span>}
              </div>
            )}
          </div>
          {icon && (
            <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10 text-primary">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
