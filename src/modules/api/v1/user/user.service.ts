import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from '@modules/api/v1/user/user.repository';

@Injectable()
export class UserService {
  constructor(private UsersRepository: UserRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.UsersRepository.create(createUserDto as unknown as Record<string, unknown>);
  }

  findAll() {
    return this.UsersRepository.findAll();
  }

  findOne(id: number) {
    return this.UsersRepository.getUser({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.UsersRepository.update({ data: updateUserDto as unknown as Record<string, unknown>, options: { id } });
  }

  remove(id: number) {
    return this.UsersRepository.remove(id);
  }
}
