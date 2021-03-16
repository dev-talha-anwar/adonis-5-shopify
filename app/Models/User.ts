import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { softDelete } from '../Services/SoftDelete'
import {
  column,
  beforeSave,
  BaseModel,
} from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public name: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public token: string

  @column()
  public rememberMeToken?: string

  @column()
  public shopify_grandfathered?: boolean

  @column()
  public shopify_namespace?: string

  @column()
  public shopify_freemium?: boolean

  @column()
  public plan_id?: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ serializeAs: null})
  public deletedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
  public async softDelete(column?: string) {
    await softDelete(this, column);
  }
}
