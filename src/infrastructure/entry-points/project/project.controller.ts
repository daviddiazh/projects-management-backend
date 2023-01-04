import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { IProjectDBRepository } from './project.repository.types';
import { Project } from './entities/project.entity';
import { QueryParamsDto } from '../common/dto/query-params.dto';

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
  findAll( @Query() params: QueryParamsDto ) {
    return this.projectService.findAll(params);
  }

  @Get('findById/:projectId')
  findById(@Param('projectId') projectId: string): Promise<Project> {
    return this.projectService.findById(projectId);
  }

  //TODO: Make a pagination in this endpoint
  @Get('findByBusinessId/:businessId')
  findByBusinessId(@Param('businessId') businessId: string): Promise<Project | Project[]> {
    return this.projectService.findByBusinessId(businessId);
  }
  
  //TODO: Make a pagination in this endpoint
  @Get('findByUserId/:userId')
  findByUserId(@Param('userId') userId: string): Promise<Project | Project[]> {
    return this.projectService.findByUserId(userId);
  }
  
  @Put('update')
  update(@Body() payload: UpdateProjectDto): Promise<Project> {
    return this.projectService.update(payload);
  }
  
  @Delete('remove/:projectId')
  remove(@Param('projectId') projectId: string): Promise<void> {
    return this.projectService.remove(projectId);
  }

}
