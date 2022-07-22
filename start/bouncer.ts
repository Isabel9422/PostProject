/**
 * Contract source: https://git.io/Jte3T
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Bouncer from '@ioc:Adonis/Addons/Bouncer'
import Articulo from 'App/Models/Articulo'
import { Roles } from 'App/Models/Enums/roles'
import Usuario from 'App/Models/Usuario'
import Logger from '@ioc:Adonis/Core/Logger'

/*
|--------------------------------------------------------------------------
| Bouncer Actions
|--------------------------------------------------------------------------
|
| Actions allows you to separate your application business logic from the
| authorization logic. Feel free to make use of policies when you find
| yourself creating too many actions
|
| You can define an action using the `.define` method on the Bouncer object
| as shown in the following example
|
| ```
| 	Bouncer.define('deletePost', (user: User, post: Post) => {
|			return post.user_id === user.id
| 	})
| ```
|
|****************************************************************
| NOTE: Always export the "actions" const from this file
|****************************************************************
*/
export const { actions } = Bouncer.before((usuario: Usuario | null) => {
  if (usuario?.rol === 'ADMIN') {
    return true
  }
})
  .after((usuario: Usuario | null, actionName, actionResult) => {
    const userType = usuario ? Usuario : 'ESCRITOR'

    actionResult.authorized
      ? Logger.info(`${userType} fue autorizado para ${actionName}`)
      : Logger.info(
          `${userType} fue denegado para ${actionName} porque ${actionResult.errorResponse}`
        )
  })

  .define('createPost', (usuario: Usuario) => {
    return [Roles.admin].includes(usuario.rol)
  })

  .define(
    'viewPost',
    (usuario: Usuario | null, articulo: Articulo) => {
      if (!(articulo.estado === 'PUBLICADO')) {
        return Bouncer.deny('El artículo aún no ha sido publicado', 404)
      }
      return true
    },
    { allowGuest: true }
  )

/*
|--------------------------------------------------------------------------
| Bouncer Policies
|--------------------------------------------------------------------------
|
| Policies are self contained actions for a given resource. For example: You
| can create a policy for a "User" resource, one policy for a "Post" resource
| and so on.
|
| The "registerPolicies" accepts a unique policy name and a function to lazy
| import the policy
|
| ```
| 	Bouncer.registerPolicies({
|			UserPolicy: () => import('App/Policies/User'),
| 		PostPolicy: () => import('App/Policies/Post')
| 	})
| ```
|
|****************************************************************
| NOTE: Always export the "policies" const from this file
|****************************************************************
*/
export const { policies } = Bouncer.registerPolicies({})
