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

  if (loading) return <div className="p-8 text-center">Loading player...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
    if (!player) return notFound();
    console.log("PLAYER DATA:", player);


  // 🧩 Position-specific stats
  
    
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
    <div className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold mb-4">{player.name}</h1>
      <p className="text-gray-600 mb-8">
        <strong>Position:</strong> {player.position} <br />
        <strong>Category:</strong> {player.category}
      </p>

      <h2 className="text-xl font-semibold mb-3">General Stats</h2>
      <table className="w-full border-collapse border border-gray-200 text-sm mb-8">
        <tbody>
          <tr>
            <td className="border p-2 font-medium">Games Played</td>
            <td className="border p-2">{player.gamesPlayed}</td>
          </tr>
          <tr>
            <td className="border p-2 font-medium">Sets Played</td>
            <td className="border p-2">{player.setsPlayed}</td>
          </tr>
          <tr>
            <td className="border p-2 font-medium">Points Contributed</td>
            <td className="border p-2">{player.pointsContributed}</td>
          </tr>
          <tr>
            <td className="border p-2 font-medium">Errors</td>
            <td className="border p-2">{player.gameerrors}</td>
          </tr>
          <tr>
            <td className="border p-2 font-medium">Overall Efficiency</td>
            <td className="border p-2">{player.overallEfficiency}</td>
          </tr>
        </tbody>
      </table>

      {/* 🧩 Position-specific stats */}
      {positionStats && (
        <div>
          <h2 className="text-xl font-semibold mb-3">
            Position-Specific Stats
          </h2>
          <table className="w-full border-collapse border border-gray-200 text-sm">
            <tbody>
              {Object.entries(positionStats).map(([key, value]) => (
                <tr key={key}>
                  <td className="border p-2 font-medium capitalize">{key}</td>
                  <td className="border p-2">{String(value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
