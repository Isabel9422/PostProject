import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Articulo from 'App/Models/Articulo'
import CrearArticuloValidator from 'App/Validators/CrearArticuloValidator'

export default class ArticulosController {
  public async index({ response }: HttpContextContract) {
    const articulos = await Articulo.all()
    return response.json(articulos)
  }

  public async show({ params: { id }, response }: HttpContextContract) {
    try {
      const articulos = await Articulo.query()
        .where('id', id)
        .preload('usuarios')
        .preload('categorias')
        .firstOrFail()
      return response.json(articulos)
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const validateData = await request.validate(CrearArticuloValidator)
    const articulo = await Articulo.create(validateData)
    return response.created({ data: articulo })
  }

  public async update({ request, response }: HttpContextContract) {
    const articulo = await Articulo.findByOrFail('id', request.params().id)
    await articulo.merge(request.all()).save()
    return response.ok({ data: articulo })
  }

  public async destroy({ request, response }: HttpContextContract) {
    const articulo = await Articulo.findByOrFail('id', request.params().id)
    await articulo.delete()
    return response.ok('Articulo eliminada')
  }
}
