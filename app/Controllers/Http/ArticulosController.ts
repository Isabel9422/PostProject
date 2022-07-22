import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Articulo from 'App/Models/Articulo'
import CrearArticuloValidator from 'App/Validators/CrearArticuloValidator'
import SortPostValidator from 'App/Validators/SortPostValidator'

export default class ArticulosController {
  public async index({ response, request, bouncer }: HttpContextContract) {
    const titulo = request.input('titulo') ?? null
    const usuarioId = request.input('usuarioId') ?? null
    const categoriaId = request.input('categoriaId') ?? null
    const estado = request.input('estado') ?? null
    const datosvalidados = await request.validate(SortPostValidator)
    const sort = datosvalidados.sort || 'id'
    const order = datosvalidados.order || 'asc'

    const articulos = await Articulo.query()
      .if(titulo, (query) => query.where('titulo', 'like', `%${titulo}%`))
      .if(usuarioId, (query) => query.where('usuario_id', usuarioId))
      .if(categoriaId, (query) => query.where('categoria_id', categoriaId))
      .if(estado, (query) => query.where('estado', 'like', `%${estado}%`))
      .orderBy(sort, order)

    // await bouncer.authorize('viewPost', articulos)  Es necesario?

    response.ok({ data: articulos })
  }

  public async show({ params: { id }, response, bouncer }: HttpContextContract) {
    try {
      const articulos = await Articulo.query()
        .where('id', id)
        .preload('usuarios')
        .preload('categorias')
        .firstOrFail()

      await bouncer.authorize('viewPost', articulos)

      return response.json(articulos)
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }

  public async store({ request, response, bouncer }: HttpContextContract) {
    await bouncer.authorize('createPost')
    const validateData = await request.validate(CrearArticuloValidator)
    const articulo = await Articulo.create(validateData)
    return response.created({ data: articulo })
  }

  public async update({ request, response, bouncer }: HttpContextContract) {
    const articulo = await Articulo.findByOrFail('id', request.params().id)
    await bouncer.authorize('editPost', articulo)
    await articulo.merge(request.all()).save()
    return response.ok({ data: articulo })
  }

  public async destroy({ request, response, bouncer }: HttpContextContract) {
    const articulo = await Articulo.findByOrFail('id', request.params().id)
    await bouncer.authorize('deletePost')
    await articulo.delete()
    return response.ok('Articulo eliminado')
  }
}
