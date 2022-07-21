import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { Estados } from 'App/Models/Enums/estados'

export default class extends BaseSchema {
  protected tableName = 'articulos'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.enum('estado', Object.values(Estados)).defaultTo('PROPUESTA')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('estado')
    })
  }
}
