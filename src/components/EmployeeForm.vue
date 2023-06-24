<template>
  <div class="employee-form">
    <b-button v-b-modal.modal-1 variant="light">Add new employee</b-button>

    <b-modal id="modal-1">
      <template #modal-title> Form to add new employee </template>

      <b-form>
        <p class="my-4">Fill in field to add a new employee!</p>

        <b-form-group
          class="mt-4"
          id="input-group-1"
          label="Employee name:"
          label-for="input-1"
        >
          <b-form-input
            list="my-list-id"
            v-model="state.form.name"
            @input="getVariants"
            placeholder="Enter an employee name"
            required
          ></b-form-input>

          <datalist id="my-list-id">
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
          label="Employee age:"
          label-for="input-2"
        >
          <b-form-input
            type="number"
            placeholder="Enter an employee age"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          class="mt-4"
          id="input-group-3"
          label="Employee's manager:"
          label-for="input-3"
        >
          <b-form-select
            v-model="state.selected"
            :options="state.form.options"
          ></b-form-select>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script lang="ts">
import axios from "@/plugins/axios";
import { defineComponent, reactive, ref } from "vue";
import { Suggestion } from "@/models/Suggestion";

export default defineComponent({
  name: "EmployeeForm",
  components: {},
  data() {
    return {
      locations: {
        language: "ru",
        locations: [
          {
            country: "*",
          },
        ],
      },
    };
  },
  setup() {
    const state = reactive({
      selected: null,
      form: {
        name: "",
        variablesOfLastnames: [],
        options: [
          { value: null, text: "Please select an option" },
          { value: "a", text: "This is First option" },
          { value: "b", text: "Selected Option" },
          { value: { C: "3PO" }, text: "This is an option with object value" },
          { value: "d", text: "This one is disabled", disabled: true },
        ],
      },
    });

    const onSubmit = () => {
      console.log("OK");
    };
    const onReset = () => {
      console.log("OK");
    };
    const query = ref("");

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
      token: "5b9b34781d705471a6dedf3d4a4b1acd1d6dee48",
      query,
      state,
      onSubmit,
      onReset,
      getVariants,
    };
  },
});
</script>

<style lang="scss" scoped></style>
