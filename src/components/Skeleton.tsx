export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`animate-pulse rounded-md bg-surface ${className || ""}`} {...props} />;
}

export function VehicleCardSkeleton() {
  return (
    <div className="bg-card border border-border overflow-hidden">
      <Skeleton className="aspect-[16/10] w-full" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="pt-4 flex justify-between items-center border-t border-border/40">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="group block">
      <div className="aspect-[16/10] bg-surface border border-border mb-6">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="pt-4 flex justify-between border-t border-border/40">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  );
}

export function AuctionCardSkeleton() {
  return (
    <div className="bg-card border border-border overflow-hidden group hover:border-primary/30 transition-all duration-500">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
        <Skeleton className="h-5 w-3/4 mb-3" />
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-3 w-12 mb-1" />
            <Skeleton className="h-6 w-24" />
          </div>
          <Skeleton className="h-10 w-28" />
        </div>
      </div>
    </div>
  );
}

export function EngineCardSkeleton() {
  return (
    <div className="bg-card border border-border overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="p-10 space-y-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-px flex-1" />
        </div>
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="space-y-3 pt-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
        <Skeleton className="h-12 w-full mt-6" />
      </div>
    </div>
  );
}

export function DetailPageSkeleton() {
  return (
    <div className="grid lg:grid-cols-[1fr_350px] gap-8">
      <div className="space-y-6">
        <Skeleton className="aspect-[16/10] w-full" />
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="aspect-square w-full" />
          ))}
        </div>
        <div className="space-y-4 pt-8">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-2/3" />
        </div>
      </div>
      <div className="space-y-6">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-14 w-full" />
      </div>
    </div>
  );
}
