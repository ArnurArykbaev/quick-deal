<template>
  <div class="employee-delete">
    <b-button @click="state.modalShow = !state.modalShow" variant="light"
      >Delete an employee</b-button
    >

    <b-modal v-model="state.modalShow" hide-footer>
      <template #modal-title> Form to delete an employee </template>

      <div class="employee-delete__select">
        <b-form-select
          v-model="state.emplyeeToDelete"
          :options="formattedEmployees"
          :text-field="'text'"
          text-value="value"
        ></b-form-select>
        <b-button class="mx-3" @click="deleteEmployee" variant="danger"
          >Delete</b-button
        >
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "vue";
import { useStore } from "@/store";

import { Employee } from "@/models/Employee";

import "@/validation/formEmployeeValidation";

export default defineComponent({
  name: "EmployeeDeleteForm",
  components: {},
  setup() {
    const store = useStore();
    const state = reactive({
      modalShow: false,
      emplyeeToDelete: "",
    });

    const employees = computed(() => store.getters.employees);

    const formattedEmployees = computed(() => {
      return employees.value.map((employee: Employee) => {
        return {
          text: `${employee?.name} ${employee?.lastname}`,
          value: employee?.id,
        };
      });
    });

    const deleteEmployee = () => {
      store.dispatch("deleteEmployee", state.emplyeeToDelete);
      state.modalShow = false;
    };

    return {
      state,
      employees,
      formattedEmployees,
      deleteEmployee,
    };
  },
});
</script>

<style lang="scss" scoped>
.employee-delete {
  &__select {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
}
</style>
