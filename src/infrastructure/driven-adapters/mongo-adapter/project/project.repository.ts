import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from 'src/infrastructure/entry-points/project/dto/create-project.dto';
import { UpdateProjectDto } from 'src/infrastructure/entry-points/project/dto/update-project.dto';
import { Project } from 'src/infrastructure/entry-points/project/entities/project.entity';
import { IProjectDBRepository } from '../../../entry-points/project/project.repository.types';
import { ProjectSpec } from './project.schema';
import { QueryParamsDto } from '../../../entry-points/common/dto/query-params.dto';
import { PatchStatusDto } from '../../../entry-points/project/dto/patch-status.dto';

export class ProjectDBRepository implements IProjectDBRepository {
  constructor(
    @InjectModel('Project') private projectModel: Model<ProjectSpec>,
  ) {}

  /**
   * Create a new Project
   * @param payload
   * @return a Promise of Project
   */
  async create(payload: CreateProjectDto): Promise<Project> {
    try {
      const newProject = await new this.projectModel(payload).save();

      return newProject;
    } catch (error) {
      console.warn(error);
      throw new BadRequestException('Ocurrió un error al crear el proyecto.');
    }
  }

  /**
   * Find All Projects
   * @return a Promise of Projects
   */
  async findAll(params: QueryParamsDto): Promise<Project[]> {
    try {
      const { limit = 10, offset = 0 } = params;

      const projects = await this.projectModel
        .find()
        .limit(limit)
        .skip(offset)
        .sort({
          createdAt: -1,
        })
        .select('-__v');

      return projects;
    } catch (error) {
      console.warn(error);
      throw new BadRequestException(
        'Ocurrió un error al obtener los proyectos.',
      );
    }
  }

  /**
   * Find Project By Id
   * @param projectId
   * @return a Promise of Project
   */
  async findById(projectId: string): Promise<Project> {
    try {
      const project = await this.projectModel.findById(projectId);

      if (!project) {
        throw new NotFoundException('Proyecto no encontrado.');
      }

      return project;
    } catch (error) {
      console.warn(error);
      throw new NotFoundException('Proyecto no encontrado.');
    }
  }

  /**
   * Find Project By Bussines Id
   * @param businessId
   * @return a Promise of Project
   */
  async findByBusinessId(
    businessId: string,
    params: QueryParamsDto,
  ): Promise<Project | Project[]> {
    try {
      const { limit = 10, offset = 0 } = params;

      const projects = await this.projectModel
        .find({ businessId })
        .limit(limit)
        .skip(offset)
        .sort({
          createdAt: -1,
        })
        .select('-__v');

      if (!projects) {
        throw new NotFoundException(
          'No se encontraron proyectos con el ID del negocio.',
        );
      }

      return projects;
    } catch (error) {
      console.warn(error);
      throw new NotFoundException(
        'No se encontraron proyectos con el ID del negocio.',
      );
    }
  }

  /**
   * Find Project By User Id
   * @param userId
   * @return a Promise of Project
   */
  async findByUserId(
    userId: string,
    params: QueryParamsDto,
  ): Promise<Project | Project[]> {
    try {
      const { limit = 10, offset = 0 } = params;

      const projects = await this.projectModel
        .find({ authorId: userId })
        .limit(limit)
        .skip(offset)
        .sort({
          createdAt: -1,
        })
        .select('-__v');

      if (!projects) {
        throw new NotFoundException(
          'No se encontraron proyectos con el ID del usuario.',
        );
      }

      return projects;
    } catch (error) {
      console.warn(error);
      throw new NotFoundException(
        'No se encontraron proyectos con el ID del usuario.',
      );
    }
  }

  /**
   * Find Project By Responsibles Id
   * @param responsibleId
   * @return a Promise of Project
   */
  async findByResponsibleId(
    responsibleId: string,
    params: QueryParamsDto,
  ): Promise<Project | Project[]> {
    try {
      const { limit = 10, offset = 0 } = params;

      const projects = await this.projectModel
        .find({ responsiblesId: responsibleId })
        .limit(limit)
        .skip(offset)
        .sort({
          createdAt: -1,
        })
        .select('-__v');

      if (!projects) {
        throw new NotFoundException(
          'No se encontraron proyectos con el ID del usuario.',
        );
      }

      return projects;
    } catch (error) {
      console.warn(error);
      throw new NotFoundException(
        'No se encontraron proyectos con el ID del usuario.',
      );
    }
  }

  /**
   * Update Project
   * @param payload
   * @return a Promise of Project
   */
  async patchStatus(projectId: string, payload: PatchStatusDto): Promise<void> {
    try {
      const project = await this.projectModel.findByIdAndUpdate(
        { _id: projectId },
        {
          status: payload.newStatus,
        },
        {
          new: true,
        },
      );

      if (!project) {
        throw new NotFoundException(
          'No se encontró ningún proyecto con el ID registrado.',
        );
      }
    } catch (error) {
      console.warn(error);
      throw new NotFoundException(error.message);
    }
  }

  /**
   * Update Project
   * @param payload
   * @return a Promise of Project
   */
  async update(projectId: string, payload: UpdateProjectDto): Promise<Project> {
    try {
      const project = await this.projectModel.findByIdAndUpdate(
        { _id: projectId },
        {
          status: payload.newStatus,
        },
        {
          new: true,
        },
      );

      if (!project) {
        throw new NotFoundException(
          'No se encontró ningún proyecto con el ID registrado.',
        );
      }

      return project;
    } catch (error) {
      console.warn(error);
      throw new NotFoundException(error.message);
    }
  }

  /**
   * Remove Project
   * @param projectId
   * @return a Promise of Project
   */
  async remove(projectId: string): Promise<void> {
    try {
      const project = await this.projectModel.findByIdAndDelete({
        _id: projectId,
      });

      if (!project) {
        throw new NotFoundException(
          'No se encontró ningún proyecto con el ID registrado.',
        );
      }

      return;
    } catch (error) {
      console.warn(error);
      throw new NotFoundException(error.message);
    }
  }
}
