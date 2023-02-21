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
exports.addPackage = exports.allPackage = void 0;
const repository_1 = require("../database/repository");
// Get all package
const allPackage = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const packages = yield repository_1.packageRepository.find();
    if (packages.length === 0) {
        return res.status(404).json({ msg: "No Package" });
    }
    return res.status(200).json(packages);
});
exports.allPackage = allPackage;
// Add new package
const addPackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const packageInput = req.body;
    const packageCreate = repository_1.packageRepository.create(packageInput);
    const result = yield repository_1.packageRepository.save(packageCreate);
    return res.status(200).json({ packageID: result.ID });
});
exports.addPackage = addPackage;
