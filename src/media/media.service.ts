import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { MediaRepository } from './media.repository';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(MediaRepository)
    private mediaRepository: MediaRepository,
  ) { }

  async create(fileName, fileUrl) {
    const image = this.mediaRepository.create({
      file_name: fileName,
      file_url: fileUrl,
    })
    return await this.mediaRepository.save(image)
  }

  async createMultiple(files = []) {

    const imagesArray = []
    for (let i = 0; i < files.length; i++) {
      const element = files[i];
      const fileName = element.filename;
      const fileUrl = `${process.env.APP_URL}/files/${element.filename}`;
      const image = this.mediaRepository.create({
        file_name: fileName,
        file_url: fileUrl,
      })
      await this.mediaRepository.save(image)
      imagesArray.push(image);
    }
    return imagesArray;
  }

  findOne(id: number) {
    return `This action returns a #${id} media`;
  }

  update(id: number, updateMediaDto: UpdateMediaDto) {
    return `This action updates a #${id} media`;
  }

  remove(id: number) {
    return `This action removes a #${id} media`;
  }
}
