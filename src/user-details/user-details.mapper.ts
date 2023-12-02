import { User } from "src/users/entities/user.entity";
import { ResponseDetailsDto } from "./dto/create-user-detail.dto";
import { UserDetail } from "./entities/user-detail.entity";

export const detailListingMapper = function (details: UserDetail[] = []) {
  if (details.length > 0) {
    const modifyDetails = details.map((detail) => {
      const modifyAdress: ResponseDetailsDto = {
        attributes: {
          createdAt: detail?.created_at,
          updatedAt: detail?.updated_at,
        },
        id: detail?.id,
      };
      return modifyAdress;
    });
    return modifyDetails;
  }
  return details;
};

export const detailSingleMapper = function (detail: UserDetail) {
  const data: ResponseDetailsDto = {
    attributes: {
      createdAt: detail?.created_at,
      updatedAt: detail?.updated_at,
    },
    id: detail?.id,
  };

  return data;
};


export const warningsMapper = function (details: UserDetail[],_type: string = null) {

  if (details.length > 0) {
    const modifyDetails = details.map((detail) => {
      const modifyAdress = {
        attributes: {
          user: detail.user_id == null ? null : mapUser(detail.user_id),
        },
        id: detail?.id,
      };
      return modifyAdress;
    });
    return modifyDetails;
  }
  return details;
};


export const mapUser = function (user: User | any) {
  const modifyUser = {
    userId: user?.id,
    name: user.first_name && user.last_name
        ? user.first_name + " " + user.last_name
        : null,
  };
  return modifyUser;
};
