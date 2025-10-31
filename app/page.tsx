"use client";

import { useEffect, useState } from "react";
import PlayerRankingTable from "./components/PlayerRankingTable";

const POSITIONS = [
  "Setter",
  "Outside Hitter",
  "Middle Blocker",
  "Libero",
  "Opposite Hitter",
];

interface Player {
  _id: string;
  name: string;
  position: string;
  score: number;
}

export default function PositionRankingsPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<string>("Setter");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRankings = async (position: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/rankings/${position}`);
      if (!res.ok) throw new Error(`Failed to fetch data for ${position}`);
      const data = await res.json();
      //console.log(data)
      setPlayers(data);
    } catch (err: any) {
      setError(err.message);
      setPlayers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRankings(selectedPosition);
  }, [selectedPosition]);

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16">
        <div className="space-y-10">
          <header className="text-center">
            <p className="text-[0.6rem] uppercase tracking-[0.4em] text-slate-200 sm:text-xs">
              Obed Rankings
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">
              Volleyball 
            </h1>
            <p className="mt-3 text-sm text-slate-400 sm:text-base">
              Explore how each position stacks up across the league.
            </p>
          </header>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-2xl backdrop-blur sm:p-6">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {POSITIONS.map((pos) => {
                const isSelected = pos === selectedPosition;
                return (
                  <button
                    key={pos}
                    onClick={() => setSelectedPosition(pos)}
                    className={`relative overflow-hidden rounded-full border px-4 py-1.5 text-[0.65rem] font-medium uppercase tracking-wide transition sm:px-6 sm:py-2 sm:text-sm ${
                      isSelected
                        ? "border-sky-400/60 bg-gradient-to-r from-sky-500/30 via-cyan-400/20 to-indigo-500/30 text-slate-100 shadow-lg shadow-sky-500/10"
                        : "border-slate-700/70 bg-slate-900/40 text-slate-400 hover:border-slate-600 hover:text-slate-200"
                    }`}
                  >
                    <span
                      className={`absolute inset-y-0 left-0 w-1 rounded-full ${
                        isSelected
                          ? "bg-gradient-to-b from-sky-400 via-cyan-300 to-indigo-400"
                          : "bg-slate-800"
                      }`}
                    />
                    <span className="pl-4">{pos}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 sm:mt-10">
              {loading && (
                <div className="flex justify-center">
                  <span className="relative inline-flex h-9 w-9 items-center justify-center sm:h-10 sm:w-10">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400/40" />
                    <span className="relative inline-flex h-5 w-5 rounded-full bg-sky-400/70 sm:h-6 sm:w-6" />
                  </span>
                </div>
              )}

              {error && (
                <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-center text-sm text-red-200 sm:px-5">
                  {error}
                </div>
              )}

              {!loading && !error && (
                <div className="mx-auto w-[95%] rounded-xl border border-slate-800 bg-slate-900/50 p-3 shadow-inner sm:w-full sm:p-4">
                  <PlayerRankingTable players={players} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
