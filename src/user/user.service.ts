import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  findAll() {
    return this.userRepository.find();
  }
  findOne(id: number) {
    return this.userRepository.findOne({ id });
  }
  async create(data: CreateUserDto) {
    const user = await this.userRepository.create(data);
    return this.userRepository.save(user);
  }
  async update(id: number, data: UpdateUserDto) {
    await this.userRepository.update(id, data);
    return this.userRepository.findOne({ id });
  }
  async delete(id: number) {
    await this.userRepository.delete(id);
    return { deleted: true };
  }
}
