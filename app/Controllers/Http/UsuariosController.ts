import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'
import CrearUsuarioValidator from '../../Validators/CrearUsuarioValidator'

export default class UsuariosController {
  public async login({ request, auth, response }: HttpContextContract) {
    const { email, password } = request.all()
    try {
      const token = await auth.attempt(email, password)
      response.created({ token: token, data: auth.user })
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }

  public async show({ response, request }: HttpContextContract) {
    try {
      const usuario = await Usuario.findBy('id', request.params().id)
      return response.json(usuario)
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }

  public async index({ response }: HttpContextContract) {
    const usuarios = await Usuario.all()
    return response.json(usuarios)
  }

  public async store({ request, response }: HttpContextContract) {
    const validateData = await request.validate(CrearUsuarioValidator)
    const usuario = await Usuario.create(validateData)
    return response.created({ data: usuario })
  }

  public async update({ request, response }: HttpContextContract) {
    const usuario = await Usuario.findByOrFail('id', request.params().id)
    const validateData = await request.validate(UpdateUserValidator)
    const isEmpty = Object.entries(validateData).length === 0
    if (isEmpty) {
      return response.badRequest()
    }
    await usuario.merge(validateData).save()
    return response.ok({ data: usuario })
  }

  public async destroy({ request, response }: HttpContextContract) {
    const usuario = await Usuario.findByOrFail('id', request.params().id)
    await usuario.delete()
    return response.ok('Usuario eliminado')
  }
}
