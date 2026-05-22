import { X, Facebook, Twitter, Link as LinkIcon, MessageCircle } from "lucide-react";
import { useState } from "react";

export function ShareModal({
  onClose,
  title,
  url,
}: {
  onClose: () => void;
  title: string;
  url: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    },
  ];

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
        <div className="overline text-primary">Share This Vehicle</div>
        <h3 className="mt-2 font-display text-3xl tracking-wider">{title}</h3>

        <div className="mt-8 space-y-3">
          {shareLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-12 border border-border hover:border-primary flex items-center justify-center gap-3 font-mono uppercase tracking-widest text-sm transition-all group"
            >
              <link.icon className="w-4 h-4" />
              {link.name}
            </a>
          ))}
        </div>

        <div className="mt-6">
          <div className="overline text-[10px] text-muted-foreground mb-2">Copy Link</div>
          <div className="flex gap-2">
            <input
              type="text"
              value={url}
              readOnly
              className="flex-1 h-12 px-4 bg-surface border border-border font-mono text-sm text-muted-foreground"
            />
            <button
              onClick={handleCopy}
              className="h-12 px-6 bg-primary text-primary-foreground font-mono uppercase tracking-widest text-xs transition-all hover:bg-primary-dim"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
