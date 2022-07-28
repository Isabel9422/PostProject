import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Articulo from 'App/Models/Articulo'
import CrearArticuloValidator from 'App/Validators/CrearArticuloValidator'
import SortPostValidator from 'App/Validators/SortPostValidator'
import UpdateArticuloValidator from 'App/Validators/UpdateArticuloValidator'

export default class ArticulosController {
  public async index({ response, request, auth }: HttpContextContract) {
    const titulo = request.input('titulo') ?? null
    const usuarioId = request.input('usuarioId') ?? null
    const categoriaId = request.input('categoriaId') ?? null
    const estado = request.input('TipoEstado') ?? null
    const datosvalidados = await request.validate(SortPostValidator)
    const sort = datosvalidados.sort || 'id'
    const order = datosvalidados.order || 'asc'

    const articulos = await Articulo.query()
      .withScopes((scopes) => {
        if (auth.user) scopes.visibleTo(auth.user)
      })
      .if(titulo, (query) => query.where('titulo', 'ILIKE', `%${titulo}%`))
      .if(usuarioId, (query) => query.where('usuario_id', usuarioId))
      .if(categoriaId, (query) => query.where('categoria_id', categoriaId))
      .if(estado, (query) => query.where('tipo_estado', 'ILIKE', `%${estado}%`))
      .orderBy(sort, order)

    response.ok({ data: articulos })
  }

  public async show({ params: { id }, response, bouncer, auth }: HttpContextContract) {
    const articulos = await Articulo.query()
      .withScopes((scopes) => {
        if (auth.user) scopes.visibleTo(auth.user)
      })
      .where('id', id)
      .preload('usuario')
      .preload('categoria')
      .firstOrFail()

    await bouncer.authorize('viewPost', articulos)

    if (!articulos) response.badRequest
    return response.json(articulos)
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
    const validateData = await request.validate(UpdateArticuloValidator)
    const isEmpty = Object.entries(validateData).length === 0
    if (isEmpty) {
      return response.badRequest()
    }
    await articulo.merge(validateData).save()
    return response.ok({ data: articulo })
  }

  public async destroy({ request, response, bouncer }: HttpContextContract) {
    const articulo = await Articulo.findByOrFail('id', request.params().id)
    await bouncer.authorize('deletePost')
    await articulo.delete()
    return response.ok('Articulo eliminado')
  }
}
