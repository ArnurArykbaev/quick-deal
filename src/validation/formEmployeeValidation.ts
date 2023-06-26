import { extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "This field is required",
});

extend("minAge", (value) => {
  if (value >= 18) {
    return true;
  }
  return "Your age must be a highter than 17";
});
extend("maxAge", (value) => {
  if (value <= 123) {
    return true;
  }
  return "Your age must be a lower than 123";
});

extend("odd", (value) => {
  if (value % 1 === 0) {
    return true;
  }
  return "Your age must be a whole number";
});
