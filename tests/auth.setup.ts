import { test as setup } from '@playwright/test';
import user from '../.auth/user.json'
import fs from 'fs'
import { json } from 'stream/consumers';

const authFile= '.auth/user.json'

setup('authentication', async({ page, request }) => {
//   await page.goto('https://conduit.bondaracademy.com/');
//   await page.getByText('Sign in').click()
//   await page.getByRole('textbox', { name: 'Email'}).fill('pwtest180@test.com')
//   await page.getByRole('textbox', { name: 'Password'}).fill('test1234')
//   await page.getByRole('button').click()
//   await page.waitForTimeout(1000)
//   await page.waitForResponse('https://conduit-api.bondaracademy.com/api/tags')

//   await page.context().storageState({path: authFile})
  const response= await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
    data: {
      user: {email: "pwtest180@test.com", password: "test1234"}
    }
  })
  const responseBody= await response.json()
  const acessToken= responseBody.user.token
  user.origins[0].localStorage[0].value = acessToken
  fs.writeFileSync(authFile, JSON.stringify(user))

  process.env['ACCESS_TOKEN'] = acessToken
})
