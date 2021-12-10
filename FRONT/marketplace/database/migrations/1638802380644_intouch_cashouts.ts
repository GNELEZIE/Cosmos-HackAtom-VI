import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class IntouchCashouts extends BaseSchema {
  protected tableName = 'intouch_cashouts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      
      table.string('sender_phone_number', 255).notNullable();
      table.integer('sender_id').unsigned().references('id').inTable('users').notNullable();
      table.string('service_code', 255).notNullable();
      table.string('amount', 255).notNullable();
      table.string('idFromClient', 255) //is the same like partner_transaction_id in airtime and cashin
      table.string('state', 255).notNullable();
      table.text('call_back_message').notNullable();
      table.string('call_back_url', 255).notNullable();
      table.string('recipient_phone_number', 255).notNullable();
      table.string('call_back_status', 255).notNullable();

      table.string('recipient_phone_country_iso', 255).notNullable();
      table.string('sender_phone_country_iso', 255).notNullable();

      //new 
      table.string("payement_type", 255).notNullable();
      table.string('id_from_client', 255)


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
