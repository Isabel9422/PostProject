import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, scope } from '@ioc:Adonis/Lucid/Orm'
import Categoria from './Categoria'
import Usuario from './Usuario'
import { TipoEstado } from './Enums/TipoEstado'
import { TipoRol } from './Enums/TipoRol'

export default class Articulo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public titulo: string

  @column()
  public descripcion: string

  @column()
  public tipoEstado: TipoEstado

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

  public static visibleTo = scope((query, usuario: Usuario) => {
    if (usuario.tipoRol === TipoRol.admin) {
      return
    } else if (usuario.tipoRol === TipoRol.escritor) {
      return query.where('tipo_estado', 'PROPUESTA').orWhere('tipo_estado', 'RECHAZADO')
    } else if (usuario.tipoRol === TipoRol.revisor) {
      return query.where('tipo_estado', 'PENDIENTE_REVISION')
    }
    return query.where('tipo_estado', 'PUBLICADO')
  })
}
