import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'articulos'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('descripcion_').notNullable().defaultTo('')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('descripcion')
    })
  }
}
