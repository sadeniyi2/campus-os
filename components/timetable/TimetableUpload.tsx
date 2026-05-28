"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn, formatFileSize } from "@/lib/utils";

interface TimetableUploadProps {
  onUpload?: (data: { title: string; file: File; semester: number; type: string }) => void;
}

export function TimetableUpload({ onUpload }: TimetableUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [semester, setSemester] = useState("1");
  const [type, setType] = useState("CLASS");
  const [progress, setProgress] = useState(0);
  const [uploaded, setUploaded] = useState(false);

  const onDrop = useCallback((accepted: File[]) => {
    if (accepted[0]) {
      setFile(accepted[0]);
      setTitle(accepted[0].name.replace(/\.[^/.]+$/, ""));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".png", ".jpg", ".jpeg"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  });

  const handleUpload = async () => {
    if (!file || !title) return;
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 15;
      });
    }, 150);
    await new Promise((r) => setTimeout(r, 1500));
    setUploaded(true);
    onUpload?.({ title, file, semester: parseInt(semester), type });
  };

  if (uploaded) {
    return (
      <Card className="border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20">
        <CardContent className="p-6 text-center">
          <Check className="size-10 text-emerald-500 mx-auto mb-2" />
          <p className="font-semibold text-emerald-700 dark:text-emerald-400">Timetable uploaded successfully!</p>
          <p className="text-sm text-muted-foreground mt-1">{title}</p>
          <Button variant="outline" size="sm" className="mt-4" onClick={() => { setUploaded(false); setFile(null); setTitle(""); setProgress(0); }}>
            Upload Another
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-5 space-y-4">
        {/* Drop zone */}
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors",
            isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/30",
            file && "border-primary/40 bg-primary/5"
          )}
        >
          <input {...getInputProps()} />
          {file ? (
            <div className="flex items-center justify-center gap-3">
              <FileText className="size-8 text-primary" />
              <div className="text-left">
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
              </div>
              <button onClick={(e) => { e.stopPropagation(); setFile(null); setTitle(""); }} className="ml-2">
                <X className="size-4 text-muted-foreground hover:text-foreground" />
              </button>
            </div>
          ) : (
            <div>
              <Upload className="size-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-medium">Drop your timetable here</p>
              <p className="text-xs text-muted-foreground mt-1">PDF, PNG, JPG, DOCX • Max 10MB</p>
            </div>
          )}
        </div>

        {file && (
          <>
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. CSC 300L Class Timetable" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Semester</Label>
                <div className="flex gap-2">
                  {["1", "2"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSemester(s)}
                      className={cn(
                        "flex-1 py-2 rounded-lg text-sm font-medium border transition-colors",
                        semester === s ? "bg-primary text-primary-foreground border-transparent" : "border-border hover:bg-accent"
                      )}
                    >
                      Sem {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <div className="flex gap-2">
                  {["CLASS", "EXAM"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setType(t)}
                      className={cn(
                        "flex-1 py-2 rounded-lg text-sm font-medium border transition-colors",
                        type === t ? "bg-primary text-primary-foreground border-transparent" : "border-border hover:bg-accent"
                      )}
                    >
                      {t.charAt(0) + t.slice(1).toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {progress > 0 && progress < 100 && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Uploading...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
            )}

            <Button variant="gradient" className="w-full gap-2" onClick={handleUpload} disabled={!title || progress > 0 && progress < 100}>
              <Upload className="size-4" />
              Upload Timetable
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
