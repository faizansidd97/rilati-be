import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { CareerService } from "./career.service";
import {
  CreateCareerDto,
  FilterCareerDto,
  UpdateCountDto,
} from "./dto/create-career.dto";
import { UpdateCareerDto } from "./dto/update-career.dto";
import { ApiTags } from "@nestjs/swagger";
import { ApiAuthPermission } from "src/decorators/api-permissions.decorator";
import { ListingParams } from "src/dto/global.dto";
import { CurrentUser } from "src/users/auth/jwt/jwt.strategy";
import { User } from "src/users/entities/user.entity";

@ApiTags("Career")
@Controller("career")
export class CareerController {
  constructor(private readonly careerService: CareerService) {}

  @Post()
  @ApiAuthPermission(true)
  create(@Body() createCareerDto: CreateCareerDto) {
    return this.careerService.create(createCareerDto);
  }

  @Get()
  // @ApiAuthPermission(false)
  findAll(
    @Query() listingParams: ListingParams,
    @Query() filterCareerDto: FilterCareerDto
  ) {
    return this.careerService.findAll(listingParams, filterCareerDto);
  }

  @Get(":id")
  // @ApiAuthPermission(true)sd
  findOne(@Param("id") id: string) {
    return this.careerService.findOne(+id);
  }

  @Patch(":id")
  @ApiAuthPermission(true)
  update(@Param("id") id: string, @Body() updateCareerDto: UpdateCareerDto) {
    return this.careerService.update(+id, updateCareerDto);
  }

  @Patch("update-count/:id")
  @ApiAuthPermission(true)
  updateCount(
    @Param("id") id: string,
    @CurrentUser() user: User,
    @Body() updateCountDto: UpdateCountDto
  ) {
    return this.careerService.updateCount(+id, updateCountDto, user);
  }

  @Delete(":id")
  @ApiAuthPermission(true)
  remove(@Param("id") id: string) {
    return this.careerService.remove(+id);
  }
}
