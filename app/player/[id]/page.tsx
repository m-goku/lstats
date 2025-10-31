"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";

interface Player {
  _id: string;
  name: string;
  position: string;
  category: string;
  gamesPlayed: number;
  setsPlayed: number;
  pointsContributed: number;
  gameerrors: number;
  overallEfficiency: number;
  [key: string]: any;
}

export default function PlayerDetailsPage() {
  const { id } = useParams();
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPlayer = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/players/${id}`,
          { cache: "no-store" }
        );

        if (!res.ok) {
          setError("Player not found");
          return;
        }

        const data = await res.json();
        setPlayer(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load player data");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [id]);

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
        <div className="text-center">
          <div className="relative inline-flex items-center justify-center">
            <span className="absolute inline-flex h-16 w-16 animate-ping rounded-full bg-sky-400/20 sm:h-20 sm:w-20" />
            <span className="relative inline-flex h-10 w-10 animate-spin rounded-full border-2 border-sky-400/70 border-t-transparent sm:h-12 sm:w-12" />
          </div>
          <p className="mt-6 text-[0.65rem] uppercase tracking-[0.4em] text-slate-500 sm:text-xs">
            Fetching Player
          </p>
        </div>
      </div>
    );
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!player) return notFound();
  console.log("PLAYER DATA:", player);

  const key =
    player.position
      .split(" ")
      .map((word, index) =>
        index === 0
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join("") + "Stats";

  const positionStats = player[key];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-2xl backdrop-blur">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400" />

          <div className="space-y-10 p-6 sm:p-8 md:p-12">
            <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="space-y-3">
                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                  {player.name}
                </h1>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 sm:gap-3 sm:text-sm">
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-700/60 bg-slate-800/60 px-3 py-1 uppercase tracking-wide sm:px-4 sm:py-1.5">
                    <span className="h-2 w-2 rounded-full bg-sky-400" />
                    {player.position}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-700/60 bg-slate-800/60 px-3 py-1 uppercase tracking-wide sm:px-4 sm:py-1.5">
                    <span className="h-2 w-2 rounded-full bg-indigo-400" />
                    {player.category}
                  </span>
                </div>
              </div>
              <div className="text-right text-xs text-slate-400 sm:text-sm">
                <p className="font-semibold text-slate-200">Overall Efficiency</p>
                <p className="text-2xl font-semibold text-sky-300 sm:text-3xl">
                  {player.overallEfficiency}
                </p>
              </div>
            </header>

            <section>
              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-semibold tracking-tight text-slate-200 sm:text-xl">
                  General Stats
                </h2>
                <span className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500 sm:text-xs">
                  Match Overview
                </span>
              </div>
              <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40">
                <div className="overflow-x-auto">
                  <table className="min-w-full table-fixed text-xs text-slate-200 sm:text-sm">
                    <tbody className="divide-y divide-slate-800">
                      <tr className="transition hover:bg-slate-800/40">
                        <td className="w-1/2 px-4 py-3 font-medium text-slate-300 sm:px-5 sm:py-4">
                          Games Played
                        </td>
                        <td className="px-4 py-3 text-right text-slate-100 sm:px-5 sm:py-4">
                          {player.gamesPlayed}
                        </td>
                      </tr>
                      <tr className="transition hover:bg-slate-800/40">
                        <td className="px-4 py-3 font-medium text-slate-300 sm:px-5 sm:py-4">
                          Sets Played
                        </td>
                        <td className="px-4 py-3 text-right text-slate-100 sm:px-5 sm:py-4">
                          {player.setsPlayed}
                        </td>
                      </tr>
                      <tr className="transition hover:bg-slate-800/40">
                        <td className="px-4 py-3 font-medium text-slate-300 sm:px-5 sm:py-4">
                          Points Contributed
                        </td>
                        <td className="px-4 py-3 text-right text-slate-100 sm:px-5 sm:py-4">
                          {player.pointsContributed}
                        </td>
                      </tr>
                      <tr className="transition hover:bg-slate-800/40">
                        <td className="px-4 py-3 font-medium text-slate-300 sm:px-5 sm:py-4">
                          Errors
                        </td>
                        <td className="px-4 py-3 text-right text-slate-100 sm:px-5 sm:py-4">
                          {player.gameerrors}
                        </td>
                      </tr>
                      <tr className="transition hover:bg-slate-800/40">
                        <td className="px-4 py-3 font-medium text-slate-300 sm:px-5 sm:py-4">
                          Overall Efficiency
                        </td>
                        <td className="px-4 py-3 text-right text-slate-100 sm:px-5 sm:py-4">
                          {player.overallEfficiency}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {positionStats && (
              <section>
                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-lg font-semibold tracking-tight text-slate-200 sm:text-xl">
                    Position-Specific Stats
                  </h2>
                  <span className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-500 sm:text-xs">
                    Performance Detail
                  </span>
                </div>
                <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40">
                  <div className="overflow-x-auto">
                    <table className="min-w-full table-fixed text-xs text-slate-200 sm:text-sm">
                      <tbody className="divide-y divide-slate-800">
                        {Object.entries(positionStats).map(([key, value]) => (
                          <tr key={key} className="transition hover:bg-slate-800/40">
                            <td className="w-1/2 px-4 py-3 font-medium capitalize text-slate-300 sm:px-5 sm:py-4">
                              {key}
                            </td>
                            <td className="px-4 py-3 text-right text-slate-100 sm:px-5 sm:py-4">
                              {String(value)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
