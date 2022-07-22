import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('/users', 'UsuariosController').apiOnly()
  Route.post('/log', 'UsuariosController.login')
  Route.resource('/posts', 'ArticulosController').apiOnly().middleware
  Route.resource('/categories', 'CategoriasController').apiOnly()
}).prefix('/api')
