import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Articulo from './Articulo'
import { TipoRol } from './Enums/TipoRol'

export default class Usuario extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public apellidos: string

  @column()
  public username: string

  @column()
  public email: string

  @column()
  public tipoRol: TipoRol //Enum admin, escritor, revisor, guest

  @hasMany(() => Articulo, { foreignKey: 'usuarioId' })
  public articulos: HasMany<typeof Articulo>

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(usuarios: Usuario) {
    if (usuarios.$dirty.password) {
      usuarios.password = await Hash.make(usuarios.password)
    }
  }
}
