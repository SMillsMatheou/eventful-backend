import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1723312211352 implements MigrationInterface {
  name = 'Migration1723312211352';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "emailAddress" character varying NOT NULL, "password" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "lastLogin" TIMESTAMP NOT NULL, "createdDate" TIMESTAMP NOT NULL, "updatedDate" TIMESTAMP NOT NULL, CONSTRAINT "UQ_eea9ba2f6e1bb8cb89c4e672f62" UNIQUE ("emailAddress"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
