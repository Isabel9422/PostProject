import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'

export default class UsuariosController {
  public async login({ request, auth, response }: HttpContextContract) {
    const { email, password } = request.all()
    try {
      const token = await auth.attempt(email, password)
      return { token: token, data: auth.user }
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const validateData = await request.validate(CrearUsuarioValidator)
    const usuario = await Usuario.create(validateData)
    return response.created({ data: usuario })
  }
}
