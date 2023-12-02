
import { Roles } from "src/roles/entities/roles.entity";
import { UserDetail } from "src/user-details/entities/user-detail.entity";
import { ResponseUserDto } from "./dto/reponse-dto";
import { User } from "./entities/user.entity";

export const loginMapper = (payload: { token: any; user: any }) => {
  const { user, token } = payload;
  return {
    token: token,
    user: {
      id: user.id,
      name: user?.name,
      firstName: user?.first_name,
      lastName: user?.last_name,
      email: user?.email,
      status: user?.status,
      createdAt: user?.created_at,
      updatedAt: user?.updated_at,
      role: user.role_id == null ? null : roleSingleMapper(user.role_id),
    },
  };
};


export const singleUserListingMaper = function (user: User, role = null) {
  return {
    attributes: {
      name: user?.name,
      firstName: user?.first_name,
      lastName: user?.last_name,
      email: user?.email,
      status: user?.status,
      createdAt: user?.created_at,
      updatedAt: user?.updated_at,
      role: role == null ? null : roleSingleMapper(role),
    },
    id: user.id.toString(),
  };
};

export const universityListingMapper = function (university = []) {
  if (university.length > 0) {
    const modifyuniversity = university.map((user) => {
      const modifyUniversity = {
        attributes: {
          uni_number: user?.uni_number,
          name: user?.name,
          state: user?.state,
          link: user?.link,
          address: user?.address,
          email: user?.email,
          phone: user?.phone,
          rto_number: user?.rto_number,
          teqsa: user?.teqsa,
          cricos: user?.cricos,
          category: user?.category == null ? null : categoryMapper(user?.category),
          image: user?.image,
          createdAt: user?.created_at,
          updatedAt: user?.updated_at
        },
        id: user?.id,
      };
      return modifyUniversity;
    });
    return modifyuniversity;
  }
  return university;
};

export const categorySingleMapper = function (category) {
  if(category){
    const modifcategory = {
      attributes: {
        name: category?.name,
        type: category?.type,
        createdAt: category?.created_at,
        updatedAt: category?.updated_at
      },
      id: category?.id,
    };
    return modifcategory;
  }
  return category;
};

export const categoryMapper = function (categories = []) {
  if (categories.length > 0) {
    const modifycategory = categories.map((user) => {
      const modifycategory = {
        attributes: {
          name: user?.category_id?.name,
          type: user?.category_id?.type,
          createdAt: user?.category_id?.created_at,
          updatedAt: user?.category_id?.updated_at
        },
        id: user?.category_id?.id,
      };
      return modifycategory;
    });
    return modifycategory;
  }
  return categories;
};

export const subjectIndustyMapper = function (castinger) {
  if (castinger.length > 0) {
    const modifiedCaster = castinger.map((cast) => {
      const modifiedCast = {
        attributes: {
          name: cast?.industry_id?.name || cast?.subject_id?.name,
          type: cast?.type,
        },
        id: cast?.industry_id?.id || cast?.subject_id?.id,
      };
      return modifiedCast;
    });
    return modifiedCaster;
  }
  return castinger;
};



export const categoryListingMapper = function (categories = []) {
  console.log(categories);
  if (categories.length > 0) {
    const modifycategory = categories.map((user) => {
      const modifycategory = {
        attributes: {
          name: user?.name,
          type: user?.type,
          createdAt: user?.created_at,
          updatedAt: user?.updated_at
        },
        id: user?.id,
      };
      return modifycategory;
    });
    return modifycategory;
  }
  return categories;
};


export const careerSingleMapper = function (career) {
  if(career){
    const modifcareer = {
      attributes: {
        title: career[0]?.title,
        average_salary: career[0]?.average_salary,
        average_salary_aud: career[0]?.average_salary_aud,
        job_description: career[0]?.job_description,
        career_number: career[0]?.career_number,
        youtube: career[0]?.youtube,
        universities:career[0]?.universities,
        categories: career[0]?.category == null ? null : categoryMapper(career[0]?.category),
        education_categories: career[0]?.educationCategory == null ? null : categoryMapper(career[0]?.educationCategory),
        career_category: career[0]?.career_category,
        student_intrest: career[0]?.student_intrest,
        skills_transferable: career[0]?.skills_transferable,
        years_needed: career[0]?.years_needed,
        description_study: career[0]?.description_study,
        admission_rank: career[0]?.admission_rank,
        average_gpa: career[0]?.average_gpa,
        internship_needed: career[0]?.internship_needed,
        cost_course: career[0]?.cost_course,
        precision_work: career[0]?.precision_work,
        job_satisfaction: career[0]?.job_satisfaction,
        job_stress: career[0]?.job_stress,
        work_hours: career[0]?.work_hours,
        work_life_balance: career[0]?.work_life_balance,
        scope_of_skill: career[0]?.scope_of_skill,
        autonomy: career[0]?.autonomy,
        repetitive_tedious: career[0]?.repetitive_tedious,
        physical_stress: career[0]?.physical_stress,
        mental_stress: career[0]?.mental_stress,
        team_reliance: career[0]?.team_reliance,
        status_in_company: career[0]?.status_in_company,
        risk_to_health: career[0]?.risk_to_health,
        risk_to_life: career[0]?.risk_to_life,
        people_interaction: career[0]?.people_interaction,
        job_help_people: career[0]?.job_help_people,
        job_help_environment: career[0]?.job_help_environment,
        potential: career[0]?.potential,
        study_for_australia: career[0]?.study_for_australia,
        fastest_growing: career[0]?.fastest_growing,
        tags: career[0]?.tags,
        image: career[0]?.image,
        like_count: career[0]?.like_count === null ? 0 : career[0]?.like_count,
        view_count: career[0]?.view_count === null ? 0 : career[0]?.view_count,
        share_count: career[0]?.share_count === null ? 0 : career[0]?.share_count,
        createdAt: career[0]?.created_at,
        updatedAt: career[0]?.updated_at
      },
      id: career[0]?.id,
    };
    return modifcareer;
  }
  return career;
};

export const careerListingMapper = function (careers = []) {
  if (careers.length > 0) {
    const modifycareers = careers.map((career) => {
      const modifycareer = {
        attributes: {
          title: career?.title,
          image: career?.image,
          average_salary: career?.average_salary,
          youtube: career?.youtube,
          career_number: career?.career_number,
          universities:career?.universities,
          average_salary_aud: career?.average_salary_aud,
          job_description: career?.job_description,
          categories: career?.category == null ? null : categoryMapper(career?.category),
          education_categories: career?.educationCategory == null ? null : categoryMapper(career?.educationCategory),
          career_category: career?.career_category,
          student_intrest: career?.student_intrest,
          skills_transferable: career?.skills_transferable,
          years_needed: career?.years_needed,
          description_study: career?.description_study,
          admission_rank: career?.admission_rank,
          average_gpa: career?.average_gpa,
          internship_needed: career?.internship_needed,
          cost_course: career?.cost_course,
          precision_work: career?.precision_work,
          job_satisfaction: career?.job_satisfaction,
          job_stress: career?.job_stress,
          work_hours: career?.work_hours,
          work_life_balance: career?.work_life_balance,
          scope_of_skill: career?.scope_of_skill,
          autonomy: career?.autonomy,
          repetitive_tedious: career?.repetitive_tedious,
          physical_stress: career?.physical_stress,
          mental_stress: career?.mental_stress,
          team_reliance: career?.team_reliance,
          status_in_company: career?.status_in_company,
          risk_to_health: career?.risk_to_health,
          risk_to_life: career?.risk_to_life,
          people_interaction: career?.people_interaction,
          job_help_people: career?.job_help_people,
          job_help_environment: career?.job_help_environment,
          potential: career?.potential,
          study_for_australia: career?.study_for_australia,
          fastest_growing: career?.fastest_growing,
          tags: career?.tags,
          like_count: career?.like_count === null ? 0 : career?.like_count,
          view_count: career?.view_count === null ? 0 : career?.view_count,
          share_count: career?.share_count === null ? 0 : career?.share_count,
          userLike:career?.userLike,
          createdAt: career?.created_at,
          updatedAt: career?.updated_at
        },
        id: career?.id,
      };
      return modifycareer;
    });
    return modifycareers;
  }
  return careers;
};

export const universitySingleMapper = function (university) {
  if(university){
    const modifyUniversity = {
      attributes: {
        uni_number: university?.uni_number,
        name: university?.name,
        state: university?.state,
        link: university?.link,
        address: university?.address,
        email: university?.email,
        phone: university?.phone,
        rto_number: university?.rto_number,
        teqsa: university?.teqsa,
        agriculture_environment: university?.agriculture_environment,
        architecture: university?.architecture,
        creative_arts: university?.creative_arts,
        education: university?.education,
        engineering: university?.engineering,
        health: university?.health,
        information_technology: university?.information_technology,
        management: university?.management,
        natural: university?.natural,
        society: university?.society,
        tourism: university?.tourism,
        cricos: university?.cricos,
        rto_provider: university?.rto_provider,
        image: university?.image,
        category: university?.category == null ? null : categoryMapper(university?.category),
        createdAt: university?.created_at,
        updatedAt: university?.updated_at
      },
      id: university?.id,
    };
    return modifyUniversity;
  }
  return university;
};

export const usersListingMapper = function (users = []) {
  if (users.length > 0) {
    const modifyusers = users.map((user) => {
      const modifyUser: ResponseUserDto = {
        attributes: {
          name: user?.name,
          firstName: user?.first_name,
          lastName: user?.last_name,
          email: user?.email,
          status: user?.status,
          createdAt: user?.created_at,
          updatedAt: user?.updated_at,
          industry:user?.industry == null ? null : subjectIndustyMapper(user?.industry),
          subject:user?.subject == null ? null : subjectIndustyMapper(user?.subject),
          details: user.detail == null ? null : detailSingleMapper(user.detail),
          role: user.role_id == null ? null : roleSingleMapper(user.role_id),
        },
        id: user?.id,
      };
      return modifyUser;
    });
    return modifyusers;
  }
  return users;
};

export const userSingleMapper = function (user: User) {
  const data = {
    attributes: {
      name: user?.name,
      firstName: user?.first_name,
      lastName: user?.last_name,
      email: user?.email,
      status: user?.status,
      createdAt: user?.created_at,
      updatedAt: user?.updated_at,
      industry:user?.industry == null ? null : subjectIndustyMapper(user?.industry),
      subject:user?.subject == null ? null : subjectIndustyMapper(user?.subject),
      details: user.detail == null ? null : detailSingleMapper(user.detail),
      role: user.role_id == null ? null : roleSingleMapper(user.role_id),
    },
    id: user?.id,
  };

  return data;
};




export const userAuthMeMapper = (user: User) => {
  const data = {
    name: user?.name,
    firstName: user?.first_name,
    lastName: user?.last_name,
    email: user?.email,
    status: user?.status,
    createdAt: user?.created_at,
    updatedAt: user?.updated_at,
    industry:user?.industry == null ? null : subjectIndustyMapper(user?.industry),
    subject:user?.subject == null ? null : subjectIndustyMapper(user?.subject),
    details: user.detail == null ? null : detailSingleMapper(user.detail),
    role: user.role_id == null ? null : roleSingleMapper(user.role_id),

    id: user?.id,
  };

  return data;
};

export const roleSingleMapper = function (role: Roles) {
  const data = {
    id: role?.id,
    name: role?.name,
    type: role?.type,
    slug: role?.slug,
  };
  return data;
};

export const detailSingleMapper = function (detail: UserDetail) {
  const data = {
    id: detail?.id,
    avatar: detail?.avatar,
    phone: detail?.phone,
    address: detail?.address,
    city: detail?.city,
    state: detail?.state,
    country: detail?.country,
    my_atar: detail?.my_atar,
    confident_skills: JSON.parse(detail?.confident_skills),
    personal_trait: detail?.personal_trait,
    education_stage: detail?.education_stage,
    start_working: detail?.start_working,
    newsletter: detail?.newsletter,
    createdAt: detail?.created_at,
    updatedAt: detail?.updated_at,
  };

  return data;
};

export const addressListingMapper = function (addresses) {
  if (addresses.length > 0) {
    const modifyAdresses = addresses.map((address) => {
      const modifyAdress = {
        id: address?.id,
        city: address?.city,
        zip: address?.zip,
        state: address?.state,
        country: address?.country,
        address: address?.address,
        createdAt: address?.created_at,
        updatedAt: address?.updated_at,
      };
      return modifyAdress;
    });
    return modifyAdresses;
  }
  return addresses;
};

export const addressMapper = (addresses) => {
  let addresssObject = {};
  if (addresses.length > 0) {
    addresses.map((address) => {
        addresssObject = {
          address: address?.address,
          city: address?.city,
          zip: address?.zip,
          state: address?.state,
        };
    });
  }
  return addresssObject;
};

export const filesListingMapper = function (files = []) {
  if (files.length > 0) {
    const modifyFiles = files.map((file) => {
      const modifyFile = {
        url: file,
        name: makeTitle(file?.split("/").pop()).split(".")[0],
      };
      return modifyFile;
    });
    return modifyFiles;
  }
  return files;
};

function makeTitle(slug) {
  var words = slug.split("-");

  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    words[i] = word.charAt(0).toUpperCase() + word.slice(1);
  }

  return words.join(" ");
}

export const userListingMapperForAuditor = function (users = []) {
  if (users.length > 0) {
    const modifyusers = users.map((user) => {
      const modifyUser = {
        attributes: {
          firstName: user?.user_id?.first_name,
          lastName: user?.user_id?.last_name,
          email: user?.user_id?.email,
          status: user?.user_id?.status,
          createdAt: user?.user_id?.created_at,
          updatedAt: user?.user_id?.updated_at,
        },
        id: user?.user_id?.id,
      };
      return modifyUser;
    });
    return modifyusers;
  }
  return users;
};
