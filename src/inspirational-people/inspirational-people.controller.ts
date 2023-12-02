import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { InspirationalPeopleService } from './inspirational-people.service';
import { CreateInspirationalPersonDto ,FilterOrderBy} from './dto/create-inspirational-person.dto';
import { UpdateInspirationalPersonDto } from './dto/update-inspirational-person.dto';
import { ApiTags } from '@nestjs/swagger';
import { ListingParams } from 'src/dto/global.dto';

@ApiTags('Inspirational People')
@Controller('inspirational-people')
export class InspirationalPeopleController {
  constructor(private readonly inspirationalPeopleService: InspirationalPeopleService) {}

  @Post()
  create(@Body() createInspirationalPersonDto: CreateInspirationalPersonDto) {
    return this.inspirationalPeopleService.create(createInspirationalPersonDto);
  }

  @Get()
  findAll(@Query() listingParams: ListingParams,@Query() filterOrderBy: FilterOrderBy) {
    return this.inspirationalPeopleService.findAll(listingParams,filterOrderBy);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inspirationalPeopleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInspirationalPersonDto: UpdateInspirationalPersonDto) {
    return this.inspirationalPeopleService.update(+id, updateInspirationalPersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inspirationalPeopleService.remove(+id);
  }
}
