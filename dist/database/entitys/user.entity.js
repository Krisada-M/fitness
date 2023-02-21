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
exports.FitnessUser = exports.status = void 0;
const typeorm_1 = require("typeorm");
const classBooking_entity_1 = require("./classBooking.entity");
const package_entity_1 = require("./package.entity");
const trainerBooking_entity_1 = require("./trainerBooking.entity");
var status;
(function (status) {
    status["wait"] = "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E23\u0E2D\u0E2D\u0E19\u0E38\u0E21\u0E31\u0E15\u0E34";
    status["success"] = "\u0E40\u0E1B\u0E47\u0E19\u0E2A\u0E21\u0E32\u0E0A\u0E34\u0E01";
    status["unSuccess"] = "\u0E44\u0E21\u0E48\u0E40\u0E1B\u0E47\u0E19\u0E2A\u0E21\u0E32\u0E0A\u0E34\u0E01";
})(status = exports.status || (exports.status = {}));
let FitnessUser = class FitnessUser {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FitnessUser.prototype, "ID", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], FitnessUser.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FitnessUser.prototype, "firstname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FitnessUser.prototype, "lastname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FitnessUser.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], FitnessUser.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: status.unSuccess }),
    __metadata("design:type", String)
], FitnessUser.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], FitnessUser.prototype, "telephone", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => package_entity_1.FitnessPackage, (proPackage) => proPackage.users, {
        eager: true,
    }),
    __metadata("design:type", package_entity_1.FitnessPackage)
], FitnessUser.prototype, "package", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => trainerBooking_entity_1.FitnessTrainerBooking, (trainer) => trainer.user, {
        eager: true,
    }),
    __metadata("design:type", Array)
], FitnessUser.prototype, "trainer", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => classBooking_entity_1.FitnessClassBooking, (booking) => booking.user, {
        eager: true,
    }),
    __metadata("design:type", Array)
], FitnessUser.prototype, "class", void 0);
FitnessUser = __decorate([
    (0, typeorm_1.Entity)()
], FitnessUser);
exports.FitnessUser = FitnessUser;
