import {Footer} from "@/components/layout/Footer";
import {Navbar} from "@/components/layout/navbar";
import {getContactSettings} from "@/sanity/lib/institutional";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contactSettings = await getContactSettings();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar contactSettings={contactSettings} />
      <main className="flex-1">{children}</main>
      <Footer contactSettings={contactSettings} />
    </div>
  );
}
