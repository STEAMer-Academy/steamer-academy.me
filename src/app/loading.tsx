import { Spinner } from "@nextui-org/spinner";

export default function Loading() {
  return (
    <div className="bg-background fixed inset-0 z-50 flex content-center items-center justify-center">
      <div className="text-center">
        <Spinner className="text-primary h-16 w-16 animate-spin" />
        <h2 className="text-foreground mt-4 text-2xl font-semibold">
          Loading STEAMer Academy...
        </h2>
        <p className="text-muted-foreground mt-2">
          Preparing your learning adventure
        </p>
      </div>
    </div>
  );
}
