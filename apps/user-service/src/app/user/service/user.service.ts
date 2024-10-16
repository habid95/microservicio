import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'apps/user-service/src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PaginatedResult } from '../interfaces/paginated.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly _user: Repository<User>,
  ) {}

  async createUser(User) {
    const newUser = await this._user.create(User);
    console.log({ newUser });
    const saveuser = await this._user.save(newUser);

    return { saveuser };
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = this._user.create(createUserDto);
      return await this._user.save(newUser);
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedResult<User>> {
    try {
      const [users, total] = await this._user.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
      });

      return {
        page,
        limit,
        hasMore: total > page * limit,
        data: users,
      };
    } catch (error) {
      throw new Error('Error al buscar usuarios: ' + error.message);
    }
  }

  async findById(Id: number): Promise<User> {
    try {
      const user = await this._user.findOne({
        where: { Id },
      });
      if (!user) {
        throw new NotFoundException(`Usuario con el ${Id} no encontrado`);
      }
      return user;
    } catch (error) {
      throw new Error('Error al buscar usuarios:' + error.message);
    }
  }

  async update(Id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      await this._user.update(Id, updateUserDto);
      return this.findById(Id);
    } catch (error) {
      throw new Error('Error al modificar el usuario: ' + error.message);
    }
  }

  async remove(Id: number): Promise<{ message: string }> {
    try {
      const result = await this._user.delete(Id);
      if (result.affected === 0) {
        throw new NotFoundException(`Usuario con el ${Id} no encontrado`);
      }
      return { message: `Usaurio con el id ${Id} eliminado correctamente` };
    } catch (error) {
      throw new Error('Error al eliminar el usuario: ' + error.message);
    }
  }
}
