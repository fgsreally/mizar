import { Body, Controller, Define, NotFoundException, Post } from 'phecda-server'
import jwt from 'jsonwebtoken'
import { compareSync } from 'bcryptjs'
import { UserService } from './user.service'
import { Permission } from './user.model'

@Controller('/user')
export class UserController {
  constructor(protected user: UserService) {

  }

  @Define('auth', false)
  @Post('/register')
  async register(@Body('name') name: string, @Body('email') email: string, @Body('password') password: string) {
    // 检查邮箱是否已被注册
    const existingUser = await this.user.findOne({ email })
    if (existingUser)
      throw new NotFoundException('')
    // 创建用户
    const user = this.user.create({ name, email, password, permission: Permission.USER })

    // 创建 JWT Token，并返回给客户端
    const token = jwt.sign({ userId: user._id }, import.meta.env.VITE_SECRET)
    return token
  }

  @Define('auth', false)

  @Post('/login')

  async login(@Body('email') email: string, @Body('password') password: string) {
    // 检查邮箱是否已被注册
    const user = await this.user.findOne({ email }).select('+password')
    if (!user)
      throw new NotFoundException('无对应用户')
    // 验证密码是否正确

    // const isPasswordCorrect = await user.comparePassword(password)
    if (!compareSync(password, user.password))
      throw new NotFoundException('密码不正确')

    // 创建 JWT Token，并返回给客户端
    const token = jwt.sign({ userId: user.id }, import.meta.env.VITE_SECRET, {
      expiresIn: '1h',
    })
    return token
  }
}
