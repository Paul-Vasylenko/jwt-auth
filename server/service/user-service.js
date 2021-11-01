//User service is for creating editing searching deleting etc of users.
const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-errors");

class UserService {
  async registration(email, password) {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw ApiError.BadRequest("User already exists");
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
    });
    try {
      await mailService.sendActivationMail(
        email,
        `${process.env.API_URL}/api/activate/${activationLink}`
      );
    } catch (e) {
      throw ApiError.BadRequest("Email error");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    try {
      await tokenService.saveToken(userDto.id, tokens.refreshToken);
    } catch (e) {
      throw ApiError.BadRequest("Error in creating tokens");
    }
    return {
      ...tokens,
      user: userDto,
    };
  }

  async login(email, password) {
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      throw ApiError.BadRequest("Пользователь не найден");
    }
    const isPassEqual = await bcrypt.compare(password, existingUser.password);
    if (!isPassEqual) {
      throw ApiError.BadRequest("Пароли не совпадают");
    }
    const userDto = new UserDto(existingUser);
    const tokens = tokenService.generateTokens({ ...userDto });
    try {
      await tokenService.saveToken(userDto.id, tokens.refreshToken);
    } catch (e) {
      throw ApiError.BadRequest("Error in creating tokens");
    }
    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest("User doesn't exist");
    }
    user.isActivated = true;
    await user.save();
  }

  async logout(refreshToken) {
    try {
      await tokenService.removeToken(refreshToken);
      return { removed: true, refreshToken };
    } catch (e) {
      return { removed: false };
    }
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.verifyRefreshToken(refreshToken);
    const tokenFromDatabase = tokenService.findToken(refreshToken);
    if (!tokenFromDatabase || !userData) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    try {
      await tokenService.saveToken(userDto.id, tokens.refreshToken);
    } catch (e) {
      throw ApiError.BadRequest("Error in creating tokens");
    }
    return {
      ...tokens,
      user: userDto,
    };
  }

  async getUsers() {
    const users = await UserModel.find();
    return users;
  }
}

module.exports = new UserService();
