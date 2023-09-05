import './sdkCss'
import { getGlobal } from 'mizar-helper'
import { testflowySDK } from './app'
import { sdkActionLogin } from './record/data'

const user = getGlobal('user')

sdkActionLogin(user).finally(testflowySDK)
