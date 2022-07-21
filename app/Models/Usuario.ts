import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { Hash } from '@adonisjs/core/build/standalone'

export default class Usuario extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public apellidos: string

  @column()
  public email: string

  @column()
  public roles: Roles //Enum admin, escritor, revisor, sinPrivilegios

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // @beforeSave()
  // public static async hashPassword(users: Usuario) {
  //   if (users.$dirty.password) {
  //     users.password = await Hash.make(users.password)
  //   }
  // }
}
