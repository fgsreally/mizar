import pc from 'picocolors'

export function log(msg: string, color = 'green') {
  // @ts-expect-error any pc color
  // eslint-disable-next-line no-console
  console.log(pc[color](`[mizar] ${msg}`))
}
