"use client";

import { useRouter } from "next/navigation";

interface Player {
  _id: string;
  name: string;
  position: string;
  score: number;
}

export default function PlayerRankingTable({ players }: { players: Player[] }) {
  const router = useRouter();

  return (
    <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900/40 shadow-xl backdrop-blur">
      <table className="min-w-full table-fixed text-xs text-slate-200 sm:text-sm">
        <thead className="bg-slate-900/80">
          <tr>
            <th className="px-4 py-4 text-left text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-slate-500 sm:px-6 sm:text-xs">
              Rank
            </th>
            <th className="px-4 py-4 text-left text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-slate-500 sm:px-6 sm:text-xs">
              Name
            </th>
            <th className="px-4 py-4 text-left text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-slate-500 sm:px-6 sm:text-xs">
              Position
            </th>
            <th className="px-4 py-4 text-right text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-slate-500 sm:px-6 sm:text-xs">
              Score
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {players.map((player, index) => (
            <tr
              key={player._id}
              onClick={() => router.push(`/player/${player._id}`)}
              className="cursor-pointer bg-slate-900/30 transition hover:bg-slate-800/40"
            >
              <td className="px-4 py-3 text-sm font-semibold text-sky-300 sm:px-6 sm:py-4 sm:text-base">
                {String(index + 1).padStart(2, "0")}
              </td>
              <td className="px-4 py-3 text-sm font-medium text-slate-100 sm:px-6 sm:py-4 sm:text-base">
                {player.name}
              </td>
              <td className="px-4 py-3 text-xs text-slate-400 sm:px-6 sm:py-4 sm:text-sm">
                {player.position}
              </td>
              <td className="px-4 py-3 text-right text-sm font-semibold text-slate-100 sm:px-6 sm:py-4 sm:text-base">
                {player.score.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
