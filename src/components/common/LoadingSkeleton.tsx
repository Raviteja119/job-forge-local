import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export const JobCardSkeleton = () => (
  <Card className="border-0 card-shadow">
    <CardContent className="p-6 space-y-4">
      <div className="flex justify-between">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex gap-4 pt-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
        <div className="text-right space-y-2">
          <Skeleton className="h-8 w-24 ml-auto" />
          <Skeleton className="h-5 w-16 ml-auto" />
        </div>
      </div>
      <Skeleton className="h-px w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>
    </CardContent>
  </Card>
);

export const WorkerCardSkeleton = () => (
  <Card className="border-0 card-shadow">
    <CardHeader>
      <div className="flex items-start gap-4">
        <Skeleton className="w-16 h-16 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-px w-full" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <Skeleton className="h-6 w-20" />
      <div className="flex gap-2">
        <Skeleton className="h-9 flex-1" />
        <Skeleton className="h-9 flex-1" />
      </div>
    </CardContent>
  </Card>
);

export const DashboardSkeleton = () => (
  <div className="space-y-8">
    {/* Profile header skeleton */}
    <Card className="border-0 card-shadow">
      <CardContent className="p-8">
        <div className="flex items-center gap-6">
          <Skeleton className="w-24 h-24 rounded-full" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
            <div className="flex gap-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    {/* Stats skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map(i => (
        <Card key={i} className="border-0 card-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-8 w-12" />
              </div>
              <Skeleton className="h-14 w-14 rounded-xl" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);
