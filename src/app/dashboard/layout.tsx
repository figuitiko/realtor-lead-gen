import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/actions/auth.actions";
import { LayoutDashboard, LogOut } from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-primary" />
            <Link href="/dashboard" className="font-semibold text-sm">
              Lead Dashboard
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {session.user?.name ?? session.user?.email}
            </span>
            <form action={logoutAction}>
              <Button variant="ghost" size="sm" type="submit">
                <LogOut className="mr-1.5 h-4 w-4" />
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </header>

      <div className="container py-6">{children}</div>
    </div>
  );
}
