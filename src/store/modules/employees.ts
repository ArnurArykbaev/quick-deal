import mutations from "./mutations";
import { EmployeesList, Employee } from "@/models/Employee";

const { ADD_EMPLOYEE, DELETE_EMPLOYEE } = mutations;

interface EmployeesStoreState {
  employees: EmployeesList;
}

const employeesStore = {
  state: {
    employees: [
      {
        id: "id-076573",
        name: "Андрей",
        lastname: "Емельянов",
        surname: "Константинович",
        age: 28,
        location: [56.83814985984784, 60.59831422291686],
        manager: "",
      },
      {
        id: "id-195554",
        name: "Зинаида",
        lastname: "Кузнецова",
        surname: "Викторовна",
        age: 62,
        location: [56.83839390277052, 60.54847468914913],
        manager: "id-076573",
        _showDetails: false,
      },
      {
        id: "id-269884",
        name: "Петр",
        lastname: "Шкляев",
        surname: "Константинович",
        age: 46,
        location: [56.83839390275087, 60.85847468916845],
        manager: "id-195554",
      },
      {
        id: "id-33633",
        name: "Ксения",
        lastname: "Ефимова",
        surname: "Григорьевна",
        age: 23,
        location: [56.83843506649126, 60.59649568521657],
        manager: "id-269884",
      },
      {
        age: "28",
        id: "id-426797",
        lastname: "Ушакова",
        location: [56.82658927159686, 60.603944230824524],
        manager: "id-33633",
        name: "Кристина",
        surname: "Ульяновна",
      },
    ] as EmployeesList,
  },
  getters: {
    employees: ({ employees }: EmployeesStoreState) => employees,
  },
  mutations: {
    [ADD_EMPLOYEE](state: EmployeesStoreState, newEmployee: Employee) {
      state.employees.push(newEmployee);

      console.log("START", state.employees);
    },
    [DELETE_EMPLOYEE](state: EmployeesStoreState, employeeToDelete: string) {
      state.employees = state.employees.filter(
        (employee: Employee) => employee.id !== employeeToDelete
      );
      console.log("DELETE", state.employees);
    },
  },
  actions: {
    setEmployee({ commit }: { commit: any }, newEmployee: Employee) {
      commit(ADD_EMPLOYEE, newEmployee);
    },
    deleteEmployee({ commit }: { commit: any }, employeeToDelete: string) {
      commit(DELETE_EMPLOYEE, employeeToDelete);
    },
  },
};

export default employeesStore;
