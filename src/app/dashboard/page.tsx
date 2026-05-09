import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LeadsTable } from "@/features/dashboard/components/leads-table";
import { LeadFilters } from "@/features/dashboard/components/lead-filters";
import { getLeads, getDashboardStats, getDefaultRealtor } from "@/lib/server-only/lead.repository";
import { Flame, Thermometer, Snowflake, Users } from "lucide-react";
import type { LeadStatus, FollowUpStatus } from "@prisma/client";

interface DashboardPageProps {
  searchParams: Promise<{ status?: string; followUp?: string }>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const params = await searchParams;
  const statusFilter = params.status as LeadStatus | undefined;
  const followUpFilter = params.followUp as FollowUpStatus | undefined;
  const defaultRealtor = await getDefaultRealtor();
  const defaultRealtorId = defaultRealtor?.id ?? "__missing_default_realtor__";

  const [leads, stats] = await Promise.all([
    getLeads({ status: statusFilter, followUpStatus: followUpFilter, realtorId: defaultRealtorId }),
    getDashboardStats(defaultRealtorId),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Leads</h1>
        <p className="text-muted-foreground">Manage and track your qualified leads.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">{stats.newLeads} new</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Hot</CardTitle>
            <Flame className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.hot}</div>
            <p className="text-xs text-muted-foreground">Score 80+</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Warm</CardTitle>
            <Thermometer className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{stats.warm}</div>
            <p className="text-xs text-muted-foreground">Score 50–79</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Cold</CardTitle>
            <Snowflake className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.cold}</div>
            <p className="text-xs text-muted-foreground">Score &lt;50</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between gap-4">
        <Suspense>
          <LeadFilters />
        </Suspense>
      </div>

      <LeadsTable leads={leads} />
    </div>
  );
}
