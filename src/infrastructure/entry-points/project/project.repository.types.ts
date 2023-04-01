import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { QueryParamsDto } from '../common/dto/query-params.dto';
import { PatchStatusDto } from './dto/patch-status.dto';

export abstract class IProjectDBRepository {
  abstract create(payload: CreateProjectDto): Promise<Project>;
  abstract findAll(params: QueryParamsDto): Promise<Project[]>;
  abstract findById(projectId: string): Promise<Project>;
  abstract findByBusinessId(
    businessId: string,
    params: QueryParamsDto,
  ): Promise<Project[] | Project>;
  abstract findByUserId(
    userId: string,
    params: QueryParamsDto,
  ): Promise<Project[] | Project>;
  abstract patchStatus(
    projectId: string,
    payload: PatchStatusDto,
  ): Promise<void>;
  abstract update(
    projectId: string,
    payload: UpdateProjectDto,
  ): Promise<Project>;
  abstract remove(projectId: string): Promise<void>;
}
