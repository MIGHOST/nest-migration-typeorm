import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnCountryId1614866599302 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "countryId" int4 NULL`);    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "countryId"`);   
    }

}
