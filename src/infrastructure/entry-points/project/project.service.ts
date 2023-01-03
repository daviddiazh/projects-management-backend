import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectDBRepository } from '../../driven-adapters/mongo-adapter/project/project.repository';
import { IProjectDBRepository } from './project.repository.types';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService implements IProjectDBRepository {

  constructor(
    private readonly projectRepository: ProjectDBRepository,
  ){}

  create(createProjectDto: CreateProjectDto) {
    return this.projectRepository.create(createProjectDto);
  }

  findAll() {
    return this.projectRepository.findAll();
  }

  findById(projectId: string): Promise<Project> {
    return this.projectRepository.findById(projectId);
  }

  findByBusinessId(businessId: string): Promise<Project | Project[]> {
    return this.projectRepository.findByBusinessId(businessId);
  }

  findByUserId(userId: string): Promise<Project | Project[]> {
    return this.projectRepository.findByUserId(userId);
  }
  
  update(payload: UpdateProjectDto): Promise<Project> {
    throw new Error('Method not implemented.');
  }
  
  remove(projectId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

}
