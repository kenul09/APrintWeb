import { useState } from "react";

// Server-loaded list ({ items, error }) that can be re-fetched from the
// browser when the visitor presses "Try again". `load` returns the new
// items or throws.
export function useRetryableList(initial, load) {
  const [state, setState] = useState({ items: initial.items, error: initial.error, loading: false });

  async function retry() {
    setState((s) => ({ ...s, loading: true }));
    try {
      setState({ items: await load(), error: false, loading: false });
    } catch {
      setState((s) => ({ ...s, error: true, loading: false }));
    }
  }

  return { ...state, retry };
}
