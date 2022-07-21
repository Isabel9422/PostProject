import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules } from '@ioc:Adonis/Core/Validator'

export default class CrearUsuarioValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre: schema.string({}),
    apellidos: schema.string({}),
    username: schema.string({}, [
      rules.maxLength(50),
      rules.unique({ table: 'usuarios', column: 'username'})
    ]),
    email: schema.string({}, [
      rules.email(),
      rules.maxLength(255),
      rules.unique({ table: 'usuarios', column: 'email' }),
    ]),
    password: schema.string(),
    rol: schema.enum
    
  })
  public messages: CustomMessages = {}
}
