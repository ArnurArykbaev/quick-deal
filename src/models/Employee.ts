export type EmployeesList = Employee[];

export type Employee = {
  id: string;
  name: string;
  lastname: string;
  surname: string;
  age: number;
  location: string; // Corrected property name to 'location'
  manager: string | Employee;
};
