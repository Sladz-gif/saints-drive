import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Share2,
  Bookmark,
  Clock,
  User,
  ChevronLeft,
  Instagram,
  Twitter,
  MessageCircle,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { BLOG_POSTS } from "@/data/mock-data";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPost,
  loader: ({ params }) => {
    const p = BLOG_POSTS.find((b) => b.slug === params.slug);
    if (!p) throw notFound();
    return p;
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container-x py-32 text-center">
        <h1 className="font-display text-5xl tracking-wider uppercase">POST NOT FOUND</h1>
        <Link
          to="/blog"
          className="text-primary mt-6 inline-block font-mono uppercase tracking-widest text-xs"
        >
          ← Back to Journal
        </Link>
      </div>
    </SiteLayout>
  ),
});

function BlogPost() {
  const p = Route.useLoaderData();
  const related = BLOG_POSTS.filter((x) => x.id !== p.id).slice(0, 2);

  return (
    <SiteLayout transparentNav>
      <article className="pb-24">
        {/* HEADER */}
        <header className="relative h-[70vh] min-h-[500px] overflow-hidden">
          <img
            src={p.image}
            alt={p.title}
            className="absolute inset-0 w-full h-full object-cover animate-ken-burns"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

          <div className="relative container-x h-full flex flex-col justify-end pb-16">
            <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-primary text-primary-foreground text-[10px] font-mono uppercase tracking-widest border border-primary/20">
                  {p.category}
                </span>
                <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest flex items-center gap-2">
                  <Clock className="w-3 h-3" /> {p.readTime}
                </span>
              </div>
              <h1 className="font-display text-6xl md:text-8xl tracking-wider uppercase leading-[0.9] text-white">
                {p.title}
              </h1>
            </div>
          </div>
        </header>

        <div className="container-x mt-12 grid lg:grid-cols-[1fr_300px] gap-16">
          {/* MAIN CONTENT */}
          <div className="max-w-3xl">
            <div className="flex items-center justify-between py-8 border-y border-border mb-12">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground font-mono text-sm">
                  {p.author.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-white">
                    {p.author}
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1">
                    {p.date}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <button className="hover:text-primary transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="hover:text-primary transition-colors">
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              className="prose prose-invert prose-lg max-w-none font-body text-foreground/85 leading-relaxed space-y-8"
              dangerouslySetInnerHTML={{
                __html:
                  p.content ||
                  `
              <p className="text-xl text-white font-medium leading-relaxed italic border-l-4 border-primary pl-8 py-2">
                ${p.excerpt}
              </p>
              
              <p>
                The Ghanaian automotive market is unique, shaped by climate, infrastructure, and a growing middle class with a taste for luxury. Navigating this landscape requires more than just a budget; it requires a deep understanding of maintenance ecosystems and resale resilience.
              </p>

              <h2 className="font-display text-4xl tracking-wider text-white uppercase mt-16 mb-6">THE LANDSCAPE OF PERFORMANCE</h2>
              <p>
                Whether you're looking at a brand-new showroom piece or a carefully vetted foreign-used import, the priority remains the same: reliability. We've spent months tracking the performance of the most popular luxury brands on Accra's streets, measuring everything from suspension longevity to fuel tolerance.
              </p>

              <div className="my-16 aspect-[16/9] bg-card border border-border overflow-hidden relative group">
                <img src="${p.image}" alt="" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" />
                <div className="absolute inset-0 flex items-center justify-center p-12 text-center pointer-events-none">
                  <div className="font-display text-4xl tracking-[0.2em] text-white opacity-0 group-hover:opacity-100 transition-opacity">EDITORIAL EXCLUSIVE</div>
                </div>
              </div>

              <h2 className="font-display text-4xl tracking-wider text-white uppercase mt-16 mb-6">MAINTENANCE MATTERS</h2>
              <p>
                In a country where parts can sometimes take weeks to arrive, being aligned with a brand that has a strong local footprint is essential. Our data shows that brands like BMW and Mercedes-Benz continue to dominate due to the extensive network of certified independent mechanics and available spare parts.
              </p>

              <blockquote className="bg-surface border border-border p-10 text-center my-16">
                <div className="font-display text-3xl tracking-wider text-white uppercase mb-4">"Performance is not just about speed; it's about the confidence to drive anywhere, anytime."</div>
                <div className="text-xs font-mono uppercase tracking-widest text-primary">— SAINTS EDITORIAL BOARD</div>
              </blockquote>

              <p>
                As we move towards a more sustainable future, we're also seeing an uptick in interest for hybrid and electric performance. While the infrastructure is still in its infancy, the early adopters are already reaping the benefits of lower operational costs.
              </p>
            `,
              }}
            />

            {/* AUTHOR BOX */}
            <div className="mt-24 p-12 bg-card border border-border flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
              <div className="h-24 w-24 rounded-full bg-surface border border-border flex items-center justify-center text-primary font-display text-3xl">
                {p.author.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="overline text-primary mb-2">About the Author</div>
                <h4 className="font-display text-3xl tracking-wider uppercase mb-3">{p.author}</h4>
                <p className="text-sm text-muted-foreground font-body leading-relaxed mb-6">
                  Senior automotive analyst with over a decade of experience in the West African
                  market. Specializing in luxury performance and regional market trends.
                </p>
                <div className="flex justify-center md:justify-start gap-4 text-muted-foreground">
                  <Instagram className="w-4 h-4 hover:text-white cursor-pointer" />
                  <Twitter className="w-4 h-4 hover:text-white cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-12">
            <div>
              <h3 className="font-display text-xl tracking-wider uppercase mb-6 hairline-b pb-4">
                Trending Stories
              </h3>
              <div className="space-y-8">
                {related.map((r, i) => (
                  <Link key={i} to="/blog/$slug" params={{ slug: r.slug }} className="group block">
                    <div className="aspect-[16/10] bg-card border border-border overflow-hidden mb-4">
                      <img
                        src={r.image}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-primary mb-2">
                      {r.category}
                    </div>
                    <h4 className="font-display text-lg tracking-wider uppercase group-hover:text-primary transition-colors line-clamp-2">
                      {r.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 p-8">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="font-display text-2xl tracking-wider uppercase mb-4">
                The Conversation
              </h3>
              <p className="text-xs text-muted-foreground font-body leading-relaxed mb-8">
                Join our exclusive community of automotive enthusiasts. Get early access to research
                and reports.
              </p>
              <button className="w-full h-12 bg-primary text-primary-foreground font-mono uppercase tracking-widest text-[10px] shadow-[0_0_20px_rgba(232,93,4,0.1)]">
                Join Member Hub
              </button>
            </div>
          </aside>
        </div>
      </article>

      {/* FOOTER NAV */}
      <div className="container-x hairline-t pt-12 flex justify-between items-center">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-white transition-all"
        >
          <ChevronLeft className="w-4 h-4" /> All Stories
        </Link>
        <div className="flex gap-4">
          <button className="h-10 w-10 border border-border hover:border-primary flex items-center justify-center transition-colors">
            <Instagram className="w-4 h-4" />
          </button>
          <button className="h-10 w-10 border border-border hover:border-primary flex items-center justify-center transition-colors">
            <Twitter className="w-4 h-4" />
          </button>
        </div>
      </div>
    </SiteLayout>
  );
}
