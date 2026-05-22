import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { BLOG_POSTS } from "@/lib/mock-data";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPost,
  loader: ({ params }) => {
    const p = BLOG_POSTS.find((b) => b.slug === params.slug);
    if (!p) throw notFound();
    return p;
  },
  notFoundComponent: () => (<SiteLayout><div className="container-x py-32 text-center"><h1 className="font-display text-5xl">POST NOT FOUND</h1></div></SiteLayout>),
});

function BlogPost() {
  const p = Route.useLoaderData();
  return (
    <SiteLayout>
      <article>
        <div className="aspect-[21/9] overflow-hidden bg-card">
          <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
        </div>
        <div className="container-x max-w-3xl py-16">
          <Link to="/blog" className="text-xs font-mono text-muted-foreground hover:text-primary">← BACK TO JOURNAL</Link>
          <div className="overline text-primary mt-6">{p.category}</div>
          <h1 className="font-display text-5xl md:text-6xl tracking-wider mt-3 leading-[1]">{p.title}</h1>
          <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground hairline-b pb-6">
            <div className="h-10 w-10 rounded-full bg-card border border-border" />
            <div>
              <div className="font-medium text-foreground">{p.author}</div>
              <div className="text-xs font-mono">{p.date} · {p.readTime}</div>
            </div>
          </div>
          <div className="mt-8 text-lg text-foreground/85 leading-relaxed space-y-5">
            <p>{p.excerpt}</p>
            <p>If you've been searching for a car that can do real work on Accra streets without bleeding you dry at the pump, this is the guide.</p>
            <p>We tested fuel efficiency, parts availability, comfort over potholes, and resale resilience. Some surprises in here — others, exactly what you'd expect.</p>
            <h2 className="font-display text-3xl tracking-wider mt-10">What we measured</h2>
            <p>Real-world consumption (not factory claims), part costs at major Accra dealers, and dealer-network density nationwide.</p>
            <div className="my-10 p-6 bg-card border border-border text-center">
              <div className="overline">Sponsored</div>
              <div className="font-display text-2xl tracking-wider mt-1">YOUR AD COULD LIVE HERE</div>
            </div>
            <p>Bottom line: the best car for Uber/Bolt in Ghana isn't always the cheapest one. It's the one with the lowest cost-per-kilometer over three years.</p>
          </div>
        </div>
      </article>
    </SiteLayout>
  );
}
