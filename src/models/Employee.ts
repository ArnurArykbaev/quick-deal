export type EmployeesList = Employee[];

export type Employee = {
  id: string;
  name: string;
  lastname: string;
  surname: string;
  age: number;
  location: string[] | number[];
  manager: string | Employee;
};
