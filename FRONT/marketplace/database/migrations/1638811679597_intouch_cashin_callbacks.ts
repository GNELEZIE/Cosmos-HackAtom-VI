import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class IntouchCashinCallbacks extends BaseSchema {
  protected tableName = 'intouch_cashin_callbacks'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string("partner_transaction_id",255).notNullable();
      table.string("gu_transaction_id", 255).notNullable();
      table.string("status",255).notNullable();
      table.string("commission",255).notNullable();
      table.string("service_id",255).notNullable();
      table.string("message", 255).notNullable();
      table.text("data").notNullable();

      
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
