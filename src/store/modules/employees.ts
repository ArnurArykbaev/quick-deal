import mutations from "./mutations";
import { EmployeesList, Employee } from "@/models/Employee";

const { ADD_EMPLOYEE } = mutations;

interface EmployeesStoreState {
  employees: EmployeesList;
}

const employeesStore = {
  state: {
    employees: [] as EmployeesList,
  },
  getters: {
    employees: ({ employees }: EmployeesStoreState) => employees,
  },
  mutations: {
    [ADD_EMPLOYEE](state: EmployeesStoreState, newEmployee: Employee) {
      state.employees.push(newEmployee);

      console.log("START", state.employees);
    },
  },
  actions: {
    setEmployee({ commit }: { commit: any }, newEmployee: Employee) {
      commit(ADD_EMPLOYEE, newEmployee);
    },
  },
};

export default employeesStore;
