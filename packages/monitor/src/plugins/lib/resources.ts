import { formatDecimal } from '../../utils'

export default function () {
  return performance.getEntriesByType('resource').map((item: PerformanceResourceTiming) => ({
    name: item.name,
    time: formatDecimal(item.responseEnd, 3),
  }) as any)
}
