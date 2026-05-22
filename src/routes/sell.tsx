import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Upload, Check } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/sell")({ component: SellPage });

const STEPS = ["Basics", "Specs", "Features", "Photos", "Pricing", "Review"];

function SellPage() {
  const [step, setStep] = useState(0);

  return (
    <SiteLayout>
      <div className="container-x py-12">
        <div className="overline">List Your Vehicle</div>
        <h1 className="font-display text-5xl tracking-wider mt-2">SELL YOUR CAR</h1>

        <div className="mt-10 flex items-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex-1 flex items-center gap-2">
              <div className={`h-9 w-9 inline-flex items-center justify-center text-xs font-mono ${i === step ? "bg-primary text-primary-foreground" : i < step ? "bg-success/20 text-success" : "bg-card border border-border text-muted-foreground"}`}>
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <div className={`text-xs font-mono uppercase tracking-wider hidden md:block ${i === step ? "text-foreground" : "text-muted-foreground"}`}>{s}</div>
              {i < STEPS.length - 1 && <div className={`flex-1 h-px ${i < step ? "bg-success" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        <div className="mt-10 bg-card border border-border p-8 min-h-[420px]">
          {step === 0 && <FormGrid fields={[["Brand", "select"], ["Model", "text"], ["Year", "number"], ["Body Type", "select"]]} />}
          {step === 1 && <FormGrid fields={[["Mileage (km)", "number"], ["Fuel Type", "select"], ["Transmission", "select"], ["Drive", "select"]]} />}
          {step === 2 && (
            <div>
              <div className="overline mb-4">Features</div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["Leather", "Sunroof", "Camera", "Apple CarPlay", "Heated Seats", "Adaptive Cruise", "Lane Assist", "Wireless Charging", "Navigation"].map((f) => (
                  <label key={f} className="flex items-center gap-2 p-3 border border-border hover:border-primary cursor-pointer">
                    <input type="checkbox" className="accent-primary" /> {f}
                  </label>
                ))}
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <div className="overline mb-4">Upload at least 5 photos</div>
              <div className="border-2 border-dashed border-border p-16 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <div className="font-display text-2xl tracking-wider">DROP PHOTOS HERE</div>
                <div className="text-sm text-muted-foreground mt-2">or click to upload (min 5)</div>
              </div>
            </div>
          )}
          {step === 4 && <FormGrid fields={[["Asking Price (GHS)", "number"], ["Negotiable?", "select"], ["Phone", "tel"], ["Location", "text"]]} />}
          {step === 5 && (
            <div>
              <div className="overline mb-4">Review & Submit</div>
              <p className="text-muted-foreground">Confirm your listing details. Our team reviews within 24 hours.</p>
              <button className="mt-6 h-12 px-8 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-sm">Submit Listing</button>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-between">
          <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="h-11 px-6 border border-border disabled:opacity-30 font-mono uppercase tracking-wider text-xs">← Back</button>
          {step < STEPS.length - 1 && <button onClick={() => setStep((s) => s + 1)} className="h-11 px-6 bg-primary text-primary-foreground font-mono uppercase tracking-wider text-xs">Continue →</button>}
        </div>
      </div>
    </SiteLayout>
  );
}

function FormGrid({ fields }: { fields: [string, string][] }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {fields.map(([label, type]) => (
        <div key={label}>
          <div className="overline mb-2">{label}</div>
          {type === "select" ? (
            <select className="w-full h-11 px-3 bg-background border border-border text-sm"><option>Select...</option></select>
          ) : (
            <input type={type} className="w-full h-11 px-3 bg-background border border-border text-sm" />
          )}
        </div>
      ))}
    </div>
  );
}
