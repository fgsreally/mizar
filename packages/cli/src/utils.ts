import pc from 'picocolors'

export function log(msg: string, color = 'green') {
  // @ts-expect-error any pc color
  console.log(pc[color](`[mizar] ${msg}`))
}
