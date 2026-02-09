import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterCategoryIdToUuid1704067200000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query(`DROP TABLE IF EXISTS "post_categories_category"`);

    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT IF EXISTS "FK_4e0e25505e75e13c1f49e6f4e"`,
    );

    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT IF EXISTS "post_pkey"`,
    );
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "post" ADD "id" uuid PRIMARY KEY DEFAULT gen_random_uuid()`,
    );

    await queryRunner.query(
      `ALTER TABLE "category" DROP CONSTRAINT IF EXISTS "category_pkey"`,
    );
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "category" ADD "id" uuid PRIMARY KEY DEFAULT gen_random_uuid()`,
    );

    await queryRunner.query(`
      CREATE TABLE "post_categories_category" (
        "postId" uuid NOT NULL,
        "categoryId" uuid NOT NULL,
        PRIMARY KEY ("postId", "categoryId"),
        FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE,
        FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "category" ADD "id" SERIAL PRIMARY KEY`,
    );
  }
}
