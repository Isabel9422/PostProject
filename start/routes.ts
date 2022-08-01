import Route from '@ioc:Adonis/Core/Route'

/*Route.group(() => {
  Route.resource('/users', 'UsuariosController').apiOnly()
  Route.post('/log', 'UsuariosController.login')
  Route.resource('/categories', 'CategoriasController').apiOnly()
}).prefix('/api')
*/

Route.get('/cat', 'CategoriasController.index')

Route.group(() => {
  Route.resource('/posts', 'ArticulosController').apiOnly()
})
  .prefix('/api')
  .middleware('auth')
