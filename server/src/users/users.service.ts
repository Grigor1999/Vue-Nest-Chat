
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import {getConnection} from "typeorm";
import { EntityManager } from "typeorm";


@Injectable()
export class UsersService {

    constructor(private entityManager: EntityManager,@InjectRepository(User) private usersRepository: Repository<User>) { }

    // async getUsers(user: User): Promise<User[]> {
    //     return await this.usersRepository.find();
    // }

    // async getUser(_id: number): Promise<User[]> {
    //     return await this.usersRepository.find({
    //         select: ["email","password","fullName", "birthday", "isActive"],
    //         where: [{ "id": _id }]
    //     });
    // }
    async getUserByEmail(_email: string): Promise<any> {
        return await this.usersRepository.find({
            where: [{ "email": _email }]
        });
    }
    async updateUser(user: User) {
        this.usersRepository.save(user)
    }

    async deleteUser(user: User) {
        this.usersRepository.delete(user);
    }
    async createUser(user:User) {
        const result = await this.usersRepository.save(user);
        return result;
    }
    async activateUser(id: any){
        this.entityManager.query(`UPDATE user SET isActive=true where MD5(id)='${id}'`);

        // await getConnection()
        // .createQueryBuilder()
        // .update(User)
        // .set({ 
        //     isActive: true, 
          
        // })
        // .where("MD5(id) = :id", { id: id })
        // .execute();
    }

}