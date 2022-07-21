import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CrearArticuloValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    titulo: schema.string({}),
    descripcion: schema.string({}),
    categoriaId: schema.number(),
  })

  public messages: CustomMessages = {}
}
