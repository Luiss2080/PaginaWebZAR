export const FOCALIZABLES = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export function siguienteEnfoque(total, actual, shift) {
  if (total <= 0) return -1;
  if (shift) {
    return actual <= 0 ? total - 1 : actual - 1;
  }
  return actual >= total - 1 ? 0 : actual + 1;
}
