import { ResponseRolesDto } from './dto/roles.dto';
import { Roles } from './entities/roles.entity';



export const rolesListingMapper = function (roles: Roles[] = []) {
    if (roles.length > 0) {
        const modifyRoles = roles.map((role) => {
            const modifyRole: ResponseRolesDto = {
                attributes: {
                    name: role?.name,
                    type: role?.type,
                    slug: role?.slug,
                    createdAt: role?.created_at,
                    updatedAt: role?.updated_at,
                },
                id: role?.id,
            };
            return modifyRole;
        });
        return modifyRoles;
    }
    return roles;
};


export const roleSingleMapper = function (role: Roles) {
    const data: ResponseRolesDto = {
        attributes: {
            name: role?.name,
            type: role?.type,
            slug: role?.slug,
            createdAt: role?.created_at,
            updatedAt: role?.updated_at,
        },
        id: role?.id,
    };
    return data;
};
