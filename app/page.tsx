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
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Volleyball Player Rankings
      </h1>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {POSITIONS.map((pos) => (
          <button
            key={pos}
            onClick={() => setSelectedPosition(pos)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
              pos === selectedPosition
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {pos}
          </button>
        ))}
      </div>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        // <table className="w-full border-collapse border border-gray-200 text-sm">
        //   <thead className="bg-gray-100">
        //     <tr>
        //       <th className="border border-gray-200 p-2">Rank</th>
        //       <th className="border border-gray-200 p-2">Name</th>
        //       <th className="border border-gray-200 p-2">Position</th>
        //       <th className="border border-gray-200 p-2">Score</th>
        //     </tr>
        //   </thead>
        //   <tbody>
        //     {players.length === 0 ? (
        //       <tr>
        //         <td
        //           colSpan={4}
        //           className="text-center text-gray-400 p-4 italic"
        //         >
        //           No players found for {selectedPosition}.
        //         </td>
        //       </tr>
        //     ) : (
        //       players.map((player, index) => (
        //         <tr
        //           key={player?.name}
        //           className="hover:bg-gray-50 transition-colors"
        //         >
        //           <td className="border border-gray-200 p-2 text-center">
        //             {index + 1}
        //           </td>
        //           <td className="border border-gray-200 p-2">{player.name}</td>
        //           <td className="border border-gray-200 p-2 text-center">
        //             {player?.position}
        //           </td>
        //           <td className="border border-gray-200 p-2 text-center font-semibold">
        //             {player?.score}
        //           </td>
        //         </tr>
        //       ))
        //     )}
        //   </tbody>
        // </table>
        <PlayerRankingTable players={players} />
      )}
    </div>
  );
}
