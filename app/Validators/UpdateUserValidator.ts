import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { TipoRol } from 'App/Models/Enums/TipoRol'

export default class UpdateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    nombre: schema.string.optional({}),
    apellidos: schema.string.optional({}),
    username: schema.string.optional({}, [
      rules.maxLength(50),
      rules.unique({ table: 'usuarios', column: 'username' }),
    ]),
    email: schema.string.optional({}, [
      rules.email(),
      rules.maxLength(255),
      rules.unique({ table: 'usuarios', column: 'email' }),
    ]),
    tipoRol: schema.enum.optional(Object.values(TipoRol)),
    password: schema.string.optional({}), //minlength, regex
  })
  public messages: CustomMessages = {}
}
