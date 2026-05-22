import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Car,
  Zap,
  History,
  TrendingUp,
  Shield,
  Award,
  Battery,
  Building,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { vaultData, VaultSection } from "@/data/vault";

export const Route = createFileRoute("/vault")({ component: VaultPage });

function VaultPage() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["executive-summary"]),
  );

  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSections(newExpanded);
  };

  const getSectionIcon = (id: string) => {
    switch (id) {
      case "global-brands":
        return Car;
      case "brand-origins":
        return History;
      case "iconic-cars":
        return Award;
      case "technical-specs":
        return Zap;
      case "innovation-timeline":
        return TrendingUp;
      case "market-segments":
        return TrendingUp;
      case "regulations":
        return Shield;
      case "designers-engineers":
        return Award;
      case "ev-landscape":
        return Battery;
      case "preservation":
        return Building;
      default:
        return BookOpen;
    }
  };

  return (
    <SiteLayout>
      <div className="container-x py-12 sm:py-16">
        <div className="overline">The Vault</div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wider mt-2">
          AUTOMOTIVE KNOWLEDGE
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl text-sm sm:text-base">
          A comprehensive archive of global automotive history, technology, and industry insights.
        </p>
      </div>

      <div className="container-x pb-20 space-y-4">
        {vaultData.map((section) => {
          const Icon = getSectionIcon(section.id);
          const isExpanded = expandedSections.has(section.id);

          return (
            <div key={section.id} className="bg-card border border-border overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-surface transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Icon className="w-5 h-5 text-primary" />
                  <h2 className="font-display text-xl tracking-wider">{section.title}</h2>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                )}
              </button>

              {isExpanded && (
                <div className="px-6 pb-6 border-t border-border">
                  <div className="pt-4 space-y-4">
                    <p className="text-muted-foreground leading-relaxed">{section.content}</p>

                    {section.subsections &&
                      section.subsections.map((subsection) => (
                        <div key={subsection.id} className="mt-6 pl-4 border-l-2 border-border">
                          <h3 className="font-display text-lg tracking-wider text-primary mb-2">
                            {subsection.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed mb-4">
                            {subsection.content}
                          </p>

                          {subsection.table && (
                            <div className="overflow-x-auto">
                              <table className="w-full text-xs sm:text-sm">
                                <thead>
                                  <tr className="border-b border-border">
                                    {subsection.table.headers.map((header, i) => (
                                      <th key={i} className="text-left py-1.5 sm:py-2 px-2 sm:px-3 font-medium">
                                        {header}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {subsection.table.rows.map((row, i) => (
                                    <tr key={i} className="border-b border-border last:border-0">
                                      {row.map((cell, j) => (
                                        <td key={j} className="py-1.5 sm:py-2 px-2 sm:px-3 text-muted-foreground">
                                          {cell}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </SiteLayout>
  );
}
