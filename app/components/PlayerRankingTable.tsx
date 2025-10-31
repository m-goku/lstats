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
    <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200">
      <table className="min-w-full bg-white text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">
              Rank
            </th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">
              Name
            </th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">
              Position
            </th>
            <th className="px-4 py-3 text-right font-semibold text-gray-700">
              Score
            </th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr
              key={player._id}
              onClick={() => router.push(`/player/${player._id}`)} // ✅ use correct route & router
              className="hover:bg-blue-50 transition-colors cursor-pointer"
            >
              <td className="px-4 py-3">{index + 1}</td>
              <td className="px-4 py-3 font-medium">{player.name}</td>
              <td className="px-4 py-3">{player.position}</td>
              <td className="px-4 py-3 text-right text-gray-800 font-semibold">
                {player.score.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
