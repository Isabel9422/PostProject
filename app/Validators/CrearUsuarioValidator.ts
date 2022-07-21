import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Roles } from '../Models/Enums/roles'

export default class CrearUsuarioValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nombre: schema.string({}),
    apellidos: schema.string({}),
    username: schema.string({}, [
      rules.maxLength(50),
      rules.unique({ table: 'usuarios', column: 'username' }),
    ]),
    email: schema.string({}, [
      rules.email(),
      rules.maxLength(255),
      rules.unique({ table: 'usuarios', column: 'email' }),
    ]),
    rol: schema.enum(Object.values(Roles)),
    password: schema.string(), //minlength, regex
  })
  public messages: CustomMessages = {}
}
