import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {

    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('firstname', 255).notNullable()
      table.string('lastname', 255).notNullable()
      table.string('country', 255).notNullable()
      table.string('email', 255).unique().notNullable()
      table.string('password', 180).notNullable()
      
      table.date("birthday");

      //phone
      table.string('phone', 255).unique().notNullable()
      table.string('mobile_money_number', 225).unique()
      table.string('mobile_money_number_network', 225).unique()

      //card identity
      table.string('picture', 180)
      table.string('recto', 180)
      table.string('verso', 180)

      //manage keys
      table.string('generated_id', 225).notNullable()
      table.integer('user_type').defaultTo(1).notNullable()
      table.string('isactive').defaultTo("0").notNullable()
      table.string('remember_me_token').nullable()

      //location
      table.string('lat', 225).defaultTo(0)
      table.string('long', 225).defaultTo(0)
      table.string('city', 225)
      table.string('postal_code', 225)
      table.string('address', 225)
     

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true, true)
    })
    
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
