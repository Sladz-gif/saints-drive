import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight, Clock, User, ArrowRight, Share2, Bookmark } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { BLOG_POSTS, HERO_IMAGES } from "@/data/mock-data";

export const Route = createFileRoute("/blog")({ component: BlogPage });

const CATEGORIES = ["All", "Buyer Guides", "History", "Reviews", "Ghana", "Culture"];

function BlogPage() {
  const [cat, setCat] = useState("All");
  const filteredPosts = cat === "All" ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === cat);
  const featured = BLOG_POSTS[0];
  const posts = filteredPosts.filter((p) => p.id !== featured.id);

  return (
    <SiteLayout transparentNav>
      <section className="relative h-[60vh] min-h-[460px] overflow-hidden">
        <img
          src={HERO_IMAGES[2]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative container-x h-full flex flex-col justify-end pb-24">
          <div className="overline tracking-[0.3em] text-primary mb-4">The Journal</div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-9xl tracking-wider leading-[0.85] text-white uppercase">
            STORIES
            <br />& GUIDES.
          </h1>
          <p className="mt-6 sm:mt-8 text-base sm:text-xl text-white/70 max-w-xl font-body">
            Editorial insights into Ghana's premium automotive lifestyle.
          </p>
        </div>
      </section>

      {/* FEATURED POST */}
      <section className="bg-surface hairline-b">
        <div className="container-x py-20">
          <div className="overline text-primary mb-10">Featured Story</div>
          <Link
            to="/blog/$slug"
            params={{ slug: featured.slug }}
            className="group grid lg:grid-cols-2 bg-card border border-border overflow-hidden hover:border-primary/30 transition-all duration-500"
          >
            <div className="aspect-[16/10] lg:aspect-auto overflow-hidden">
              <img
                src={featured.image}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
            </div>
            <div className="p-10 md:p-16 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-mono uppercase tracking-widest border border-primary/20">
                  {featured.category}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                  {featured.date}
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-6xl tracking-wider uppercase leading-tight mb-6 group-hover:text-primary transition-colors">
                {featured.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed font-body mb-10 line-clamp-3">
                {featured.excerpt}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-surface border border-border flex items-center justify-center text-muted-foreground font-mono text-xs">
                    {featured.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-white">
                      {featured.author}
                    </div>
                    <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
                      {featured.readTime}
                    </div>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                  Read Article <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* CATEGORIES NAV */}
      <div className="bg-background hairline-b sticky top-16 z-40">
        <div className="container-x flex gap-2 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 sm:px-6 md:px-8 h-16 font-mono text-[10px] uppercase tracking-[0.2em] whitespace-nowrap border-b-2 transition-all ${
                cat === c
                  ? "border-primary text-primary bg-primary/5"
                  : "border-transparent text-muted-foreground hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <section className="py-24 container-x">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map((p) => (
            <Link key={p.id} to="/blog/$slug" params={{ slug: p.slug }} className="group block">
              <div className="aspect-[16/10] overflow-hidden bg-surface border border-border mb-6">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-primary text-[10px] font-mono uppercase tracking-widest">
                    {p.category}
                  </span>
                  <div className="flex items-center gap-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="hover:text-primary">
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                    <button className="hover:text-primary">
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <h3 className="font-display text-3xl tracking-wider uppercase group-hover:text-primary transition-colors line-clamp-2">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-body line-clamp-2">
                  {p.excerpt}
                </p>
                <div className="pt-4 flex items-center justify-between border-t border-border/40">
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    <User className="w-3 h-3" /> {p.author}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    <Clock className="w-3 h-3" /> {p.readTime}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="py-32 text-center bg-card border border-border">
            <h3 className="font-display text-3xl tracking-wider uppercase">NO ARTICLES FOUND</h3>
            <p className="text-muted-foreground mt-2 font-mono text-xs uppercase tracking-widest">
              Try changing your category filter.
            </p>
            <button
              onClick={() => setCat("All")}
              className="mt-8 text-primary font-mono text-xs uppercase tracking-widest hover:underline"
            >
              View All Stories
            </button>
          </div>
        )}

        <div className="mt-20 text-center">
          <button className="h-14 px-12 border border-border hover:border-primary text-foreground font-mono uppercase tracking-widest text-xs transition-all group">
            Load More Stories{" "}
            <ChevronRight className="inline-block w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-surface py-16 sm:py-20 md:py-24 hairline-t">
        <div className="container-x">
          <div className="max-w-4xl mx-auto text-center">
            <div className="overline text-primary mb-4">The Briefing</div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-wider uppercase mb-6 sm:mb-8">
              NEVER MISS A BEAT
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 font-body leading-relaxed">
              Get the latest automotive news, market trends, and exclusive auction previews
              delivered to your inbox every Friday.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="flex-1 h-12 sm:h-14 px-4 sm:px-6 bg-card border border-border focus:border-primary outline-none font-mono text-sm uppercase tracking-widest"
              />
              <button className="h-12 sm:h-14 px-6 sm:px-10 bg-primary text-primary-foreground font-mono uppercase tracking-widest text-sm transition-all shadow-[0_0_30px_rgba(232,93,4,0.2)]">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
