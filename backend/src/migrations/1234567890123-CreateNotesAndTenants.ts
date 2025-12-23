import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNotesAndTenants1234567890123 implements MigrationInterface {
  name = 'CreateNotesAndTenants1234567890123';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "tenant" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "tenantId" character varying NOT NULL,
        CONSTRAINT "UQ_tenant_tenantId" UNIQUE ("tenantId"),
        CONSTRAINT "PK_tenant_id" PRIMARY KEY ("id")
      );
    `);

    await queryRunner.query(`
      CREATE TABLE "note" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "title" character varying NOT NULL,
        "content" character varying NOT NULL,
        "tenantId" uuid,
        CONSTRAINT "PK_note_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_note_tenant" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id")
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "note"`);
    await queryRunner.query(`DROP TABLE "tenant"`);
  }
}
