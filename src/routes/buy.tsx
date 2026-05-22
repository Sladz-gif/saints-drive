import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Grid3x3, List } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { VehicleCard } from "@/components/VehicleCard";
import { VEHICLES, BRANDS } from "@/data/mock-data";

export const Route = createFileRoute("/buy")({
  component: BuyPage,
});

function BuyPage() {
  const [q, setQ] = useState("");
  const [body, setBody] = useState<string>("");
  const [fuel, setFuel] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [sort, setSort] = useState("newest");
  const [view, setView] = useState<"grid" | "list">("grid");

  const [mileage, setMileage] = useState<string>("");
  const [transmission, setTransmission] = useState<string>("");
  const [drive, setDrive] = useState<string>("");
  const [condition, setCondition] = useState<string>("");

  const filtered = useMemo(() => {
    let r = VEHICLES.filter(
      (v) =>
        (!q || v.title.toLowerCase().includes(q.toLowerCase())) &&
        (!body || v.body === body) &&
        (!fuel || v.fuel === fuel) &&
        (!brand || v.brand === brand) &&
        (!transmission || v.transmission === transmission) &&
        (!drive || v.drive === drive) &&
        (!condition || v.condition === condition),
    );
    if (sort === "price-low") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "price-high") r = [...r].sort((a, b) => b.price - a.price);
    return r;
  }, [q, body, fuel, brand, transmission, drive, condition, sort]);

  return (
    <SiteLayout>
      <div className="bg-surface hairline-b overflow-x-hidden">
        <div className="container-x py-12 sm:py-16">
          <div className="overline">Marketplace</div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wider mt-2">BUY A CAR</h1>
          <p className="text-muted-foreground mt-3 max-w-xl text-sm sm:text-base">
            {VEHICLES.length} verified vehicles across Ghana. Inspect, reserve, drive home.
          </p>
        </div>
      </div>

      <div className="container-x py-8 sm:py-12 grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-10">
        {/* Filters */}
        <aside className="space-y-6 lg:order-1 order-2 lg:block hidden">
          <div className="flex items-center gap-2 overline">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
          </div>
          <FilterGroup label="Search">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Model, brand..."
                className="w-full h-10 pl-10 pr-3 bg-card border border-border focus:border-primary outline-none text-sm"
              />
            </div>
          </FilterGroup>
          <FilterGroup label="Brand">
            <Select value={brand} onChange={setBrand} options={["", ...BRANDS]} />
          </FilterGroup>
          <FilterGroup label="Body Type">
            <Select
              value={body}
              onChange={setBody}
              options={["", "Sedan", "SUV", "Coupe", "Pickup", "Hatchback", "Van"]}
            />
          </FilterGroup>
          <FilterGroup label="Fuel">
            <Select
              value={fuel}
              onChange={setFuel}
              options={["", "Petrol", "Diesel", "Hybrid", "Electric"]}
            />
          </FilterGroup>
          <FilterGroup label="Transmission">
            <Select
              value={transmission}
              onChange={setTransmission}
              options={["", "Automatic", "Manual"]}
            />
          </FilterGroup>
          <FilterGroup label="Drive Type">
            <Select value={drive} onChange={setDrive} options={["", "FWD", "RWD", "AWD", "4WD"]} />
          </FilterGroup>
          <FilterGroup label="Condition">
            <Select
              value={condition}
              onChange={setCondition}
              options={["", "Brand New", "Foreign Used", "Ghana Used"]}
            />
          </FilterGroup>
          <div className="pt-4 space-y-3">
            <button className="w-full h-11 bg-primary hover:bg-primary-dim text-primary-foreground font-mono uppercase tracking-wider text-sm transition-colors">
              Apply Filters
            </button>
            <button
              onClick={() => {
                setQ("");
                setBrand("");
                setBody("");
                setFuel("");
                setTransmission("");
                setDrive("");
                setCondition("");
              }}
              className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors font-mono uppercase tracking-widest"
            >
              Clear All
            </button>
          </div>
        </aside>

        {/* Results */}
        <div className="lg:order-2 order-1 min-w-0">
          <button className="lg:hidden mb-4 w-full h-10 bg-card border border-border text-sm font-mono uppercase tracking-widest flex items-center justify-center gap-2">
            <SlidersHorizontal className="w-4 h-4" /> Show Filters
          </button>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="text-sm text-muted-foreground">
              <span className="text-foreground font-mono">{filtered.length}</span> vehicles
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-9 px-3 bg-card border border-border text-sm flex-1 sm:flex-none"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <div className="flex border border-border">
                <button
                  onClick={() => setView("grid")}
                  className={`h-9 w-9 inline-flex items-center justify-center ${view === "grid" ? "bg-card text-primary" : "text-muted-foreground"}`}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`h-9 w-9 inline-flex items-center justify-center ${view === "list" ? "bg-card text-primary" : "text-muted-foreground"}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <div
            className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}
          >
            {filtered.map((v) => (
              <VehicleCard key={v.id} v={v} />
            ))}
          </div>
          <div className="mt-8 sm:mt-12 text-center">
            <button className="h-11 px-8 border border-border hover:border-foreground font-mono uppercase tracking-wider text-sm w-full sm:w-auto">
              Load More
            </button>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="overline mb-2">{label}</div>
      {children}
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-10 px-3 bg-card border border-border text-sm focus:border-primary outline-none"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o || "Any"}
        </option>
      ))}
    </select>
  );
}
