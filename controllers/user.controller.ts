import type { Request, Response } from "express";
import { FitnessClassBooking } from "../database/entitys/classBooking.entity";
import { FitnessTrainerBooking } from "../database/entitys/trainerBooking.entity";
import { FitnessUser, status } from "../database/entitys/user.entity";
import {
  classBookingRepository,
  trainerBookingRepository,
  userRepository,
} from "../database/repository";
import * as UserService from "../services/user.service";

interface BookingType {
  type: "class" | "trainer";
}

// Get all users
export const allUsers = async (_: Request, res: Response) => {
  const users = await userRepository.find();
  if (users.length === 0) {
    return res.status(404).json({ msg: "No Users" });
  }

  return res.status(200).json(users);
};

// Get profile user
export const getProfileUser = async (req: Request, res: Response) => {
  const userID = +req.params.userID;
  if (!userID) {
    return res.status(404).json({ msg: "No Id" });
  }
  const user = await userRepository.findOneBy({
    ID: userID,
  });

  return res.status(200).json(user);
};

// Create user
export const createUsers = async (req: Request, res: Response) => {
  const userInput = req.body as FitnessUser;

  const user = userRepository.create(userInput);
  const results = await userRepository.save(user).catch((err) => {
    if (+err.sqlState === 23000) {
      const duplicateName = `${err.sqlMessage.split(" ")[2]}`;
      res.status(400).json({ msg: duplicateName });
    } else {
      console.log(err);
    }
  });

  return res.status(200).json(results);
};

// Update user
export const updateUsers = async (req: Request, res: Response) => {
  const userInput = req.body as FitnessUser;
  const userID = +req.params.userID;

  const user = await userRepository.findOneBy({
    ID: userID,
  });

  user.firstname =
    userInput.firstname != "" ? userInput.firstname : user.firstname;
  user.lastname = userInput.lastname != "" ? userInput.lastname : user.lastname;
  user.telephone =
    userInput.telephone != "" ? userInput.telephone : user.telephone;

  await userRepository.save(user).catch((err) => {
    if (+err.sqlState === 23000) {
      const duplicateName = `${err.sqlMessage.split(" ")[2]} is already use`;
      res.status(400).json({ msg: duplicateName });
    } else {
      console.log(err);
    }
  });

  return res.status(200).json({ msg: `User id ${user.ID} has update` });
};

//Login user
export const loginUser = async (req: Request, res: Response) => {
  const userInput = req.body as FitnessUser;
  const user = await userRepository.findOneBy({
    username: userInput.username,
    password: userInput.password,
  });
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }

  return res.status(200).json({ userId: user.ID, password: user.password });
};

// Update status user after choose package
export const userSelectPackage = async (req: Request, res: Response) => {
  const userInput = req.body as FitnessUser;
  const userID = +req.params.userID;
  if (!userID) {
    return res.status(404).json({ msg: "No ID" });
  }

  const statusInput = +userInput.package != 3 ? status.wait : status.success;
  const result = await userRepository.update(userID, {
    status: statusInput,
    package: userInput.package,
  });
  if (result.affected < 0) {
    return res.status(400).json({ msg: `UserID ${userID} has not update` });
  }

  return res.status(200).json({ msg: `UserID ${userID} has update` });
};

// User booking
export const userBooking = async (req: Request, res: Response) => {
  const userInput = req.body as BookingType;
  const userID = +req.params.userID;
  if (!userID) {
    return res.status(404).json({ msg: "No ID" });
  }

  const user = await userRepository.findOneBy({
    ID: userID,
  });

  switch (userInput.type) {
    case "class":
      const classInput = req.body as FitnessClassBooking;
      const bookingClass = classBookingRepository.create({
        typeClass: classInput.typeClass,
        date: classInput.date,
        time: classInput.time,
        user: user,
      });

      const classResult = await classBookingRepository.save(bookingClass);
      return res.status(200).json({ bookingID: classResult.ID });
    case "trainer":
      const trainerInput = req.body as FitnessTrainerBooking;
      console.log(trainerInput);
      const bookingTrainer = trainerBookingRepository.create({
        name: trainerInput.name,
        round: trainerInput.round,
        date: trainerInput.date,
        user: user,
      });

      const trainerResult = await trainerBookingRepository.save(bookingTrainer);
      return res.status(200).json({ bookingID: trainerResult.ID });
  }
};
