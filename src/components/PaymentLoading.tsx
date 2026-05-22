import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface PaymentLoadingProps {
  stage: "processing" | "verifying" | "confirming" | "success" | "error";
  message?: string;
}

const STAGES = {
  processing: {
    icon: Loader2,
    label: "Processing Payment",
    subtext: "Please wait while we process your payment...",
  },
  verifying: {
    icon: Loader2,
    label: "Verifying Transaction",
    subtext: "Confirming payment details with provider...",
  },
  confirming: { icon: Loader2, label: "Confirming Order", subtext: "Finalizing your order..." },
  success: {
    icon: CheckCircle,
    label: "Payment Successful",
    subtext: "Your order has been confirmed!",
  },
  error: {
    icon: AlertCircle,
    label: "Payment Failed",
    subtext: "Something went wrong. Please try again.",
  },
};

export function PaymentLoading({ stage, message }: PaymentLoadingProps) {
  const config = STAGES[stage];
  const Icon = config.icon;

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center ${
            stage === "success"
              ? "bg-green-500/10 text-green-500"
              : stage === "error"
                ? "bg-red-500/10 text-red-500"
                : "bg-primary/10 text-primary"
          }`}
        >
          <Icon
            className={`w-8 h-8 ${stage !== "success" && stage !== "error" ? "animate-spin" : ""}`}
          />
        </div>
        {(stage === "processing" || stage === "verifying" || stage === "confirming") && (
          <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-primary/20 animate-ping" />
        )}
      </div>

      <div className="text-center space-y-2">
        <h3 className="font-display text-lg tracking-wider uppercase">{config.label}</h3>
        <p className="text-sm text-muted-foreground">{message || config.subtext}</p>
      </div>

      {(stage === "processing" || stage === "verifying" || stage === "confirming") && (
        <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary animate-[loading_2s_ease-in-out_infinite]" />
        </div>
      )}
    </div>
  );
}
