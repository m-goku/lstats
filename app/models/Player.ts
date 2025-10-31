import mongoose, { Schema, models } from "mongoose";

const playerSchema = new Schema(
  {
    // 🧍‍♂️ Basic Info
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["Volley"],
      default: "Volley",
      required: true,
    },
    position: {
      type: String,
      required: true,
      enum: [
        "Setter",
        "Middle Blocker",
        "Libero",
        "Opposite Hitter",
        "Outside Hitter",
      ],
    },

    // 🏐 1️⃣ General Match Data
    gamesPlayed: { type: Number, default: 0, min: 0 },
    setsPlayed: { type: Number, default: 0, min: 0 },
    pointsContributed: { type: Number, default: 0, min: 0 },
    serveAccuracy: { type: Number, default: 0, min: 0, max: 100 },
    gameerrors: { type: Number, default: 0, min: 0 },
    overallEfficiency: { type: Number, default: 0, min: 0 },

    // 🧠 2️⃣ Position-Specific Stats
    setterStats: {
      assists: { type: Number, default: 0, min: 0 },
      assistEfficiency: { type: Number, default: 0, min: 0, max: 100 },
      settingErrors: { type: Number, default: 0, min: 0 },
      serviceAces: { type: Number, default: 0, min: 0 },
      serviceErrors: { type: Number, default: 0, min: 0 },
      blocks: { type: Number, default: 0, min: 0 },
      digs: { type: Number, default: 0, min: 0 },
    },

    outsideHitterStats: {
      kills: { type: Number, default: 0, min: 0 },
      attackAttempts: { type: Number, default: 0, min: 0 },
      attackEfficiency: { type: Number, default: 0, min: 0, max: 100 },
      serveReception: { type: Number, default: 0, min: 0, max: 100 },
      blocks: { type: Number, default: 0, min: 0 },
    },

    middleBlockerStats: {
      blocks: { type: Number, default: 0, min: 0 },
      blockAttempts: { type: Number, default: 0, min: 0 },
      blockEfficiency: { type: Number, default: 0, min: 0, max: 100 },
      kills: { type: Number, default: 0, min: 0 },
      serveAces: { type: Number, default: 0, min: 0 },
      serveErrors: { type: Number, default: 0, min: 0 },
    },

    liberoStats: {
      digs: { type: Number, default: 0, min: 0 },
      receptionAccuracy: { type: Number, default: 0, min: 0, max: 100 },
      passingErrors: { type: Number, default: 0, min: 0 },
      serveReceiveAttempts: { type: Number, default: 0, min: 0 },
      totalSuccessfulPasses: { type: Number, default: 0, min: 0 },
    },

    oppositeHitterStats: {
      kills: { type: Number, default: 0, min: 0 },
      attackEfficiency: { type: Number, default: 0, min: 0, max: 100 },
      blocks: { type: Number, default: 0, min: 0 },
      servePoints: { type: Number, default: 0, min: 0 },
    },
  },
  { timestamps: true }
);

export const Player = models.Player || mongoose.model("Player", playerSchema);