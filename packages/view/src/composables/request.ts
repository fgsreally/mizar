export function useRequest<F extends (...args: any) => any>(method: F, opts: {
  defaultParams?: Parameters<F>
  initData?: Awaited<ReturnType<F>>
  manual?: boolean
} = {}) {
  const data = ref(opts.initData)
  const run = async (params: Parameters<F>) => {
    const { data: value } = await $Req(method(...params as any))
    data.value = value
  }
  if (!opts.manual)
    run(opts.defaultParams!)
  return { run, data }
}
