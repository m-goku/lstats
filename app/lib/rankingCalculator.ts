// lib/rankingCalculator.ts
interface StatSet {
  [key: string]: number | undefined | null;
}

interface Player {
  position: string;
  setterStats?: StatSet | null;
  outsideHitterStats?: StatSet | null;
  middleBlockerStats?: StatSet | null;
  liberoStats?: StatSet | null;
  oppositeHitterStats?: StatSet | null;
}

/**
 * Utility to safely handle undefined/null numeric values.
 */
const safe = (value: number | undefined | null): number => value ?? 0;

/**
 * Calculates a player's ranking score based on their position-specific metrics.
 */
export function calculateRankingScore(player: Player): number {
  switch (player.position) {
    // 🧠 Setter
    case "Setter":
      return Number(
        (
          safe(player.setterStats?.assistEfficiency) * 0.4 +
          safe(player.setterStats?.assists) * 0.3 +
          safe(player.setterStats?.blocks) * 0.2 +
          safe(player.setterStats?.digs) * 0.1
        ).toFixed(2)
      );

    // 💥 Outside Hitter
    case "Outside Hitter":
      return Number(
        (
          safe(player.outsideHitterStats?.attackEfficiency) * 0.4 +
          safe(player.outsideHitterStats?.serveReception) * 0.3 +
          safe(player.outsideHitterStats?.kills) * 0.3
        ).toFixed(2)
      );

    // 🧱 Middle Blocker
    case "Middle Blocker":
      return Number(
        (
          safe(player.middleBlockerStats?.blockEfficiency) * 0.5 +
          safe(player.middleBlockerStats?.kills) * 0.3 +
          safe(player.middleBlockerStats?.serveAces) * 0.2
        ).toFixed(2)
      );

    // 🛡️ Libero
    case "Libero":
      return Number(
        (
          safe(player.liberoStats?.receptionAccuracy) * 0.5 +
          safe(player.liberoStats?.digs) * 0.4 -
          safe(player.liberoStats?.passingErrors) * 0.1
        ).toFixed(2)
      );

    // ⚔️ Opposite Hitter
    case "Opposite Hitter":
      return Number(
        (
          safe(player.oppositeHitterStats?.attackEfficiency) * 0.4 +
          safe(player.oppositeHitterStats?.kills) * 0.3 +
          safe(player.oppositeHitterStats?.blocks) * 0.2 +
          safe(player.oppositeHitterStats?.servePoints) * 0.1
        ).toFixed(2)
      );

    // 🧩 Default (unknown position)
    default:
      return 0;
  }
}
