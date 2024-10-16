import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class User1729013434857 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'User',
        columns: [
          {
            name: 'Id',
            type: 'int',
            isPrimary: true,
            unsigned: true,
            isGenerated: true,
          },
          {
            name: 'nombre',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '100',
            isUnique: true,
          },
        ],
      }),
    );

    await queryRunner.query(`ALTER TABLE User MODIFY Id INT AUTO_INCREMENT`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('User');
  }
}
