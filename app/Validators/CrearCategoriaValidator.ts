import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CrearCategoriaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({ nombre: schema.string({}) })

  public messages: CustomMessages = {}
}
