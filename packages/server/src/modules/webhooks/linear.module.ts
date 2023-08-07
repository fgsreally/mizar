import { BadRequestException, Body, Get, Param, Post, Tag } from 'phecda-server'
import { LinearClient } from '@linear/sdk'

@Tag('linear')
export class LinearModule {
  private client = new LinearClient({ apiKey: process.env.VITE_LINEAR_TOKEN })
  constructor() {

  }

  template(msg: string) {
    return msg
  }

  @Get('/issue/:projectId')
  async getIssue(@Param('projectId') projectId: string) {
    const issues = await this.client.issues(
      {
        filter: {
          project: {
            id: {
              eq: projectId,
            },
          },
        },
      },
    )
    return issues.nodes
  }

  @Get('/project/:project')
  async getProject(@Param('project') project: string) {
    const projects = await this.client.projects({
      filter: {
        name: {
          eq: project,
        },
      },
    })

    return projects.nodes[0]
  }

  @Post('/comment/:issueId')
  async postComment(@Param('issueId') issueId: string, @Body() body: string) {
    const comment = await this.client.createComment(
      {
        issueId,
        body,
      },
    )
    if (!comment.success)
      throw new BadRequestException('fail to create comment')
    return comment
  }

  // @Watcher('send_issue')
  // @Post('/issue')
  // async postIssue(
  // @Body('', false) data: LogEntity) {
  //   const { message, project, data: { stack }, uid, url, type } = data
  //   const issue = await this.client.createIssue({ teamId: process.env.VITE_LINEAR_TEAMID, title: `[MIZAR] ${type}:${message}`, description: stack, projectId: (project as any).linearId })
  //   this.client.createAttachment({
  //     title: 'issue link',
  //     url: addQuery(url, 'mizar-error-id', uid),
  //     issueId: (await issue.issue)!.id,
  //   })
  // }
}

export function addQuery(url: string, key: string, val: string) {
  const query = url.split('?')[1]
  if (!query)
    return `${url}?${key}=${val}`

  return `${url}&${key}=${val}`
}
