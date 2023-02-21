"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allClassBooking = exports.allTrainerBooking = void 0;
const repository_1 = require("../database/repository");
// Get all trainer booking
const allTrainerBooking = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const trainerBooking = yield repository_1.trainerBookingRepository.find();
    if (trainerBooking.length === 0) {
        return res.status(404).json({ msg: "No Booking" });
    }
    return res.status(200).json(trainerBooking);
});
exports.allTrainerBooking = allTrainerBooking;
// Get all class booking
const allClassBooking = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const classBooking = yield repository_1.classBookingRepository.find();
    if (classBooking.length === 0) {
        return res.status(404).json({ msg: "No Booking" });
    }
    return res.status(200).json(classBooking);
});
exports.allClassBooking = allClassBooking;
