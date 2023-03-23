/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.on('/').render('welcome')
Route.resource('article', 'ArticlesController')
.paramFor('article', 'slug')
.as('article')
.middleware({
  create: ["auth"],
  edit: ["auth"],
  store: ["auth"],
  destroy: ["auth"],
});



// Route.get('/article', 'ArticlesController.view').as('article_view')

// Route.get('/article/create', 'ArticlesController.create').as('article_create')
// Route.post('/article/store', 'ArticlesController.store').as('article_store')
// Route.get('/article/edit/:slug', 'ArticlesController.edit').as('article_edit')
// Route.patch('/article/update/:slug', 'ArticlesController.update').as('article_update')
// Route.delete('/article/delete/:slug', 'ArticlesController.destroy').as('article_delete')


Route.on('/login').render('auth/login').as('login');

Route.post('/login',async ({ auth, request, response }) => {
  const email = request.input('email')
  const password = request.input('password')

  await auth.use('web').attempt(email, password)
  return response.redirect('/');
})

Route.post('/logout', async ({ auth, response }) => {
  await auth.use('web').logout()
  response.redirect('/login')
}).as('logout')