import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, FilterCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesRepository } from './categories.repository';
import { ListingParams } from 'src/dto/global.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesRepository) 
    private categoriesRepository: CategoriesRepository,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoriesRepository.insertCategory(createCategoryDto);
  }

  async findAll( 
    listingParams: ListingParams,
  filterCategoryDto: FilterCategoryDto
  ) {
    return await this.categoriesRepository.findAllCategories(listingParams,filterCategoryDto);
  }

  async findOne(id: number) {
    return await this.categoriesRepository.getCategoryById(id);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoriesRepository.updateCategoryById(id,updateCategoryDto);
  }

  async remove(id: number) {
    return await this.categoriesRepository.deleteCategoryById(id);
  }
}
