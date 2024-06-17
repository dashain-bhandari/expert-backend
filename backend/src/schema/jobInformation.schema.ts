import { object, number, string, TypeOf, any,array } from "zod";

const payload = {
  body: object({
    position: string({
      required_error: "Position is required",
    }),

    jobType: string({
      required_error: "Job type is required",
    }),

    timing: string({
      required_error: "Timing is required",
    }),

    jobDuties: array(string({  // Define array of strings
      required_error: "Job duties is required",
    })),

    qualification: array(string({
      required_error: "Qualification is required",
    })),
    salary: string({
      required_error: "Salary is required",
    }),


})
};

export const createJobInformationSchema = object({
  ...payload,
});

export const deleteJobInformationSchema = object({
  params: object({
    jobId: string(),
  }),
});




export const getJobInformationSchema = object({
  params: object({
    jobId: string(),
  }),
});

export const updateJobInformationSchema=object({
  params:object({
    jobId:string()
  })
})

export type CreateJobInformationInput = TypeOf<typeof createJobInformationSchema>;
export type ReadJobInformationInput = TypeOf<typeof getJobInformationSchema>;
export type DeleteJobInformationInput = TypeOf<typeof deleteJobInformationSchema>;
export type UpdateJobInformationInput=TypeOf<typeof updateJobInformationSchema>;