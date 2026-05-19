"use client";

import { useState } from "react";
import { Languages } from "lucide-react";

interface Phrase {
  english: string;
  local: string;
  pronunciation: string;
}

interface LocalPhrasesProps {
  language: string;
  phrases: Phrase[];
}

export function LocalPhrases({ language, phrases }: LocalPhrasesProps) {
  const [revealedIdx, setRevealedIdx] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-xl border border-navy-100 overflow-hidden">
      <div className="bg-navy-50 px-5 py-3 flex items-center gap-2">
        <Languages className="w-4 h-4 text-ochre-500" />
        <h3 className="font-body font-semibold text-navy-900 text-sm">
          Useful {language} phrases
        </h3>
      </div>
      <div className="divide-y divide-navy-50">
        <div className="grid grid-cols-3 px-5 py-2 text-[10px] uppercase tracking-wide text-navy-400 font-medium">
          <span>English</span>
          <span>{language}</span>
          <span>Pronunciation</span>
        </div>
        {phrases.map((phrase, i) => (
          <button
            key={i}
            onClick={() => setRevealedIdx(revealedIdx === i ? null : i)}
            className="grid grid-cols-3 px-5 py-3 w-full text-left hover:bg-navy-50/50 transition-colors text-sm"
          >
            <span className="text-navy-700">{phrase.english}</span>
            <span className="text-navy-900 font-medium">{phrase.local}</span>
            <span
              className={`transition-opacity ${
                revealedIdx === i ? "opacity-100 text-ochre-500" : "opacity-40 text-navy-500"
              }`}
            >
              {revealedIdx === i ? phrase.pronunciation : "Tap to reveal"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
