import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

class UsersService {
  private readonly userRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async find(): Promise<any> {
    try {
      const response = await this.userRepository.find();
      return response;
    } catch (err) {
      throw new Error("Something went wrong on the server!");
    }
  }
}

export default new UsersService();
