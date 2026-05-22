import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { BLOG_POSTS } from "@/lib/mock-data";

export const Route = createFileRoute("/blog")({ component: BlogPage });

const CATEGORIES = ["All", "Buyer Guides", "History", "Reviews", "Ghana"];

function BlogPage() {
  const [cat, setCat] = useState("All");
  const posts = cat === "All" ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === cat);
  return (
    <SiteLayout>
      <div className="container-x py-16">
        <div className="overline">The Journal</div>
        <h1 className="font-display text-6xl md:text-7xl tracking-wider mt-2">STORIES & GUIDES</h1>

        <div className="mt-10 flex gap-2 overflow-x-auto">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`h-9 px-4 border text-xs font-mono uppercase tracking-wider ${cat === c ? "bg-primary border-primary text-primary-foreground" : "border-border hover:border-foreground"}`}>{c}</button>
          ))}
        </div>

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <Link key={p.id} to="/blog/$slug" params={{ slug: p.slug }} className="block bg-card border border-border hover-lift">
              <div className="aspect-[16/10] overflow-hidden"><img src={p.image} alt={p.title} className="w-full h-full object-cover" /></div>
              <div className="p-5">
                <div className="overline text-primary">{p.category}</div>
                <h3 className="font-display text-xl tracking-wide mt-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{p.excerpt}</p>
                <div className="mt-4 text-xs text-muted-foreground font-mono">{p.author} · {p.date} · {p.readTime}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
