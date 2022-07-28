import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Categoria from './Categoria'
import Usuario from './Usuario'
import { TipoEstado } from './Enums/TipoEstado'

export default class Articulo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public titulo: string

  @column()
  public descripcion: string

  @column()
  public TipoEstado: TipoEstado

  @column()
  public usuarioId: number

  @column()
  public categoriaId: number

  @belongsTo(() => Categoria)
  public categoria: BelongsTo<typeof Categoria>

  @belongsTo(() => Usuario)
  public usuario: BelongsTo<typeof Usuario>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
