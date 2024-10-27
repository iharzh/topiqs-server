import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDefaultUser1730047540711 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // password = bcrypt.hash('password', 10);
    await queryRunner.query(`
            INSERT INTO "users" ("firstName", "lastName", username, email, password)
            VALUES ('super', 'admin', 'superadmin', 'admin@topiqs.com', '$2b$10$hK/9q.PoN5Xed0eatHy0X.hrg8qr8PTca/Y3DZdPDggnTY7brDfly')
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DELETE FROM "users"
            WHERE username = 'superadmin'
        `);
  }
}
