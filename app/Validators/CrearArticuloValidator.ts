import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { TipoEstado } from 'App/Models/Enums/TipoEstado'

export default class CrearArticuloValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    titulo: schema.string({}),
    descripcion: schema.string({}),
    categoriaId: schema.number(),
    tipoEstado: schema.enum.optional(Object.values(TipoEstado)),
  })

  public messages: CustomMessages = {}
}
