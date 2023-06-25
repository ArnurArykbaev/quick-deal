<template>
  <div class="employee-form">
    <b-button v-b-modal.modal-1 variant="light">Add new employee</b-button>

    <b-modal id="modal-1" hide-footer>
      <template #modal-title> Form to add new employee </template>

      <b-form @submit="onSubmit" @reset="onReset">
        <p class="my-4">Fill in field to add a new employee!</p>

        <b-form-group
          class="mt-4"
          id="input-group-1"
          label="Employee lastname:"
          label-for="input-1"
        >
          <b-form-input
            list="my-list-lastname"
            v-model="state.form.lastname"
            @input="getVariants"
            placeholder="Enter an employee lastname"
            required
          ></b-form-input>

          <datalist id="my-list-lastname">
            <option
              v-for="(size, index) in state.form.variablesOfLastnames"
              :key="index + Math.random()"
            >
              {{ size }}
            </option>
          </datalist>
        </b-form-group>
        <b-form-group
          class="mt-4"
          id="input-group-2"
          label="Employee name:"
          label-for="input-2"
        >
          <b-form-input
            list="my-list-name"
            v-model="state.form.name"
            @input="getVariants"
            placeholder="Enter an employee name"
            required
          ></b-form-input>

          <datalist id="my-list-name">
            <option
              v-for="(size, index) in state.form.variablesOfLastnames"
              :key="index + Math.random()"
            >
              {{ size }}
            </option>
          </datalist>
        </b-form-group>

        <b-form-group
          class="mt-4"
          id="input-group-3"
          label="Employee surname:"
          label-for="input-3"
        >
          <b-form-input
            list="my-list-surname"
            v-model="state.form.surname"
            @input="getVariants"
            placeholder="Enter an employee surname"
            required
          ></b-form-input>

          <datalist id="my-list-surname">
            <option
              v-for="(size, index) in state.form.variablesOfLastnames"
              :key="index + Math.random()"
            >
              {{ size }}
            </option>
          </datalist>
        </b-form-group>

        <b-form-group
          class="mt-4"
          id="input-group-4"
          label="Employee age:"
          label-for="input-4"
        >
          <b-form-input
            v-model="state.form.age"
            type="number"
            placeholder="Enter an employee age"
            required
          ></b-form-input>
        </b-form-group>

        <YandexCard @setLocation="setLocation" />

        <b-form-group
          class="mt-4"
          id="input-group-5"
          label="Employee's manager:"
          label-for="input-5"
        >
          <b-form-select
            v-model="state.form.manager"
            :options="formattedEmployees"
            text-field="text"
            text-value="value"
          ></b-form-select>
        </b-form-group>
        <div class="modal-buttons w-100">
          <b-button class="mx-3" type="reset" variant="danger">Reset</b-button>
          <b-button class="mx-3" type="submit" variant="primary"
            >Submit</b-button
          >
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script lang="ts">
import axios from "@/plugins/axios";
import { computed, defineComponent, reactive } from "vue";
import { Suggestion } from "@/models/Suggestion";
import { useStore } from "@/store";
import YandexCard from "@/components/YandexCard.vue";

import { Employee } from "@/models/Employee";

export default defineComponent({
  name: "EmployeeForm",
  components: { YandexCard },
  setup() {
    const store = useStore();
    const state = reactive({
      form: {
        id: "",
        name: "",
        lastname: "",
        surname: "",
        age: 18,
        variablesOfLastnames: [],
        manager: "",
        location: [] as string[] | number[],
      },
    });

    const settings = {
      apiKey: "",
      lang: "ru_RU",
      coordorder: "latlong",
      enterprise: false,
      version: "2.1",
    };

    const employees = computed(() => store.getters.employees);

    const formattedEmployees = computed(() => {
      return employees.value.map((employee: Employee) => {
        return {
          text: `${employee?.name} ${employee?.lastname}`,
          value: employee?.id,
        };
      });
    });

    const setLocation = (location: string[] | number[]) => {
      state.form.location = location;
    };

    const onSubmit = () => {
      const newEmployee: Employee = {
        id: `id-${store.getters.employees.length}${(
          Math.random() * 100000
        ).toFixed(0)}`,
        name: state.form.name,
        lastname: state.form.lastname,
        surname: state.form.surname,
        age: state.form.age,
        location: state.form.location,
        manager: state.form.manager as string | Employee,
      };

      store.dispatch("setEmployee", newEmployee);
    };
    const onReset = () => {
      console.log("Reset");
    };

    const getVariants = async (value: string) => {
      const endpoint = "suggestions/api/4_1/rs/suggest/fio";
      const query = value;

      try {
        const response = await axios.post(endpoint, { query });
        const suggestions = response.data?.suggestions;
        console.log("SUGGESTIONS", suggestions);
        state.form.variablesOfLastnames = suggestions.map(
          (lastnames: Suggestion) => lastnames.value
        );
      } catch (error) {
        console.error(error);
      }
    };

    return {
      state,
      settings,
      onSubmit,
      onReset,
      getVariants,
      employees,
      formattedEmployees,
      setLocation,
    };
  },
});
</script>

<style lang="scss" scoped>
.modal-buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 4rem;
}
</style>
