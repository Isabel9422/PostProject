import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('/users', 'UsuariosController').apiOnly()
  Route.post('/log', 'UsuariosController.login')
  Route.resource('/posts', 'ArticulosController').apiOnly()
  Route.resource('/categories', 'CategoriasController').apiOnly()
}).prefix('/api')

Route.post('/posts', 'ArticulosController.store').middleware('auth')

Route.get('/posts', 'ArticulosController.index').middleware('auth')

Route.get('/posts/:id', 'ArticulosController.show').middleware('auth')
