import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Categoria from 'App/Models/Categoria'
import CrearCategoriaValidator from 'App/Validators/CrearCategoriaValidator'
import UpdateCategoriaValidator from 'App/Validators/UpdateCategoriaValidator'

export default class CategoriasController {
  public async index({ response }: HttpContextContract) {
    const categorias = await Categoria.all()
    return response.json(categorias)
  }

  public async show({ response, request }: HttpContextContract) {
    try {
      const categorias = await Categoria.findBy('id', request.params().id)
      return response.json(categorias)
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const validateData = await request.validate(CrearCategoriaValidator)
    const technology = await Categoria.create(validateData)
    return response.created({ data: technology })
  }

  public async update({ request, response }: HttpContextContract) {
    const categoria = await Categoria.findByOrFail('id', request.params().id)
    const validateData = await request.validate(UpdateCategoriaValidator)
    const isEmpty = Object.entries(validateData).length === 0
    if (isEmpty) {
      return response.badRequest()
    }
    await categoria.merge(validateData).save()
    return response.ok({ data: categoria })
  }

  public async destroy({ request, response }: HttpContextContract) {
    const categoria = await Categoria.findByOrFail('id', request.params().id)
    await categoria.delete()
    return response.ok('Categoria eliminada')
  }
}
