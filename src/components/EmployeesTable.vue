<template>
  <div class="mt-5">
    <div>
      Sorting By: <b>{{ state.sortBy }}</b
      >, Sort Direction:
      <b>{{ state.sortDesc ? "Descending" : "Ascending" }}</b>
    </div>
    <b-table
      :items="employees"
      :fields="fields"
      :table-variant="'dark'"
      striped
      label-sort-asc=""
      label-sort-desc=""
      label-sort-clear=""
      :sort-by.sync="state.sortBy"
      :sort-desc.sync="state.sortDesc"
      sort-compare-locale="ru"
      :sort-compare-options="{ numeric: true, sensitivity: 'base' }"
      :sort-compare="sortCompare"
      responsive="sm"
    >
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>

      <template #cell(employee)="data">
        {{ data.item.lastname }}
        {{ data.item.name }}
      </template>

      <template #cell(location)="{ item, index }">
        <b-button
          v-b-modal="`modal-${index}-map`"
          class="mx-3"
          variant="outline-primary"
          size="sm"
          >Show on the map</b-button
        >

        <b-modal :id="`modal-${index}-map`" hide-footer>
          <template #modal-title>
            {{ item.lastname }} {{ item.name }}
          </template>

          <YandexCard :location="item.location" />
        </b-modal>
      </template>

      <template #cell(manager)="row">
        <b-button
          v-if="
            getManager(row.item.manager)?.lastname ||
            getManager(row.item.manager)?.name
          "
          variant="outline-light"
          size="sm"
          @click="
            row.toggleDetails();
            setManager(row.item, row.index);
          "
          class="mr-2"
        >
          {{ getManager(row.item.manager)?.lastname }}
          {{ getManager(row.item.manager)?.name }}
        </b-button>
      </template>

      <template #row-details="row">
        <b-card bg-variant="dark">
          <b-table
            :items="state.employeesManagers[row.index]"
            :fields="managersFields"
            :head-variant="'dark'"
            :table-variant="'warning'"
            :borderless="true"
            striped
            responsive="sm"
          >
            <template #cell(index)="data">
              {{ data.index + 1 }}
            </template>

            <template #cell(employee)="data">
              {{ data.item.lastname }}
              {{ data.item.name }}
            </template>

            <template #cell(location)="{ item, index }">
              <b-button
                v-b-modal="`modal-${index}-${row.index}-map`"
                class="mx-3"
                variant="outline-success"
                size="sm"
                >Show on the map</b-button
              >

              <b-modal :id="`modal-${index}-${row.index}-map`" hide-footer>
                <template #modal-title>
                  {{ item.lastname }} {{ item.name }}
                </template>

                <YandexCard :location="item.location" />
              </b-modal>
            </template>

            <template #cell(manager)="data">
              <b-button
                v-if="
                  getManager(data.item.manager)?.lastname ||
                  getManager(data.item.manager)?.name
                "
                size="sm"
                @click="
                  data.toggleDetails();
                  setManager(data.item, row.index);
                "
                class="mr-2"
                variant="outline-primary"
              >
                {{ getManager(data.item.manager)?.lastname }}
                {{ getManager(data.item.manager)?.name }}
              </b-button>
            </template>
          </b-table>

          <b-button size="sm" variant="outline-light" @click="row.toggleDetails"
            >Hide Details</b-button
          >
        </b-card>
      </template>
    </b-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "vue";
import { useStore } from "@/store";
import { Employee } from "@/models/Employee";
import YandexCard from "./YandexCard.vue";

export default defineComponent({
  name: "EmployeesTable",
  props: {},
  components: { YandexCard },
  setup(props, { emit }) {
    const store = useStore();
    const state = reactive({
      selectedEmployee: -1,
      employeesManagers: [] as Employee[][],
      sortBy: "age",
      sortDesc: false,
    });

    const employees = computed(() => store.getters.employees);
    const fields = [
      { key: "index", sortable: false },
      {
        key: "employee",
        sortable: true,
        sortByFormatted: true,
        filterByFormatted: true,
      },
      { key: "age", sortable: true },
      { key: "location", sortable: false },
      { key: "manager", sortable: true },
    ];

    const managersFields = ["index", "employee", "age", "location", "manager"];

    const getManager = (managerId: string | Employee) => {
      const findManager = employees.value.find(
        (employee: Employee) => employee.id === managerId
      );
      return findManager;
    };

    const showManager = (index: number) => {
      state.selectedEmployee = index;
    };

    const filteredEmployees = computed(() => {
      if (state.selectedEmployee === -1) {
        return employees.value;
      } else {
        const selectedEmployee = employees.value[state.selectedEmployee];
        return employees.value;
      }
    });

    const setManager = (manager: Employee, index: number) => {
      if (!state.employeesManagers[index]?.length) {
        state.employeesManagers[index] = [];
      }

      const employeeManager = getManager(manager.manager);
      const existingManager = state.employeesManagers[index].find(
        (manager) => manager.id === employeeManager.id
      );

      if (!existingManager) {
        state.employeesManagers[index].push(employeeManager);
        state.employeesManagers = [...state.employeesManagers];
      }
    };

    const modalCount = (index: number) => Math.random() + index;

    const sortCompare = (aRow: any, bRow: any, key: any) => {
      if (key === "employee") {
        const a = `${aRow?.lastname} ${aRow.name}`;
        const b = `${bRow?.lastname} ${bRow.name}`;
        return a < b ? -1 : a > b ? 1 : 0;
      }

      if (key === "manager") {
        const a = `${getManager(aRow.manager)?.lastname} ${
          getManager(aRow.manager)?.name
        }`;
        const b = `${getManager(bRow.manager)?.lastname} ${
          getManager(bRow.manager)?.name
        }`;
        return a < b ? -1 : a > b ? 1 : 0;
      }
    };

    return {
      state,
      fields,
      managersFields,
      employees,
      getManager,
      showManager,
      setManager,
      filteredEmployees,
      modalCount,
      sortCompare,
    };
  },
});
</script>

<style lang="scss">
.employee-manager {
  cursor: pointer;
}
</style>
