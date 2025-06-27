"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Font = void 0;
const typeorm_1 = require("typeorm");
const language_1 = require("./language");
let Font = class Font {
};
exports.Font = Font;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Font.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], Font.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], Font.prototype, "filePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true, default: 16 }),
    __metadata("design:type", Number)
], Font.prototype, "fontSize", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Font.prototype, "popularity", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => language_1.Language),
    (0, typeorm_1.JoinTable)({
        name: 'font_languages',
        joinColumn: { name: 'fontId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'languageId', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], Font.prototype, "languages", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Font.prototype, "createdAt", void 0);
exports.Font = Font = __decorate([
    (0, typeorm_1.Entity)()
], Font);
exports.default = Font;
