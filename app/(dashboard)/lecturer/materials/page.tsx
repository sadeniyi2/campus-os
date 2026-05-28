"use client";

import { Upload, FileText, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

const MATERIALS = [
  { id: "1", title: "Week 1 - Introduction to DSA", course: "CSC 301", type: "PDF", size: "2.4 MB", uploadedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() },
  { id: "2", title: "Week 2 - Arrays and Linked Lists", course: "CSC 301", type: "PDF", size: "3.1 MB", uploadedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
  { id: "3", title: "Software Design Patterns", course: "CSC 309", type: "PPTX", size: "8.7 MB", uploadedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
];

export default function LecturerMaterialsPage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Course Materials</h1>
        <Button variant="gradient" size="sm" className="gap-2">
          <Plus className="size-4" /> Upload Material
        </Button>
      </div>
      <div className="space-y-3">
        {MATERIALS.map((m) => (
          <Card key={m.id} className="card-hover">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-10 rounded-xl bg-muted shrink-0">
                  <FileText className="size-5 text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{m.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">{m.course}</Badge>
                    <span className="text-xs text-muted-foreground">{m.size}</span>
                    <span className="text-xs text-muted-foreground">· {formatDate(m.uploadedAt)}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="shrink-0 text-xs gap-1">
                  <Upload className="size-3.5" /> Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
