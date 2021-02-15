import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Charges extends BaseSchema {
  protected tableName = 'charges'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      // Filled in when the charge is created, provided by shopify, unique makes it indexed
      table.integer('charge_id')
      // Test mode or real
      table.boolean('test').defaultTo(false)
      table.string('status').nullable()
      // Name of the charge (for recurring or one time charges)
      table.string('name').nullable()
      // Terms for the usage charges
      table.string('terms').nullable()
      // Integer value reprecenting a recurring, one time, usage, or application_credit.
      // This also allows us to store usage based charges not just subscription or one time charges.
      // We will be able to do things like create a charge history for a shop if they have multiple charges.
      // For instance, usage based or an app that has multiple purchases.
      table.string('type')
      // Store the amount of the charge, this helps if you are experimenting with pricing
      table.decimal('price', 8, 2)
      table.string('interval').nullable()
      // Store the amount of the charge, this helps if you are experimenting with pricing
      table.decimal('capped_amount', 8, 2).nullable()
      // Nullable in case of 0 trial days
      table.integer('trial_days').nullable()
      // The recurring application charge must be accepted or the returned value is null
      table.timestamp('billing_on').nullable()
      // When activation happened
      table.timestamp('activated_on').nullable()
      // Date the trial period ends
      table.timestamp('trial_ends_on').nullable()
      // Not supported on Shopify's initial billing screen, but good for future use
      table.timestamp('cancelled_on').nullable()
      // Expires on
      table.timestamp('expires_on').nullable()
      // Plan ID for the charge
      table.integer('plan_id').unsigned().nullable()
      // Description support
      table.string('description').nullable()
      // Linking to charge_id
      table.bigInteger('reference_charge').nullable()
      table.integer('user_id').unsigned()
      // Linking
      table.foreign('user_id').references('id').inTable('users').onDelete('cascade')
      table.foreign('plan_id').references('id').inTable('plans')
      table.timestamps(true)
      // Allows for soft deleting
      table.timestamp('deleted_at').nullable();
      
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
