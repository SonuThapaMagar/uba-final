"use strict";
/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class InitSchema1751012047308 {
    constructor() {
        this.name = 'InitSchema1751012047308';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`font_languages\` (\`fontId\` int NOT NULL, \`languageId\` int NOT NULL, INDEX \`IDX_e6ae0135bc2bbad2ed16714366\` (\`fontId\`), INDEX \`IDX_78d35d88180dda92cf2c018920\` (\`languageId\`), PRIMARY KEY (\`fontId\`, \`languageId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`language\` CHANGE \`code\` \`code\` varchar(10) NULL`);
        await queryRunner.query(`ALTER TABLE \`font_languages\` ADD CONSTRAINT \`FK_e6ae0135bc2bbad2ed167143663\` FOREIGN KEY (\`fontId\`) REFERENCES \`font\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`font_languages\` ADD CONSTRAINT \`FK_78d35d88180dda92cf2c0189207\` FOREIGN KEY (\`languageId\`) REFERENCES \`language\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`font_languages\` DROP FOREIGN KEY \`FK_78d35d88180dda92cf2c0189207\``);
        await queryRunner.query(`ALTER TABLE \`font_languages\` DROP FOREIGN KEY \`FK_e6ae0135bc2bbad2ed167143663\``);
        await queryRunner.query(`ALTER TABLE \`language\` CHANGE \`code\` \`code\` varchar(10) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP INDEX \`IDX_78d35d88180dda92cf2c018920\` ON \`font_languages\``);
        await queryRunner.query(`DROP INDEX \`IDX_e6ae0135bc2bbad2ed16714366\` ON \`font_languages\``);
        await queryRunner.query(`DROP TABLE \`font_languages\``);
    }
};
