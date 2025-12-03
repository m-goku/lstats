"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Player {
  _id: string;
  name: string;
  position: string;
  category: string;
  overallEfficiency: number;
}

export default function PlayersListPage() {
  const router = useRouter();
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchPlayers = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/players`,
        { cache: "no-store" }
      );

      if (!res.ok) throw new Error("Failed to load players");

      const data = await res.json();
      setPlayers(data);
    } catch (err) {
      setError("Failed to fetch players");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const deletePlayer = async (id: string) => {
    const confirmed = window.confirm("Delete this player permanently?");
    if (!confirmed) return;

    try {
      setDeletingId(id);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/players/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Failed to delete player");

      // Refresh list
      setPlayers(players.filter((p) => p._id !== id));
    } catch (err) {
      alert("Unable to delete player.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="relative inline-flex items-center justify-center">
          <span className="absolute inline-flex h-16 w-16 animate-ping rounded-full bg-sky-400/20" />
          <span className="relative inline-flex h-10 w-10 animate-spin rounded-full border-2 border-sky-400/70 border-t-transparent" />
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-slate-950 p-8 text-center text-red-500">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-2xl backdrop-blur">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400" />

          <div className="space-y-10 p-6 sm:p-8 md:p-12">
            <header className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                All Players
              </h1>
              <span className="text-xs text-slate-400">
                Total: {players.length}
              </span>
            </header>

            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40">
              <table className="min-w-full text-sm text-slate-200">
                <tbody className="divide-y divide-slate-800">
                  {players.map((player) => (
                    <tr
                      key={player._id}
                      className="transition hover:bg-slate-800/40 cursor-pointer"
                      onClick={() => router.push(`/player/${player._id}`)}
                    >
                      <td className="px-4 py-4 font-medium text-slate-100">
                        {player.name}
                      </td>

                      <td className="px-4 py-4 text-slate-300 text-right">
                        {player.position}
                      </td>

                      <td className="px-4 py-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // prevents row click navigation
                            deletePlayer(player._id);
                          }}
                          className="rounded-md border border-red-900/60 bg-red-900/30 px-3 py-1.5 text-xs text-red-300 transition hover:bg-red-900/60 hover:text-red-100 disabled:opacity-50"
                          disabled={deletingId === player._id}
                        >
                          {deletingId === player._id ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))}

                  {players.length === 0 && (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-4 py-6 text-center text-slate-500"
                      >
                        No players found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
