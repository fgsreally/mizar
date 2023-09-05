import { addInitEvents } from './record'

// function getSvgParent(e: any): HTMLInputElement {
//   for (let i = 0; i < 99; i++) {
//     if (e instanceof SVGElement && e.tagName !== "svg" && e.parentElement) {
//       e = e.parentElement;
//     } else {
//       return e;
//     }
//   }
//   return e;
// }

export function record() {
  addInitEvents(document.body)
}
