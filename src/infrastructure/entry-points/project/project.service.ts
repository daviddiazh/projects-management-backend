import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectDBRepository } from '../../driven-adapters/mongo-adapter/project/project.repository';
import { IProjectDBRepository } from './project.repository.types';
import { Project } from './entities/project.entity';
import { QueryParamsDto } from '../common/dto/query-params.dto';

@Injectable()
export class ProjectService implements IProjectDBRepository {

  constructor(
    private readonly projectRepository: ProjectDBRepository,
  ){}

  create(createProjectDto: CreateProjectDto) {
    return this.projectRepository.create(createProjectDto);
  }

  findAll(params: QueryParamsDto) {
    return this.projectRepository.findAll(params);
  }

  findById(projectId: string): Promise<Project> {
    return this.projectRepository.findById(projectId);
  }

  findByBusinessId(businessId: string, params: QueryParamsDto): Promise<Project | Project[]> {
    return this.projectRepository.findByBusinessId(businessId, params);
  }

  findByUserId(userId: string, params: QueryParamsDto): Promise<Project | Project[]> {
    return this.projectRepository.findByUserId(userId, params);
  }

  findByResponsibleId(resonsibleId: string, params: QueryParamsDto): Promise<Project | Project[]>{
    return this.projectRepository.findByResponsibleId(resonsibleId, params);
  }
  
  update(payload: UpdateProjectDto): Promise<Project> {
    return this.projectRepository.update(payload);
  }
  
  remove(projectId: string): Promise<void> {
    return this.projectRepository.remove(projectId);
  }

}
