import { X } from "lucide-react";

export function AuthModal({
  onClose,
  message = "Continue to save this vehicle",
}: {
  onClose: () => void;
  message?: string;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 animate-fade-in p-4">
      <div className="relative w-full max-w-md bg-card border border-border p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 h-8 w-8 inline-flex items-center justify-center text-muted-foreground hover:text-foreground"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="overline">Saints Garage</div>
        <h3 className="mt-2 font-display text-3xl tracking-wider">{message}</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in or create a free account to continue.
        </p>
        <div className="mt-6 space-y-3">
          <button className="w-full h-12 bg-primary hover:bg-primary-dim text-primary-foreground font-mono uppercase tracking-wider text-sm transition-colors">
            Create Free Account
          </button>
          <button className="w-full h-12 border border-border hover:border-foreground font-mono uppercase tracking-wider text-sm transition-colors">
            Log In
          </button>
          <button
            onClick={onClose}
            className="w-full h-10 text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            Continue as Guest →
          </button>
        </div>
      </div>
    </div>
  );
}
