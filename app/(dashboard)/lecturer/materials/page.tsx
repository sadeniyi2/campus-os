"use client";

import { useState, useRef } from "react";
import { Upload, FileText, Plus, Loader2, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

type Material = {
  id: string;
  title: string;
  course: string;
  type: string;
  size: string;
  uploadedAt: string;
  url?: string;
};

export default function LecturerMaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/materials/upload", { method: "POST", body: formData });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? "Upload failed");
      }
      const j = await res.json();
      setMaterials((prev) => [j.data, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const ext = (filename: string) => filename.split(".").pop()?.toUpperCase() ?? "FILE";

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Course Materials</h1>
        <Button
          variant="gradient"
          size="sm"
          className="gap-2"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
        >
          {uploading ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
          Upload Material
        </Button>
      </div>

      <input
        ref={fileRef}
        type="file"
        className="hidden"
        accept=".pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg,.mp4"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); }}
      />

      {error && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400">
          <AlertCircle className="size-4 shrink-0 mt-0.5" />
          <p className="text-xs">{error}</p>
        </div>
      )}

      {materials.length === 0 && !uploading ? (
        <div
          className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-colors"
          onClick={() => fileRef.current?.click()}
        >
          <Upload className="size-10 text-muted-foreground opacity-30 mb-3" />
          <p className="text-sm font-medium text-muted-foreground">No materials uploaded yet</p>
          <p className="text-xs text-muted-foreground mt-1">Click to upload PDF, DOCX, PPTX, images or videos</p>
        </div>
      ) : (
        <div className="space-y-3">
          {materials.map((m) => (
            <Card key={m.id} className="card-hover">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center size-10 rounded-xl bg-muted shrink-0">
                    <FileText className="size-5 text-red-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{m.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {m.course && <Badge variant="outline" className="text-xs">{m.course}</Badge>}
                      <span className="text-xs text-muted-foreground">{m.size}</span>
                      <span className="text-xs text-muted-foreground">· {formatDate(m.uploadedAt)}</span>
                    </div>
                  </div>
                  {m.url && (
                    <a href={m.url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="shrink-0 text-xs gap-1">
                        <Upload className="size-3.5" /> Download
                      </Button>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
