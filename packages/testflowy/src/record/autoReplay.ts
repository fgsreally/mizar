import { solidMsg } from 'solid-msg'
import { actions } from './actions'
import { getSdkAuth } from './data'
import { i18n } from '@/i18n'

export const autoReplay = async () => {
  const params = new URLSearchParams(location.search)
  const _ids = params.get('testflowy_tasks')
  if (!_ids)
    return

  const ids = _ids.split(',')
  if (ids.length > 10) {
    solidMsg.dark(i18n.同时执行条数不能大于十条, 1000)
    return
  }

  // const res = await apis.task_task.getTaskDetails({ auth: getSdkAuth(), ids });
  // actions.loadAll(res.data.filter((v) => v.code !== "[]"));
  actions.run('task')
}
