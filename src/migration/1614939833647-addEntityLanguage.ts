import {MigrationInterface, QueryRunner} from "typeorm";

export class addEntityLanguage1614939833647 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "language" (
            "id" SERIAL NOT NULL, "name" character varying NOT NULL    
            )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "language"`);
    }

}

