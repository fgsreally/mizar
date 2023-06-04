import { BadRequestException, Body, Controller, Get, Param, Post, Query, Watcher } from 'phecda-server'
import { LinearClient } from '@linear/sdk'

@Controller('/linear')
export class LinearController {
  private client = new LinearClient({ apiKey: import.meta.env.VITE_LINEAR_TOKEN })
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

  @Watcher('send_issue')
  @Post('/issue')

  async postIssue(
  @Body('', false) data: {
    title: string, description: string
    projectId: string, teamid: string
  }) {
    const { title, description, projectId, teamid } = data
    const team = await this.client.team(teamid)
    if (team.id) {
      const ret = await this.client.createIssue({ teamId: team.id, title: `[MIZAR] ${title}`, description, projectId })
      console.log(ret)
    }
  }
}
