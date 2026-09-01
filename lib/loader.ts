// Tiny framework-agnostic loading store. The hero image-sequence loader
// reports real progress here; the Preloader subscribes.
type Listener = (p: number) => void;

let progress = 0;
const listeners = new Set<Listener>();

export const loader = {
  set(p: number) {
    progress = Math.min(1, Math.max(0, p));
    listeners.forEach((l) => l(progress));
  },
  get() {
    return progress;
  },
  subscribe(l: Listener) {
    listeners.add(l);
    l(progress);
    return () => listeners.delete(l);
  },
};
