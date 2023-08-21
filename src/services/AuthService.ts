import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { RoleEnum } from "../utils/roles";

class AuthService {
  private readonly authRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async login(loginData: any): Promise<any> {
    try {
      let user = await this.authRepository.findOne({
        where: {
          email: loginData.email,
        },
      });

      console.log("data user", user);

      if (!user) {
        throw new Error("Email / password is wrong!");
      }

      const isPasswordValid = await bcrypt.compare(
        loginData.password,
        user.password
      );

      if (!isPasswordValid) {
        throw new Error("Email / password is wrong!");
      }

      const token = jwt.sign(
        {
          user: {
            email: user.email,
            name: user.name,
            roles: user.roles,
            profile: user.profile,
          },
        },
        "dumbwaysterbaik",
        { expiresIn: "1h" }
      );

      return {
        message: "Login successful!",
        user: {
          email: user.email,
          name: user.name,
          roles: user.roles,
          profile: user.profile,
        },
        token: token,
      };
    } catch (err) {
      throw new Error("Something went wrong on the server!");
    }
  }

  async register(userData: any): Promise<any> {
    try {
      const isEmailRegistered = await this.authRepository.count({
        where: {
          email: userData.email,
        },
      });

      if (isEmailRegistered > 0) {
        throw new Error("Email is already registered!");
      }

      const password = await bcrypt.hash(userData.password, 10);

      const user = this.authRepository.create({
        email: userData.email,
        name: userData.name,
        password: password,
        roles: { id: RoleEnum.USER },
        profile: { address: "" },
      });

      await this.authRepository.save(user);

      return {
        message: "Registration successful!",
        user: user,
      };
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong on the server!");
    }
  }
}

export default new AuthService();
