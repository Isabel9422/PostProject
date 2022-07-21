import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Estados } from 'App/Models/Enums/estados'

export default class CrearArticuloValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    titulo: schema.string({}),
    descripcion: schema.string({}),
    categoriaId: schema.number(),
    estado: schema.enum(Object.values(Estados)),
  })

  public messages: CustomMessages = {}
}
