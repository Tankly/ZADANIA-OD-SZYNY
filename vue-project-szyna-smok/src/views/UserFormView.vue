<template>
  <div class="pageContent">
    <MainHeader :headerText="headerText" />
    <main>
      <UserFrom :formInputs="formInputs" />
    </main>
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";
import UserFrom from "@/components/UserFrom.vue";

export default {
  data() {
    return {
      invalid: false,
      headerText: "Formularz",
      formInputs: {
        name: {
          name: "name",
          label: "Imię",
          type: "FormInput",
          inputType: "text",
        },
        surname: {
          name: "surname",
          label: "Nazwisko",
          type: "FormInput",
          inputType: "text",
        },
        pesel: {
          name: "pesel",
          label: "PESEL",
          type: "FormInput",
          inputType: "text",
          maxLength: "11",
        },
        birthDate: {
          label: "Data urodzenia",
          type: "FormInput",
          inputType: "date",
          disabled: "true",
        },
        age: {
          name: "age",
          label: "Wiek",
          type: "FormInput",
          inputType: "number",
          disabled: "true",
        },
        email: {
          name: "email",
          label: "Email",
          type: "FormInput",
          inputType: "email",
        },
        details: {
          name: "details",
          label: "Opis",
          type: "FormTextarea",
          textArea: [4, 50],
          placeholder: "Dodaj opis",
        },
        gender: {
          name: "gender",
          label: "Płeć",
          type: "FormSelect",
          selectOptions: ["default", "Mężczyzna", "Kobieta"],
          textForOptions: ["Wybierz płeć", "Mężczyzna", "Kobieta"],
          disabled: "true",
        },
        sendForm: { type: "FormBtn", name: "sendForm", content: "zapisz" },
      },
    };
  },
  components: {
    MainHeader,
    UserFrom,
  },
};
</script>
