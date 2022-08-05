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
        v-model:invalidInputs="invalidInputs"
      />
      <FormOutput
        v-if="isFormDataSend"
        :inputsData="innputsDataForOutputMsg"
        :formInputs="formInputs"
      />
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
      inputsData: { gender: "default" },
      innputsDataForOutputMsg: {},
      invalid: false,
      isFormDataSend: false,
      invalidInputs: ["Imię", "Nazwisko", "PESEL", "Email", "Opis"],
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
          validationF: [this.defaultValidation],
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
          validationF: [this.defaultValidation, this.peselValidation],
        },
        birthDate: {
          name: "birthDate",
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
          validationF: [this.defaultValidation, this.ageValidation],
        },
        email: {
          name: "email",
          label: "Email",
          type: "FormInput",
          inputType: "email",
          validationF: [this.defaultValidation, this.emailValidation],
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
            const wrongInputs = document.querySelectorAll(".wrongInput");
            console.log(wrongInputs);
            // if (wrongInputs.length == 0 && !this.isFormDataSend ) {
            //   this.invalidInputs = [
            //     "Imię",
            //     "Nazwisko",
            //     "PESEL",
            //     "Email",
            //     "Opis",
            //   ];
            // }
            if (wrongInputs.length != 0) {
              this.invalidInputs = [];
              for (let i = 0; wrongInputs.length > i; i++) {
                const elName = wrongInputs[i].name;
                this.invalidInputs.push(this.formInputs[elName].label);
              }
              this.invalid = true;
            } else if (
              Object.keys(this.formInputs).length !==
              Object.keys(this.inputsData).length
            ) {
              this.invalid = true;
            } else {
              this.innputsDataForOutputMsg = { ...this.inputsData };
              this.isFormDataSend = true;
              this.invalidInputs = [];
              // console.log(this.inputsData);
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
  methods: {
    defaultValidation(value) {
      return !!value || "To pole jest wymagane.";
    },
    ageValidation(value) {
      return (!isNaN(value) && value > 0) || "Podaj dodatnią liczbę";
    },
    emailValidation(value) {
      const regMail =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      let isValid = regMail.test(value);
      return isValid || "Podaj poprawny email";
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
        this.useDatafromPesel(value);
        checkSum = checkSum % 10;
        let finalCheck = 10 - checkSum;
        if (finalCheck == value[10]) {
          return true;
        } else {
          return "Podaj poprawny pesel";
        }
      } else {
        return "Pesel musi miec 11 cyfr";
      }
    },
    useDatafromPesel(value) {
      const pesel = value;
      const addZero = (num) => (num = "0" + num);
      let birthMonth = 0;
      let birthDay = 0;
      let birthYear = 1900 + parseInt(pesel.slice(0, 2));
      if (pesel[2] >= 2 && pesel[2] < 8) {
        birthYear += Math.floor(pesel[2] / 2) * 100;
      }
      if (pesel[2] >= 8) {
        birthYear -= 100;
      }

      birthMonth = parseInt((pesel[2] % 2) * 10) + parseInt(pesel[3]);
      if (birthMonth < 10) {
        birthMonth = addZero(birthMonth);
      }
      birthDay = pesel.slice(4, 6);
      this.inputsData["birthDate"] = `${birthYear}-${birthMonth}-${birthDay}`;
      let calculatedAge =
        new Date(
          new Date() - new Date(this.inputsData["birthDate"])
        ).getFullYear() - 1970;
      this.inputsData["age"] = calculatedAge;
      if (value[9] % 2 === 0) {
        this.inputsData["gender"] = "Kobieta";
      } else {
        this.inputsData["gender"] = "Mężczyzna";
      }
    },
  },
};
</script>
