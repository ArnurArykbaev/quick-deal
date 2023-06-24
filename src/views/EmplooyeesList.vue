<template>
  <div class="employees-list">
    <EmployeeForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EmployeeForm from "@/components/EmployeeForm.vue";

export default defineComponent({
  name: "EmplooyeesList",
  components: { EmployeeForm },
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
