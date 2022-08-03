<template>
  <div class="pageContent">
    <MainHeader :headerText="headerText" />
    <main>
      <FormBuilder
        :formInputs="formInputs"
        :btns="btns"
        :formInfo="formInfo"
        v-model:inputsData="inputsData"
      />
      <FormAlert
        v-if="invalid"
        v-model:invalid="invalid"
        :invalidInputs="invalidInputs"
      />
      <FormOutput v-if="isFormDataSend" />
    </main>
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";
import FormBuilder from "@/components/FormBuilder.vue";
import FormAlert from "../components/form/FormAlert.vue";
import FormOutput from "../components/form/FormOutput.vue";

export default {
  data() {
    return {
      inputsData: {},
      invalid: false,
      isFormDataSend: false,
      invalidInputs: {},
      headerText: "Formularz",
      formInfo: {
        divId: "formContainer",
        formId: "userForm",
      },
      formInputs: {
        name: {
          name: "name",
          label: "Imię",
          type: "FormInput",
          inputType: "text",
          // validationF: this.defaultValidation,
          validationF: [
            (value) => !!value || "Required.",
            (value) => (value && value.length >= 3) || "Min 3 characters",
          ],
        },
        surname: {
          name: "surname",
          label: "Nazwisko",
          type: "FormInput",
          inputType: "text",
          validationF: [this.defaultValidation],
        },
        pesel: {
          name: "pesel",
          label: "PESEL",
          type: "FormInput",
          inputType: "text",
          maxLength: "11",
          validationF: [this.peselValidation],
        },
        birthDate: {
          label: "Data urodzenia",
          type: "FormInput",
          inputType: "date",
          disabled: "true",
          validationF: [this.defaultValidation],
        },
        age: {
          name: "age",
          label: "Wiek",
          type: "FormInput",
          inputType: "number",
          disabled: "true",
          validationF: [
            (value) => {
              return value > 0 && /.+/.test(value);
            },
          ],
        },
        email: {
          name: "email",
          label: "Email",
          type: "FormInput",
          inputType: "email",
          validationF: [
            (value) => {
              let regForEmail =
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
              return regForEmail.test(value);
            },
          ],
        },
        details: {
          name: "details",
          label: "Opis",
          type: "FormTextarea",
          textArea: [4, 50],
          placeholder: "Dodaj opis",
          validationF: [this.defaultValidation],
        },
        gender: {
          name: "gender",
          label: "Płeć",
          type: "FormSelect",
          selectOptions: ["default", "Mężczyzna", "Kobieta"],
          textForOptions: ["Wybierz płeć", "Mężczyzna", "Kobieta"],
          disabled: "true",
          validationF: [this.defaultValidation],
        },
      },
      btns: {
        sendForm: {
          type: "FormBtn",
          name: "sendForm",
          content: "zapisz",
          btnFunction: () => {
            if (this.formInputs.length !== this.inputsData) {
              this.invalid = true;
            } else {
              this.isFormDataSend = true;
            }
          },
        },
      },
    };
  },
  components: {
    MainHeader,
    FormBuilder,
    FormAlert,
    FormOutput,
  },
  // watch: {
  //   "inputsData.pesel"(newPesel) {
  //     let weights = "1379137913";
  //     let checkSum = 0;
  //     if (/^\d{11}$/.test(newPesel)) {
  //       let i = 0;
  //       let tempSum;
  //       for (i; i < 10; i++) {
  //         tempSum = newPesel[i] * weights[i];
  //         tempSum = tempSum % 10;
  //         checkSum += tempSum;
  //       }
  //       checkSum = checkSum % 10;
  //       let finalCheck = 10 - checkSum;
  //       if (finalCheck == newPesel[10]) {
  //         console.log("aaaaa");
  //         delete this.invalidInputs["PESEL"];
  //         return true;
  //       } else {
  //         this.invalidInputs.pesel = "true";
  //       }
  //     } else {
  //       this.invalidInputs["PESEL"] = "true";
  //     }
  //   },
  // },
  methods: {
    defaultValidation(value) {
      return /.+/.test(value);
    },
    peselValidation(value) {
      let weights = "1379137913";
      let checkSum = 0;
      if (/^\d{11}$/.test(value)) {
        let i = 0;
        let tempSum;
        for (i; i < 10; i++) {
          tempSum = value[i] * weights[i];
          tempSum = tempSum % 10;
          checkSum += tempSum;
        }
        checkSum = checkSum % 10;
        let finalCheck = 10 - checkSum;
        if (finalCheck == value[10]) {
          return true;
        }
      }
    },
  },
};
</script>
