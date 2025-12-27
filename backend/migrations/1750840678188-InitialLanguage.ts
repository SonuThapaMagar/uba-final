import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialLanguage1750840678188 implements MigrationInterface {
    name = 'InitialLanguage1750840678188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`language\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`code\` varchar(10) NULL, UNIQUE INDEX \`IDX_7df7d1e250ea2a416f078a631f\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`font\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`filePath\` varchar(255) NOT NULL, \`fontSize\` int NULL DEFAULT '16', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`font_languages_language\` (\`fontId\` int NOT NULL, \`languageId\` int NOT NULL, INDEX \`IDX_0b6120ba0fa0179f4e9d4c437d\` (\`fontId\`), INDEX \`IDX_1918bd3f2217398d5f4eb3f385\` (\`languageId\`), PRIMARY KEY (\`fontId\`, \`languageId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`font_languages_language\` ADD CONSTRAINT \`FK_0b6120ba0fa0179f4e9d4c437d3\` FOREIGN KEY (\`fontId\`) REFERENCES \`font\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`font_languages\` ADD CONSTRAINT \`FK_1918bd3f2217398d5f4eb3f3859\` FOREIGN KEY (\`languageId\`) REFERENCES \`language\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`font_languages_language\` DROP FOREIGN KEY \`FK_1918bd3f2217398d5f4eb3f3859\``);
        await queryRunner.query(`ALTER TABLE \`font_languages_language\` DROP FOREIGN KEY \`FK_0b6120ba0fa0179f4e9d4c437d3\``);
        await queryRunner.query(`DROP INDEX \`IDX_1918bd3f2217398d5f4eb3f385\` ON \`font_languages_language\``);
        await queryRunner.query(`DROP INDEX \`IDX_0b6120ba0fa0179f4e9d4c437d\` ON \`font_languages_language\``);
        await queryRunner.query(`DROP TABLE \`font_languages_language\``);
        await queryRunner.query(`DROP TABLE \`font\``);
        await queryRunner.query(`DROP INDEX \`IDX_7df7d1e250ea2a416f078a631f\` ON \`language\``);
        await queryRunner.query(`DROP TABLE \`language\``);
    }

}
