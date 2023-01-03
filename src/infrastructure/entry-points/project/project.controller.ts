import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { IProjectDBRepository } from './project.repository.types';
import { Project } from './entities/project.entity';

@Controller('project')
export class ProjectController implements IProjectDBRepository {
  
  constructor(
    private readonly projectService: ProjectService
  ){}

  @Post('create')
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get('findAll')
  findAll() {
    return this.projectService.findAll();
  }

  @Post('findById')
  findById(@Body() payload: any): Promise<Project> {
    const { projectId } = payload;
    return this.projectService.findById(projectId);
  }

  @Post('findByBusinessId')
  findByBusinessId(@Body() payload: any): Promise<Project | Project[]> {
    const { businessId } = payload;
    return this.projectService.findByBusinessId(businessId);
  }
  
  findByUserId(userId: string): Promise<Project | Project[]> {
    throw new Error('Method not implemented.');
  }
  
  update(payload: UpdateProjectDto): Promise<Project> {
    throw new Error('Method not implemented.');
  }
  
  remove(projectId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

}
