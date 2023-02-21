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
exports.userBooking = exports.userSelectPackage = exports.loginUser = exports.updateUsers = exports.createUsers = exports.getProfileUser = exports.allUsers = void 0;
const user_entity_1 = require("../database/entitys/user.entity");
const repository_1 = require("../database/repository");
// Get all users
const allUsers = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield repository_1.userRepository.find();
    if (users.length === 0) {
        return res.status(404).json({ msg: "No Users" });
    }
    return res.status(200).json(users);
});
exports.allUsers = allUsers;
// Get profile user
const getProfileUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = +req.params.userID;
    if (!userID) {
        return res.status(404).json({ msg: "No Id" });
    }
    const user = yield repository_1.userRepository.findOneBy({
        ID: userID,
    });
    return res.status(200).json(user);
});
exports.getProfileUser = getProfileUser;
// Create user
const createUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInput = req.body;
    const user = repository_1.userRepository.create(userInput);
    const results = yield repository_1.userRepository.save(user).catch((err) => {
        if (+err.sqlState === 23000) {
            const duplicateName = `${err.sqlMessage.split(" ")[2]}`;
            res.status(400).json({ msg: duplicateName });
        }
        else {
            console.log(err);
        }
    });
    return res.status(200).json(results);
});
exports.createUsers = createUsers;
// Update user
const updateUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInput = req.body;
    const userID = +req.params.userID;
    const user = yield repository_1.userRepository.findOneBy({
        ID: userID,
    });
    user.firstname =
        userInput.firstname != "" ? userInput.firstname : user.firstname;
    user.lastname = userInput.lastname != "" ? userInput.lastname : user.lastname;
    user.telephone =
        userInput.telephone != "" ? userInput.telephone : user.telephone;
    yield repository_1.userRepository.save(user).catch((err) => {
        if (+err.sqlState === 23000) {
            const duplicateName = `${err.sqlMessage.split(" ")[2]} is already use`;
            res.status(400).json({ msg: duplicateName });
        }
        else {
            console.log(err);
        }
    });
    return res.status(200).json({ msg: `User id ${user.ID} has update` });
});
exports.updateUsers = updateUsers;
//Login user
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInput = req.body;
    const user = yield repository_1.userRepository.findOneBy({
        username: userInput.username,
        password: userInput.password,
    });
    if (!user) {
        return res.status(400).json({ msg: "User not found" });
    }
    return res.status(200).json({ userId: user.ID, password: user.password });
});
exports.loginUser = loginUser;
// Update status user after choose package
const userSelectPackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInput = req.body;
    const userID = +req.params.userID;
    if (!userID) {
        return res.status(404).json({ msg: "No ID" });
    }
    const statusInput = +userInput.package != 3 ? user_entity_1.status.wait : user_entity_1.status.success;
    const result = yield repository_1.userRepository.update(userID, {
        status: statusInput,
        package: userInput.package,
    });
    if (result.affected < 0) {
        return res.status(400).json({ msg: `UserID ${userID} has not update` });
    }
    return res.status(200).json({ msg: `UserID ${userID} has update` });
});
exports.userSelectPackage = userSelectPackage;
// User booking
const userBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInput = req.body;
    const userID = +req.params.userID;
    if (!userID) {
        return res.status(404).json({ msg: "No ID" });
    }
    const user = yield repository_1.userRepository.findOneBy({
        ID: userID,
    });
    switch (userInput.type) {
        case "class":
            const classInput = req.body;
            const bookingClass = repository_1.classBookingRepository.create({
                typeClass: classInput.typeClass,
                date: classInput.date,
                time: classInput.time,
                user: user,
            });
            const classResult = yield repository_1.classBookingRepository.save(bookingClass);
            return res.status(200).json({ bookingID: classResult.ID });
        case "trainer":
            const trainerInput = req.body;
            console.log(trainerInput);
            const bookingTrainer = repository_1.trainerBookingRepository.create({
                name: trainerInput.name,
                round: trainerInput.round,
                date: trainerInput.date,
                user: user,
            });
            const trainerResult = yield repository_1.trainerBookingRepository.save(bookingTrainer);
            return res.status(200).json({ bookingID: trainerResult.ID });
    }
});
exports.userBooking = userBooking;
