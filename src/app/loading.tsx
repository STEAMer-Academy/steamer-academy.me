import Spinner from "@/components/ui/loader";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex content-center items-center justify-center bg-background">
      <div className="text-center">
        <Spinner className="size-16 text-primary" />
        <h2 className="mt-4 text-2xl font-semibold text-foreground">
          Loading STEAMer Academy...
        </h2>
        <p className="mt-2 text-muted-foreground">
          Preparing your learning adventure
        </p>
      </div>
    </div>
  );
}
