import { BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from 'src/infrastructure/entry-points/project/dto/create-project.dto';
import { UpdateProjectDto } from 'src/infrastructure/entry-points/project/dto/update-project.dto';
import { Project } from 'src/infrastructure/entry-points/project/entities/project.entity';
import { IProjectDBRepository } from '../../../entry-points/project/project.repository.types';
import { ProjectSpec } from './project.schema';


export class ProjectDBRepository implements IProjectDBRepository {

    constructor(
        @InjectModel('Project') private projectModel: Model<ProjectSpec>
    ){}

    /**
     * Create a new Project
     * @param payload
     * @return a Promise of Project
    */
    async create(payload: CreateProjectDto): Promise<Project> {
        try {
            //TODO: Add validations and return erros

            const newProject = await new this.projectModel(payload).save();

            return newProject;
        } catch (error) {
            console.warn(error);
            throw new BadRequestException('Ocurrio un error al crear el proyecto.');
        }
    }

    /**
     * Find All Projects
     * @return a Promise of Projects
    */
    async findAll(): Promise<Project[]> {
        try {
            const projects = await this.projectModel.find().exec();

            return projects;
        } catch (error) {
            console.warn(error);
            throw new BadRequestException('Ocurrio un error al obtener los proyecto.');
        }
    }

    /**
     * Find Project By Id
     * @param projectId
     * @return a Promise of Project
    */
    findById(projectId: string): Promise<Project> {
        //TODO: Make this use case
        throw new Error('Method not implemented.');
    }

    /**
     * Find Project By Bussines Id
     * @param businessId
     * @return a Promise of Project
    */
    findByBusinessId(businessId: string): Promise<Project | Project[]> {
        //TODO: Make this use case
        throw new Error('Method not implemented.');
    }

    /**
     * Find Project By User Id
     * @param userId
     * @return a Promise of Project
    */
    findByUserId(userId: string): Promise<Project | Project[]> {
        //TODO: Make this use case
        throw new Error('Method not implemented.');
    }

    /**
     * Update Project
     * @param payload
     * @return a Promise of Project
    */
    update(payload: UpdateProjectDto): Promise<Project> {
        //TODO: Make this use case
        throw new Error('Method not implemented.');
    }
    
    /**
     * Remove Project
     * @param projectId
     * @return a Promise of Project
    */
    remove(projectId: string): Promise<void> {
        //TODO: Make this use case
        throw new Error('Method not implemented.');
    }

}