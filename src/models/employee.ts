export interface Employee {
    PersonID: string;
    FirstName: string;
    LastName: string;
    SSN: string;
    LastUpdatedBy: string;
    LastUpdatedDate: Date;
    EmployeeNo: string;
    EmploymentEndDate: Date;
    EmploymentStartDate: Date;
    Status: number;
}

export function createEmptyEmployee(): Employee {
    return {
      PersonID: "",
      FirstName: "",
      LastName: "",
      SSN: "",
      LastUpdatedBy: "",
      LastUpdatedDate: new Date(),
      EmployeeNo: "",
      EmploymentEndDate: new Date(),
      EmploymentStartDate: new Date(),
      Status: 0,
    };
  }