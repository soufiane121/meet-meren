/**
 * Reserves its own line whether or not there is an error, so validating an
 * input never shifts the form underneath the visitor's cursor.
 */
export function FormMessage({ text }: { text: string }) {
  return (
    <p className={text ? "form-msg err" : "form-msg"} role="status" aria-live="polite">
      {text || " "}
    </p>
  );
}
