import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class IntouchCashins extends BaseSchema {
  protected tableName = 'intouch_cashins'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      
      table.integer('sender_id').unsigned().references('id').inTable('users');
      table.string('recipient_phone_number', 255).notNullable();
      table.string('service_id', 255).notNullable();
      table.string('amount', 255).notNullable();
      table.string('gu_transaction_id', 255);
      table.string('partner_transaction_id', 255).notNullable();
      table.string('state', 255).notNullable();
      table.string('call_back_message', 255).notNullable();
      table.string('call_back_status', 255).notNullable();
      table.string('call_back_url', 255).notNullable();
      table.string('recipient_phone_country_iso', 255).notNullable();

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
       table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
