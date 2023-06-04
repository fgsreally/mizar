import pc from 'picocolors'

export function log(msg: string, color = 'green') {
  // @ts-expect-error any pc color
  pc[color](`[mizar] ${msg}`)
}
