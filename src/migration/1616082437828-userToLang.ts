import {MigrationInterface, QueryRunner} from "typeorm";

export class userToLang1616082437828 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "utl" (
            "userToLanguageId" SERIAL NOT NULL,
            "userId" int4 NOT NULL,
            "languageId" int4 NOT NULL
            )`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "utl"`);
    }

}
