"use client";

import { ExternalLink, MapPin, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GEOMARK_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface GeoMarkRedirectProps {
  variant?: "button" | "card" | "banner";
  label?: string;
  description?: string;
  className?: string;
}

export function GeoMarkRedirect({
  variant = "button",
  label = "Open GeoMark",
  description = "GPS-powered attendance tracking",
  className,
}: GeoMarkRedirectProps) {
  const handleOpen = () => {
    window.open(GEOMARK_URL, "_blank", "noopener,noreferrer");
  };

  if (variant === "button") {
    return (
      <Button onClick={handleOpen} variant="outline" className={cn("gap-2", className)}>
        <CheckSquare className="size-4" />
        {label}
        <ExternalLink className="size-3 opacity-60" />
      </Button>
    );
  }

  if (variant === "banner") {
    return (
      <div
        className={cn(
          "flex items-center justify-between gap-4 p-4 rounded-xl border border-primary/20 bg-primary/5 cursor-pointer hover:bg-primary/10 transition-colors",
          className
        )}
        onClick={handleOpen}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10">
            <MapPin className="size-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold">{label}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
        <ExternalLink className="size-4 text-muted-foreground shrink-0" />
      </div>
    );
  }

  return (
    <Card
      className={cn("card-hover cursor-pointer border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10", className)}
      onClick={handleOpen}
    >
      <CardContent className="p-6 flex items-center gap-4">
        <div className="flex items-center justify-center size-12 rounded-2xl bg-primary/10">
          <MapPin className="size-6 text-primary" />
        </div>
        <div className="flex-1">
          <p className="font-semibold">{label}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
          <p className="text-xs text-primary mt-1 flex items-center gap-1">
            Opens GeoMark <ExternalLink className="size-3" />
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
