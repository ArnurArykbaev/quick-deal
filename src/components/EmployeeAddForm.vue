<template>
  <div class="employee-form">
    <b-button v-b-modal.modal-1 variant="light">Add new employee</b-button>

    <b-modal id="modal-1" hide-footer>
      <template #modal-title> Form to add new employee </template>
      <ValidationObserver v-slot="{ invalid }">
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group
            class="mt-4"
            id="input-group-1"
            label="Employee lastname:"
            label-for="input-1"
          >
            <ValidationProvider
              name="lastname"
              rules="required"
              v-slot="{ errors }"
            >
              <b-form-input
                list="my-list-lastname"
                v-model="state.form.lastname"
                @input="getVariants"
                placeholder="Enter an employee lastname"
                required
              ></b-form-input>
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>

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
            <ValidationProvider
              name="name"
              rules="required"
              v-slot="{ errors }"
            >
              <b-form-input
                list="my-list-name"
                v-model="state.form.name"
                @input="getVariants"
                placeholder="Enter an employee name"
                required
              ></b-form-input>
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>

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
            <ValidationProvider
              name="surname"
              rules="required"
              v-slot="{ errors }"
            >
              <b-form-input
                list="my-list-surname"
                v-model="state.form.surname"
                @input="getVariants"
                placeholder="Enter an employee surname"
                required
              ></b-form-input>
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>

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
            <ValidationProvider
              rules="required|minAge|maxAge|odd"
              v-slot="{ errors }"
            >
              <b-form-input
                v-model="state.form.age"
                type="number"
                placeholder="Enter an employee age"
                required
              ></b-form-input>
              <span class="error">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-form-group>

          <YandexCard
            class="mt-4"
            :location="state.form.location"
            @setLocation="setLocation"
          />

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
            <b-button class="mx-3" type="reset" variant="danger"
              >Reset</b-button
            >
            <b-button
              class="mx-3"
              type="submit"
              variant="primary"
              :disabled="invalid"
              >Submit</b-button
            >
          </div>
        </b-form>
      </ValidationObserver>
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
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";

import "@/validation/formEmployeeValidation";

export default defineComponent({
  name: "EmployeeAddForm",
  components: { YandexCard, ValidationProvider, ValidationObserver },
  setup() {
    const store = useStore();
    const state = reactive({
      invalid: true,
      form: {
        id: "",
        name: "",
        lastname: "",
        surname: "",
        age: 18,
        variablesOfLastnames: [],
        manager: "",
        location: [56.838011, 60.597474] as string[] | number[],
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
      console.log("LOC", location);
      state.form.location = location;
      console.log("LOCCCCC", state.form.location);
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

.error {
  color: #a92a2a;
}
</style>
