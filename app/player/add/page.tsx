"use client";

import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import PositionForm from "@/app/components/PositionForm";

const STEPS = ["General Info", "Position Stats"];

export default function NewPlayerPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});

  const GeneralSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    position: Yup.string().required("Position is required"),
    gamesPlayed: Yup.number().required("Required").min(0),
    setsPlayed: Yup.number().required("Required").min(0),
    pointsContributed: Yup.number().required("Required").min(0),
    gameerrors: Yup.number().required("Required").min(0),
    overallEfficiency: Yup.number().required("Required").min(0),
  });

  const handleGeneralSubmit = (values: any) => {
    setFormData(values);
    setStep(2);
  };

  const handleFinalSubmit = async (positionStats: any) => {
    const positionKey = formData.position
      .split(" ")
      .map((word: string, index: number) =>
        index === 0
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join("");

    const finalData = {
      ...formData,
      [`${positionKey}Stats`]: positionStats,
    };

    try {
      const res = await fetch("/api/players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(`Error: ${err.message || "Failed to save player"}`);
        return;
      }

      alert("Player added successfully!");
      setStep(1);
      setFormData({});
    } catch (err) {
      console.error(err);
      alert("Failed to submit player data");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
        <div className="space-y-10">
          <header className="text-center">
            <p className="text-[0.6rem] uppercase tracking-[0.4em] text-slate-500 sm:text-xs">
              Team Builder
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">
              Add A New Player
            </h1>
            <p className="mt-3 text-sm text-slate-400 sm:text-base">
              Capture key metrics to keep your roster rankings up to date.
            </p>
          </header>

          <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-2xl backdrop-blur">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400" />
            <div className="space-y-8 p-6 sm:p-8">
              <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs uppercase tracking-[0.4em] text-slate-500">
                  Player Wizard
                </span>
                <div className="flex items-center gap-2 text-xs text-slate-400 sm:text-sm">
                  {STEPS.map((label, index) => {
                    const current = index + 1;
                    const isActive = current === step;
                    const isCompleted = current < step;
                    return (
                      <div
                        key={label}
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 transition ${
                          isActive
                            ? "border-sky-400/60 bg-slate-900/80 text-slate-100"
                            : isCompleted
                            ? "border-slate-700 bg-slate-900/60 text-slate-200"
                            : "border-slate-800 bg-slate-900/40 text-slate-500"
                        }`}
                      >
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-full text-[0.7rem] font-semibold ${
                            isActive || isCompleted
                              ? "bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 text-slate-950"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {String(current).padStart(2, "0")}
                        </span>
                        <span className="font-medium tracking-wide">{label}</span>
                      </div>
                    );
                  })}
                </div>
              </nav>

              {step === 1 && (
                <Formik
                  initialValues={{
                    name: "",
                    position: "",
                    gamesPlayed: 0,
                    setsPlayed: 0,
                    pointsContributed: 0,
                    gameerrors: 0,
                    overallEfficiency: 0,
                  }}
                  validationSchema={GeneralSchema}
                  onSubmit={handleGeneralSubmit}
                >
                  {({ errors, touched }: { errors: any; touched: any }) => (
                    <Form className="space-y-8">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-200">
                            Name
                          </label>
                          <Field
                            name="name"
                            placeholder="Player Name"
                            className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition"
                          />
                          {errors.name && touched.name && (
                            <p className="text-xs text-red-400">{errors.name}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-200">
                            Position
                          </label>
                          <Field
                            as="select"
                            name="position"
                            className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition"
                          >
                            <option value="" className="text-slate-500">
                              Select Position
                            </option>
                            <option value="Setter">Setter</option>
                            <option value="Libero">Libero</option>
                            <option value="Outside Hitter">Outside Hitter</option>
                            <option value="Middle Blocker">Middle Blocker</option>
                            <option value="Opposite Hitter">Opposite Hitter</option>
                          </Field>
                          {errors.position && touched.position && (
                            <p className="text-xs text-red-400">
                              {errors.position}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                          General Metrics
                        </h2>
                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                          {[
                            { name: "gamesPlayed", label: "Games Played" },
                            { name: "setsPlayed", label: "Sets Played" },
                            {
                              name: "pointsContributed",
                              label: "Points Contributed",
                            },
                            { name: "gameerrors", label: "Game Errors" },
                            {
                              name: "overallEfficiency",
                              label: "Overall Efficiency",
                            },
                          ].map((field) => (
                            <div key={field.name} className="space-y-2">
                              <label className="text-sm font-medium text-slate-200">
                                {field.label}
                              </label>
                              <Field
                                name={field.name}
                                type="number"
                                placeholder={field.label}
                                className="w-full rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition"
                              />
                              {errors[field.name] && touched[field.name] && (
                                <p className="text-xs text-red-400">
                                  {String(errors[field.name])}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <button
                          type="submit"
                          className="inline-flex w-full items-center justify-center rounded-full border border-sky-400/60 bg-gradient-to-r from-sky-500/60 via-cyan-400/60 to-indigo-500/60 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-sky-500/20 transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-sky-400/50 sm:w-auto"
                        >
                          Next Step
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              )}

              {step === 2 && (
                <PositionForm
                  position={formData.position}
                  onSubmit={handleFinalSubmit}
                  onBack={() => setStep(1)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
