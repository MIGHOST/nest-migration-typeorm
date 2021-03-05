import {MigrationInterface, QueryRunner} from "typeorm";

export class addNewColumnInCountrytable1614684492139 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "country" ADD "capital" varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "capital"`);
    }

}
