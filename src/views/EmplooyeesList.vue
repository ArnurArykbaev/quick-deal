<template>
  <div class="employees-list">
    <EmployeeForm />
    <EmployeesTable />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EmployeeForm from "@/components/EmployeeForm.vue";
import EmployeesTable from "@/components/EmployeesTable.vue";

export default defineComponent({
  name: "EmplooyeesList",
  components: { EmployeeForm, EmployeesTable },
  data() {
    return {
      modifiedChartData: [],
    };
  },
  computed: {},
  methods: {},
});
</script>

<style scoped></style>
