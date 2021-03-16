import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { beforeFind,  beforeFetch } from '@ioc:Adonis/Lucid/Orm'
import { softDelete, softDeleteQuery } from '../Services/SoftDelete'

export default class Charge extends BaseModel {

  public static table = 'charges'
  
  @column({ isPrimary: true })
  public id: number

  @column()
  public charge_id: number

  @column()
  public test: number

  @column()
  public status: string

  @column()
  public name: string

  @column()
  public type: string

  @column()
  public terms: string

  @column()
  public price: number

  @column()
  public interval: string

  @column()
  public capped_amount: string

  @column()
  public trial_days: number

  @column.dateTime({ autoCreate: false})
  public billing_on: DateTime

  @column.dateTime({ autoCreate: false})
  public activated_on: DateTime

  @column.dateTime({ autoCreate: false})
  public trial_ends_on: DateTime

  @column.dateTime({ autoCreate: false})
  public cancelled_on: DateTime

  @column.dateTime({ autoCreate: false})
  public expire_on: DateTime

  @column()
  public plan_id: number

  @column()
  public description: string

  @column()
  public reference_charge: number

  @column()
  public user_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ serializeAs: null})
  public deletedAt: DateTime

  @beforeFind()
  public static softDeletesFind = softDeleteQuery;  
  @beforeFetch()
  public static softDeletesFetch = softDeleteQuery;
  
  public async softDelete(column?: string) {
    await softDelete(this, column);
  }
}
