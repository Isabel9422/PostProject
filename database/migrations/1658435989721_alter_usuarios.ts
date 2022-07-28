import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { TipoRol } from 'App/Models/Enums/TipoRol'

export default class extends BaseSchema {
  protected tableName = 'usuarios'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.enum('tipo_rol', Object.values(TipoRol)).defaultTo('GUEST')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('tipo_rol')
    })
  }
}
