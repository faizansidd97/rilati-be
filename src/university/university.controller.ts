import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UniversityService } from './university.service';
import { CreateUniversityDto, FilterUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { ApiTags } from '@nestjs/swagger';
import { ListingParams } from 'src/dto/global.dto';
import { ApiAuthPermission } from 'src/decorators/api-permissions.decorator';

@ApiTags('University')
@Controller('university')
export class UniversityController {
  constructor(private readonly universityService: UniversityService) {}

  @Post()
  // @ApiAuthPermission(true)
  create(@Body() createUniversityDto: CreateUniversityDto) {
    return this.universityService.create(createUniversityDto);
  }

  @Get('/apply-seeder')
  findSeeds(){
    return this.universityService.applySeeder()
  }

  @Get()
  // @ApiAuthPermission(true)
  findAll(
    @Query() listingParams: ListingParams,
    @Query() filterUniversityDto: FilterUniversityDto
  ) {
    return this.universityService.findAll(listingParams,filterUniversityDto);
  }

  @Get(':id')
  @ApiAuthPermission(true)
  findOne(@Param('id') id: string) {
    return this.universityService.findOne(+id);
  }

  @Patch(':id')
  // @ApiAuthPermission(true)
  update(@Param('id') id: string, @Body() updateUniversityDto: UpdateUniversityDto) {
    return this.universityService.update(+id, updateUniversityDto);
  }

  @Delete(':id')
  // @ApiAuthPermission(true)
  remove(@Param('id') id: string) {
    return this.universityService.remove(+id);
  }
}
