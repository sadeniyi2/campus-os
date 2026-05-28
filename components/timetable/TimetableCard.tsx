"use client";

import { Download, FileText, Image, File, Pin, Clock, History } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import type { Timetable } from "@/types";

function FileIcon({ type }: { type: string }) {
  if (type.includes("pdf")) return <FileText className="size-5 text-red-500" />;
  if (type.includes("image")) return <Image className="size-5 text-blue-500" />;
  return <File className="size-5 text-gray-500" />;
}

interface TimetableCardProps {
  timetable: Omit<Timetable, "department"> & { department?: { name: string } };
  canDelete?: boolean;
  onDelete?: (id: string) => void;
}

export function TimetableCard({ timetable, canDelete, onDelete }: TimetableCardProps) {
  return (
    <Card className="card-hover">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center size-10 rounded-xl bg-muted shrink-0">
            <FileIcon type={timetable.fileType} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-sm truncate">{timetable.title}</p>
                  {timetable.isPinned && (
                    <Pin className="size-3.5 text-primary rotate-45 shrink-0" />
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <Badge variant="outline" className="text-xs">
                    {timetable.type === "CLASS" ? "Class" : "Exam"}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Semester {timetable.semester}
                  </Badge>
                  {timetable.department && (
                    <span className="text-xs text-muted-foreground truncate">{timetable.department.name}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
              <Clock className="size-3" />
              <span>{formatDate(timetable.createdAt)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs flex-1"
            onClick={() => window.open(timetable.fileUrl, "_blank")}
          >
            <Download className="size-3.5" />
            Download
          </Button>
          {(timetable.versions?.length ?? 0) > 1 && (
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
              <History className="size-3.5" />
              {timetable.versions?.length} versions
            </Button>
          )}
          {canDelete && (
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:bg-destructive/10 text-xs"
              onClick={() => onDelete?.(timetable.id)}
            >
              Delete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
