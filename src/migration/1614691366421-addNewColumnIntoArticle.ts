import {MigrationInterface, QueryRunner} from "typeorm";

export class addNewColumnIntoArticle1614691366421 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" ADD "userId" int4 NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" DROP COLUMN "userId"`);
    }


}
