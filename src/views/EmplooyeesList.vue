<template>
  <div class="employees-list">
    <div class="employee-list__buttons">
      <EmployeeAddForm />
      <EmployeeDeleteForm />
    </div>
    <EmployeesTable />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EmployeeAddForm from "@/components/EmployeeAddForm.vue";
import EmployeeDeleteForm from "@/components/EmployeeDeleteForm.vue";
import EmployeesTable from "@/components/EmployeesTable.vue";

export default defineComponent({
  name: "EmplooyeesList",
  components: { EmployeeAddForm, EmployeesTable, EmployeeDeleteForm },
  data() {
    return {
      modifiedChartData: [],
    };
  },
  computed: {},
  methods: {},
});
</script>

<style scoped>
.employee-list__buttons {
  display: flex;
  justify-content: center;
  flex-direction: row;
  column-gap: 20px;
  align-items: center;
}
</style>
