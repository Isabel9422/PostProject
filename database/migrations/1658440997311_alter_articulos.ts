import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { TipoEstado } from 'App/Models/Enums/TipoEstado'

export default class extends BaseSchema {
  protected tableName = 'articulos'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.enum('tipo_estado', Object.values(TipoEstado)).defaultTo('PROPUESTA')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('tipo_estado')
    })
  }
}
