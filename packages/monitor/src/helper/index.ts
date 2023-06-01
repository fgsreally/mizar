import { MIZAR_SYMBOL } from '../constant'

export function addVue(app: any) {
  if (!globalThis[MIZAR_SYMBOL]?.vue) {
    console.warn('miss mizar vue plugin')
    return
  }
  globalThis[MIZAR_SYMBOL].vue(app)
}
