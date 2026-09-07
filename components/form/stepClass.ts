/**
 * `.step` is display:none until active. A CSS animation does not run on a
 * display:none element and restarts when the element is shown again, so
 * `step-enter` can simply stay on — no class removal / reflow dance needed.
 *
 * `animate` is false until the visitor moves for the first time, so step 1 does
 * not fade in a second time on top of the hero's own entrance animation.
 */
export function stepClass(active: boolean, animate: boolean): string {
  return ["step", active && "active", animate && "step-enter"].filter(Boolean).join(" ");
}
