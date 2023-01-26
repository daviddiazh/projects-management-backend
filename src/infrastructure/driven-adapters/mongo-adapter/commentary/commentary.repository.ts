import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentaryDto } from 'src/infrastructure/entry-points/commentary/dto/create-commentary.dto';
import { UpdateCommentaryDto } from 'src/infrastructure/entry-points/commentary/dto/update-commentary.dto';
import { Commentary } from 'src/infrastructure/entry-points/commentary/entities/commentary.entity';
import { QueryParamsDto } from 'src/infrastructure/entry-points/common/dto/query-params.dto';
import { ICommentaryDBRepository } from '../../../entry-points/commentary/commentary.repository.types';
import { CommentarySpec } from './commentary.schema';
import { UserSpec } from '../user/user.schema';

export class CommentaryDBRepository implements ICommentaryDBRepository  {

    constructor(
        @InjectModel('Commentary') private commentaryModel: Model<CommentarySpec>,
        @InjectModel('User') private userModel: Model<UserSpec>,
    ){}

    /**
     * Create a new Commentary
     * @param payload
     * @return a Promise of Commentary
    */
    async create(payload: CreateCommentaryDto): Promise<Commentary> {
        try {
            const newCommentary = await new this.commentaryModel(payload).save();

            return newCommentary;
        } catch (error) {
            console.warn(error);
            throw new BadRequestException('Ocurrió un error al crear el comentario.');
        };
    }

    /**
     * Find All Commentaries
     * @return a Promise of Commentaries
    */
    async findAllByProject(projectId: string, params: QueryParamsDto): Promise<any[]> {
        try {
            const { limit = 5, offset = 0 } = params;

            const commentaries = await this.commentaryModel.find({ projectId })
                .limit( limit )
                .skip( offset )
                .sort({
                    createdAt: -1
                })
                .select('-__v');

            const data = await Promise.all(commentaries.map(async (commentary: any) => {

                const user = await this.userModel.findById({_id: commentary.authorId});

                const { 
                    fullName,
                    email, 
                    profilePicture 
                } = user;

                const {
                    _id,
                    commentary: comment,
                    createdAt,
                } = commentary;

                return {
                    user: {
                        fullName, 
                        email, 
                        profilePicture
                    },
                    commentary: {
                        _id,
                        comment,
                        createdAt,
                    }
                }
            }));

            return data;
        } catch (error) {
            console.warn(error);
            throw new NotFoundException('Ocurrió un error al obtener los comentarios del proyecto.');
        };
    }

    /**
     * Update Commentary
     * @param payload
     * @return a Commentary of Project
    */
    async update(commentaryId: string, payload: UpdateCommentaryDto): Promise<Commentary> {
        const { commentary: commentaryRequest } = payload;
        try {
            const commentaryDB = await this.commentaryModel.findByIdAndUpdate({ _id: commentaryId }, { commentary: commentaryRequest }, {new: true});

            if( !commentaryDB ){
                throw new NotFoundException('No se encontró ningún comentario con el ID registrado.');
            }
            
            return commentaryDB;
        } catch (error) {
            console.warn(error);
            throw new NotFoundException(error.message);
        }
    }

    /**
     * Remove Commentary
     * @param projectId
     * @return a Promise of Commentary
    */
    async remove(commentaryId: string): Promise<void> {
        try {
            const commentary = await this.commentaryModel.findByIdAndDelete({ _id: commentaryId });

            if( !commentary ){
                throw new NotFoundException('No se encontró ningún comentario con ese ID');
            }

            return;
        } catch (error) {
            console.warn(error);
            throw new NotFoundException(error.message);
        }
    }

}