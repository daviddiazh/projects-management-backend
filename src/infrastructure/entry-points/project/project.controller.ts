import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  Patch,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { IProjectDBRepository } from './project.repository.types';
import { Project } from './entities/project.entity';
import { QueryParamsDto } from '../common/dto/query-params.dto';
import { PatchStatusDto } from './dto/patch-status.dto';

@Controller('project')
export class ProjectController implements IProjectDBRepository {
  constructor(private readonly projectService: ProjectService) {}

  @Post('create')
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get('findAll')
  findAll(@Query() params: QueryParamsDto) {
    return this.projectService.findAll(params);
  }

  @Get('findById/:projectId')
  findById(@Param('projectId') projectId: string): Promise<Project> {
    return this.projectService.findById(projectId);
  }

  @Get('findByBusinessId/:businessId')
  findByBusinessId(
    @Param('businessId') businessId: string,
    @Query() params: QueryParamsDto,
  ): Promise<Project | Project[]> {
    return this.projectService.findByBusinessId(businessId, params);
  }

  @Get('findByUserId/:userId')
  findByUserId(
    @Param('userId') userId: string,
    @Query() params: QueryParamsDto,
  ): Promise<Project | Project[]> {
    return this.projectService.findByUserId(userId, params);
  }

  @Get('findByResponsibleId/:responsibleId')
  findByResponsibleId(
    @Param('responsibleId') responsibleId: string,
    @Query() params: QueryParamsDto,
  ): Promise<Project | Project[]> {
    return this.projectService.findByResponsibleId(responsibleId, params);
  }

  @Put('update/:projectId')
  update(
    @Param('projectId') projectId: string,
    @Body() payload: UpdateProjectDto,
  ): Promise<Project> {
    return this.projectService.update(projectId, payload);
  }

  @Patch('patchStatus/:projectId')
  patchStatus(
    @Param('projectId') projectId: string,
    @Body() payload: PatchStatusDto,
  ): Promise<void> {
    this.projectService.patchStatus(projectId, payload);
    return;
  }

  @Delete('remove/:projectId')
  remove(@Param('projectId') projectId: string): Promise<void> {
    return this.projectService.remove(projectId);
  }
}
