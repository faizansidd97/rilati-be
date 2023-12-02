import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  UploadedFiles,
  Req,
} from '@nestjs/common';
import { ApiConsumes, ApiBody, ApiTags } from '@nestjs/swagger';
import { MediaService } from './media.service';
import { Express } from 'express';
import {
  FileInterceptor,
  FilesInterceptor,
  FileFieldsInterceptor,
} from '@nestjs/platform-express';
import { storage } from '../helpers/file.helper';
import { ApiAuthPermission } from 'src/decorators/api-permissions.decorator';

@Controller('media')
@ApiTags('Media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) { }

  @Post('file')
  @ApiAuthPermission(true)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })

  @UseInterceptors(FileInterceptor('file', { storage: storage }))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req) {
    const fileName = file.filename;
    const fileUrl = `${process.env.APP_URL}/files/${file.filename}`;
    return this.mediaService.create(fileName, fileUrl)
  }

  @Post('files')
  @ApiAuthPermission(true)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })

  @UseInterceptors(FilesInterceptor('files', 20, { storage: storage }))
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>, @Req() req) {
    return this.mediaService.createMultiple(files)
  }

}
