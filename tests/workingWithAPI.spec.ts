import { test, expect, request } from '@playwright/test';
import tags from '../test-data/tags.json'
test.beforeEach( async ({ page }) => {
  await page.route('*/**/api/tags', async route => {
    await route.fulfill({
      body: JSON.stringify(tags)
    })
  })

  await page.goto('https://conduit.bondaracademy.com/');
  await page.getByText('Sign in').click()
  await page.getByRole('textbox', { name: 'Email'}).fill('pwtest180@test.com')
  await page.getByRole('textbox', { name: 'Password'}).fill('test1234')
  await page.getByRole('button').click()

})

test('has title', async ({ page }) => {
  await page.route('*/**/api/articles*', async route => {
    const response= await route.fetch()
    const responseBody = await response.json()
    responseBody.articles[0].title = 'This is a MOCK test title'
    responseBody.articles[0].description = 'this is a MOCK test description'
    await route.fulfill({
      body: JSON.stringify(responseBody)
    })
  })

  await page.getByText('Global Feed').click()
  await expect(page.locator('.navbar-brand')).toHaveText('conduit');
  await expect(page.locator('app-article-list h1').first()).toContainText('This is a MOCK test title')
  await expect(page.locator('app-article-list p').first()).toContainText('this is a MOCK test description')

});

test('delete article', async ({page ,request}) => {
  const response= await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
    data: {
      user: {email: "pwtest180@test.com", password: "test1234"}
    }
  })
  const responseBody= await response.json()
  const acessToken= responseBody.user.token

  const articleResponse= await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
    data:{
      article: {title: "this is test title", description: "this is test description", body: "this is test body", tagList: []}
    },
    headers: {
     Authorization :`Token ${acessToken}`
    }
  })
  expect(articleResponse.status()).toEqual(201)
  await page.getByText('Global Feed').click()
  await page.getByText('this is test title').click()
  await page.getByRole('button', {name: 'Delete Article'}).first().click()
  await page.getByText('Global Feed').click()
  await expect(page.locator('app-article-list h1').first()).not.toContainText('This is a test title')

})

test.only('create article', async ({page, request}) => {
  await page.getByText('New Article').click()
  await page.getByRole('textbox', { name: 'Article Title'}).fill('playwright is awesome')
  await page.getByRole('textbox', { name: 'What\'s this article about?'}).fill('about the playwright')
  await page.getByRole('textbox', { name: 'Write your article (in markdown)'}).fill('I like using playwright')
  await page.getByRole('button', { name: 'Publish Article'}).click()
  const articleResponse= await page.waitForResponse('https://conduit-api.bondaracademy.com/api/articles/')
  const articleResponseBody= await articleResponse.json()
  const slugId= articleResponseBody.article.slug
  await expect(page.locator('.article-page h1')).toContainText('playwright is awesome')
  await page.getByText('Home').click()
  await page.getByText('Global Feed').click()
  await expect(page.locator('app-article-list h1').first()).toContainText('playwright is awesome')

 const response= await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
    data: {
      user: {email: "pwtest180@test.com", password: "test1234"}
    }
  })
  const responseBody= await response.json()
  const acessToken= responseBody.user.token

  const deleteArticleResponse= await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slugId}`, {
      headers: {
     Authorization :`Token ${acessToken}`
    }
  })
  expect(deleteArticleResponse.status()).toEqual(204)
})
 
