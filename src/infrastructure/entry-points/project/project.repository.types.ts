import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';


export abstract class IProjectDBRepository {
    abstract create(payload: CreateProjectDto): Promise<Project>
    abstract findAll(): Promise<Project[]>;
    abstract findById(projectId: string): Promise<Project>;
    abstract findByBusinessId(businessId: string): Promise<Project[] | Project>;
    abstract findByUserId(userId: string): Promise<Project[] | Project>;
    abstract update(payload: UpdateProjectDto): Promise<Project>;
    abstract remove(projectId: string): Promise<void>;
}