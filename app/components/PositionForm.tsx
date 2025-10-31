"use client";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

interface PositionFormProps {
  position: string;
  onSubmit: (values: any) => void;
  onBack: () => void;
}

const positionFields: Record<string, { name: string; label: string }[]> = {
  Setter: [
    { name: "assists", label: "Assists" },
    { name: "assistEfficiency", label: "Assist Efficiency (%)" },
    { name: "settingErrors", label: "Setting Errors" },
    { name: "serviceAces", label: "Service Aces" },
    { name: "serviceErrors", label: "Service Errors" },
    { name: "blocks", label: "Blocks" },
    { name: "digs", label: "Digs" },
  ],
  "Outside Hitter": [
    { name: "kills", label: "Kills" },
    { name: "attackAttempts", label: "Attack Attempts" },
    { name: "attackEfficiency", label: "Attack Efficiency (%)" },
    { name: "serveReception", label: "Serve Reception (%)" },
    { name: "blocks", label: "Blocks" },
  ],
  "Middle Blocker": [
    { name: "blocks", label: "Blocks" },
    { name: "blockAttempts", label: "Block Attempts" },
    { name: "blockEfficiency", label: "Block Efficiency (%)" },
    { name: "kills", label: "Kills" },
    { name: "serveAces", label: "Service Aces" },
    { name: "serveErrors", label: "Service Errors" },
  ],
  Libero: [
    { name: "digs", label: "Digs" },
    { name: "receptionAccuracy", label: "Reception Accuracy (%)" },
    { name: "passingErrors", label: "Passing Errors" },
    { name: "serveReceiveAttempts", label: "Serve Receive Attempts" },
    { name: "totalSuccessfulPasses", label: "Total Successful Passes" },
  ],
  "Opposite Hitter": [
    { name: "kills", label: "Kills" },
    { name: "attackEfficiency", label: "Attack Efficiency (%)" },
    { name: "blocks", label: "Blocks" },
    { name: "servePoints", label: "Serve Points" },
  ],
};

const getValidationSchema = (fields: { name: string }[]) =>
  Yup.object(
    fields.reduce((acc, field) => {
      acc[field.name] = Yup.number()
        .typeError("Must be a number")
        .min(0, "Cannot be negative")
        .required("Required");
      return acc;
    }, {} as Record<string, any>)
  );

export default function PositionForm({
  position,
  onSubmit,
  onBack,
}: PositionFormProps) {
  const fields = positionFields[position] || [];

  if (fields.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 px-6 py-10 text-center shadow-xl backdrop-blur sm:px-8">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400" />
        <p className="text-sm text-slate-300">
          No position-specific stats available for {position}.
        </p>
        <button
          onClick={onBack}
          className="mt-6 inline-flex items-center justify-center rounded-full border border-slate-700/60 bg-slate-900/40 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-slate-200 transition hover:border-slate-600 hover:text-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-600/40"
        >
          Back
        </button>
      </div>
    );
  }

  const initialValues = fields.reduce((acc, f) => {
    acc[f.name] = 0;
    return acc;
  }, {} as Record<string, number>);

  const validationSchema = getValidationSchema(fields);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-2xl backdrop-blur">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400" />
          <Form className="space-y-8 p-6 sm:p-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-100">
                {position} Metrics
              </h2>
              <p className="mt-2 text-xs uppercase tracking-[0.3em] text-slate-500">
                Specialized Performance
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {fields.map((field) => (
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

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={onBack}
                className="inline-flex w-full items-center justify-center rounded-full border border-slate-700/60 bg-slate-900/40 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-slate-200 transition hover:border-slate-600 hover:text-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-600/40 sm:w-auto"
              >
                Back
              </button>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-full border border-sky-400/60 bg-gradient-to-r from-sky-500/60 via-cyan-400/60 to-indigo-500/60 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-sky-500/20 transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-sky-400/50 sm:w-auto"
              >
                Save Player
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}
