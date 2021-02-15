import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Plans extends BaseSchema {
  protected tableName = 'plans'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      // The type of plan, either PlanType::RECURRING (0) or PlanType::ONETIME (1)
      table.string('type')
      // Name of the plan
      table.string('name')
      // Price of the plan
      table.decimal('price', 8, 2)
      table.string('interval').nullable()
      // Store the amount of the charge, this helps if you are experimenting with pricing
      table.decimal('capped_amount', 8, 2).nullable()
      // Terms for the usage charges
      table.string('terms').nullable()
      // Nullable in case of 0 trial days
      table.integer('trial_days').nullable()
      // Is a test plan or not
      table.boolean('test').defaultTo(false)
      // On-install
      table.boolean('on_install').defaultTo(false)
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
