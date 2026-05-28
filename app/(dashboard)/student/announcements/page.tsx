import { AnnouncementFeed } from "@/components/announcements/AnnouncementFeed";

export default function StudentAnnouncementsPage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Announcements</h1>
        <p className="text-sm text-muted-foreground mt-1">Stay updated with the latest from your university</p>
      </div>
      <AnnouncementFeed />
    </div>
  );
}
