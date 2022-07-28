import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { TipoRol } from '../../app/Models/Enums/TipoRol'

export default class UsuariosSchema extends BaseSchema {
  protected tableName = 'usuarios'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('email', 255).notNullable().unique()
      table.string('username', 50).notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('nombre')
      table.string('apellidos')
      table.enum('tipo_rol', Object.values(TipoRol)).defaultTo('GUEST')
      table.string('remember_me_token').nullable()

      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
