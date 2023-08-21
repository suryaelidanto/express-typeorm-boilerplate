import { MigrationInterface, QueryRunner } from "typeorm";

export class RoleSeeder1692597698820 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `INSERT INTO roles (id, name) VALUES (1, 'ADMIN'), (2, 'USER'), (3, 'EDITOR'), (4, 'VIEWER'), (5, 'PUBLIC')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DELETE FROM roles WHERE id IN (1, 2, 3, 4, 5)`);
  }
}
