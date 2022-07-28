import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { TipoEstado } from 'App/Models/Enums/TipoEstado'

export default class extends BaseSchema {
  protected tableName = 'articulos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('titulo', 50).notNullable().unique()
      table.text('descripcion').notNullable().defaultTo('')
      table.enum('tipo_estado', Object.values(TipoEstado)).defaultTo('PROPUESTA')
      table.integer('usuario_id')
      table.integer('categoria_id').notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
