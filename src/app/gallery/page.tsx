import AppLayout from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GalleryPage() {
  return (
    <AppLayout>
      <div className="p-4 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Gallery</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This is the gallery page. Content will be added soon.</p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
