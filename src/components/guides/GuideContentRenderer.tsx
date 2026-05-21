"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import type { Components } from "react-markdown";

interface GuideContentRendererProps {
  contentMd: string;
}

type Segment =
  | { type: "markdown"; content: string }
  | { type: "dropcap"; content: string }
  | { type: "pullquote"; content: string };

/**
 * Pre-process content_md:
 * 1. Extract photo credits from HTML comments
 * 2. Remove HTML comments
 * 3. Split into segments: regular markdown, :::dropcap blocks, :::pullquote blocks
 */
function preprocess(md: string): {
  segments: Segment[];
  photoCredits: { author: string; license: string; url: string; source: string }[];
} {
  const creditRegex =
    /<!--\s*Source:\s*(.+?);\s*Author:\s*(.+?);\s*License:\s*(.+?);\s*URL:\s*(.+?)\s*-->/g;
  const photoCredits: { author: string; license: string; url: string; source: string }[] = [];
  let match;
  while ((match = creditRegex.exec(md)) !== null) {
    photoCredits.push({
      source: match[1].trim(),
      author: match[2].trim(),
      license: match[3].trim(),
      url: match[4].trim(),
    });
  }

  // Remove HTML comments
  let cleaned = md.replace(/<!--[\s\S]*?-->/g, "");

  // Split into segments by :::directive blocks
  const segments: Segment[] = [];
  const directiveRegex = /:::(dropcap|pullquote)\n([\s\S]*?)\n:::/g;
  let lastIndex = 0;
  let directiveMatch;

  while ((directiveMatch = directiveRegex.exec(cleaned)) !== null) {
    // Push preceding markdown
    const before = cleaned.slice(lastIndex, directiveMatch.index).trim();
    if (before) {
      segments.push({ type: "markdown", content: before });
    }
    // Push the directive
    segments.push({
      type: directiveMatch[1] as "dropcap" | "pullquote",
      content: directiveMatch[2].trim(),
    });
    lastIndex = directiveMatch.index + directiveMatch[0].length;
  }

  // Push remaining markdown
  const remaining = cleaned.slice(lastIndex).trim();
  if (remaining) {
    segments.push({ type: "markdown", content: remaining });
  }

  return { segments, photoCredits };
}

const markdownComponents: Components = {
  h2: ({ children }) => (
    <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-900 mt-12 mb-6 pb-3 border-b border-navy-100">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-display text-xl font-semibold text-navy-900 mt-8 mb-4">
      {children}
    </h3>
  ),
  p: ({ children, node }) => {
    // Check if this paragraph contains only an image
    const firstChild = node?.children?.[0];
    if (
      node?.children?.length === 1 &&
      firstChild &&
      "tagName" in firstChild &&
      firstChild.tagName === "img"
    ) {
      return <>{children}</>;
    }
    return <p className="text-navy-700 leading-relaxed mb-5">{children}</p>;
  },
  img: ({ src, alt }) => (
    <figure className="my-8">
      <img
        src={src}
        alt={alt || ""}
        className="w-full rounded-lg"
        loading="lazy"
      />
    </figure>
  ),
  em: ({ children }) => {
    // Standalone italicised caption lines (long italic text after images)
    const text = typeof children === "string" ? children : "";
    if (text.length > 40) {
      return <span className="text-sm text-navy-500 italic block -mt-4 mb-8">{children}</span>;
    }
    return <em>{children}</em>;
  },
  a: ({ href, children }) => {
    if (href?.startsWith("/")) {
      return (
        <Link href={href} className="text-navy-700 underline hover:text-navy-900">
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-navy-700 underline hover:text-navy-900">
        {children}
      </a>
    );
  },
  ul: ({ children }) => (
    <ul className="list-disc pl-6 mb-5 space-y-1.5 text-navy-700">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-6 mb-5 space-y-1.5 text-navy-700">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-navy-900">{children}</strong>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-ochre-400 pl-4 my-6 italic text-lg text-navy-600">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-8">
      <table className="min-w-full text-sm text-navy-700">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b-2 border-navy-200 text-left">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="px-3 py-2 font-semibold text-navy-900 text-sm">{children}</th>
  ),
  td: ({ children }) => (
    <td className="px-3 py-2 border-b border-navy-100">{children}</td>
  ),
  hr: () => <hr className="my-10 border-navy-100" />,
};

function MarkdownBlock({ content }: { content: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
      {content}
    </ReactMarkdown>
  );
}

function DropCap({ content }: { content: string }) {
  return (
    <div className="mb-8">
      <p className="text-lg text-navy-700 leading-relaxed first-letter:float-left first-letter:text-[3.5rem] first-letter:leading-[0.85] first-letter:font-display first-letter:font-bold first-letter:text-navy-900 first-letter:mr-2 first-letter:mt-1 sm:first-letter:text-[4.5rem]">
        {content}
      </p>
    </div>
  );
}

function PullQuote({ content }: { content: string }) {
  return (
    <aside className="my-10 sm:my-14 py-8 border-t border-b border-navy-200">
      <p className="font-display text-xl sm:text-2xl lg:text-[1.75rem] leading-snug text-navy-800 italic max-w-2xl">
        {content}
      </p>
    </aside>
  );
}

export function GuideContentRenderer({ contentMd }: GuideContentRendererProps) {
  const { segments, photoCredits } = preprocess(contentMd);

  return (
    <div>
      <div className="max-w-[680px]">
        {segments.map((seg, i) => {
          switch (seg.type) {
            case "dropcap":
              return <DropCap key={i} content={seg.content} />;
            case "pullquote":
              return <PullQuote key={i} content={seg.content} />;
            case "markdown":
              return <MarkdownBlock key={i} content={seg.content} />;
          }
        })}
      </div>

      {photoCredits.length > 0 && (
        <footer className="mt-16 pt-6 border-t border-navy-100">
          <h3 className="text-xs font-semibold text-navy-400 uppercase tracking-wider mb-3">
            Photo Credits
          </h3>
          <ul className="space-y-1">
            {photoCredits.map((credit, i) => (
              <li key={i} className="text-xs text-navy-400">
                {credit.author}
                {credit.author !== "Unknown" && ` — ${credit.license}`}
                {" via "}
                <a
                  href={credit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-navy-600"
                >
                  {credit.source}
                </a>
              </li>
            ))}
          </ul>
        </footer>
      )}
    </div>
  );
}
