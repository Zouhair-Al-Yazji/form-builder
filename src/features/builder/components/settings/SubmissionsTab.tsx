type SubmissionsTabProps = {
  submissions: Record<string, unknown>[];
  clearSubmissions: () => void;
};

/**
 * SubmissionsTab — Renders submission history with empty state
 *
 * WHY: The submissions list is completely independent of the other two tabs.
 * Extracting it means:
 *   1. SettingsPanel stays lean — it doesn't care about submission rendering
 *   2. This component can be reused or replaced independently
 *   3. The empty state logic lives right next to the list it describes
 *
 * DATA FLOW:
 *   FormBuilderContext → useFormBuilder() → SettingsPanel
 *     → SubmissionsTab (submissions, clearSubmissions props)
 */
export function SubmissionsTab({
  submissions,
  clearSubmissions,
}: SubmissionsTabProps) {
  if (submissions.length === 0) {
    return (
      <p className="text-sm text-zinc-500 italic text-center py-8">
        No submissions yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={clearSubmissions}
        className="mb-2 w-fit text-xs font-medium cursor-pointer text-red-500 hover:text-red-600 transition-colors"
      >
        Clear Submission History
      </button>

      {submissions.map((submission, index) => (
        <div
          key={index}
          className="bg-zinc-50 p-4 rounded-lg border border-zinc-200"
        >
          <p className="text-xs text-zinc-500 mb-2 font-mono">
            Submission #{submissions.length - index}
          </p>
          <pre className="text-xs overflow-x-auto text-zinc-800">
            {JSON.stringify(submission, null, 2)}
          </pre>
        </div>
      ))}
    </div>
  );
}
