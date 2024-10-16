import { MigrationInterface, QueryRunner, Table } from 'typeorm';
export class Task1728955222487 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Task',
        columns: [
          {
            name: 'Id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'userId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'titulo',
            type: 'varchar',
          },
          {
            name: 'descripcion',
            type: 'varchar',
          },
          {
            name: 'estado',
            type: 'enum',
            enum: ['pendiente', 'en progreso', 'completada'],
            default: `'pendiente'`,
          },
        ],
      }),
    );

    await queryRunner.query(`ALTER TABLE Task MODIFY Id INT AUTO_INCREMENT`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('task');
  }
}
