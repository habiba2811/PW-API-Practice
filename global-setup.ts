import { request, expect } from "@playwright/test"
import user from './.auth/user.json'
import fs from 'fs'
import path from 'path'

async function globalSetup() {
  const authFile = '.auth/user.json'
  const context = await request.newContext()
  const responseToken = await context.post('https://conduit-api.bondaracademy.com/api/users/login', {
    data: {
      user: { email: "pwtest180@test.com", password: "test1234" }
    }
  })
  const responseBody = await responseToken.json()
  const acessToken = responseBody.user.token
  user.origins[0].localStorage[0].value = acessToken
  fs.mkdirSync(path.dirname(authFile), { recursive: true })
  fs.writeFileSync(authFile, JSON.stringify(user))

  process.env['ACCESS_TOKEN'] = acessToken
  const articleResponse= await context.post('https://conduit-api.bondaracademy.com/api/articles/', {
    data:{
      "article": { "tagList": [], "title": `Global likes test article`, "description": "this is test description", "body": "this is test body" }
    },
    headers: {
      Authorization: `Token ${process.env.ACCESS_TOKEN}`
    }
  })
  expect(articleResponse.status()).toEqual(201)
  const response= await articleResponse.json()
  const slugId= response.article.slug
  process.env['SLUGID']= slugId
}
export default globalSetup
