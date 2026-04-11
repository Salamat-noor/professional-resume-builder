"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StatsCardProps {
  icon: string;
  label: string;
  value: string;
  change: string;
  color: string;
  bg: string;
}

export function StatsCard({
  icon,
  label,
  value,
  change,
  color,
  bg,
}: StatsCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow border border-border/80 bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-xl ring-1 ring-border/60 ${bg}`}
        >
          <i className={`${icon} text-lg ${color}`} />
        </div>
        <Badge variant="secondary" className="text-xs font-medium">
          {change}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground">{value}</div>
        <p className="text-sm text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}
