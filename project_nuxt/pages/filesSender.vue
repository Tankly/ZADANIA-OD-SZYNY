<template>
  <v-form ref="form" @submit.prevent="sendFiles()">
    <v-row>
      <v-col class="text-center d-flex align-center flex-column" cols="8">
        <FileInputWithBtns 
          v-for="index in extra"
          :key="index"
          :valid.sync="formValid"
          @handleFile="(value) => {
            handleFile(value, index)
          }" 
          @removeInput="removeInput(index)" 
        />
      </v-col>
      <v-col cols="4">
        <div class="c-file-form-btns">
          <v-btn
            class="c-file-form-btns__btn"
            color="primary"
            elevation="13"
            large
            outlined
            @click="addFileInput"
          >Dodaj kolejny plik</v-btn>
          <v-btn
            class="c-file-form-btns__btn"
            color="primary"
            elevation="13"
            large
            outlined
            :disabled=!formValid
            type="submit"
          >Wyślij</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
    name: "FilesSender",
    data() {
        return {
            counter: 2,
            extra: [0, 1],
            files: {},
            formValid: true,
        };
    },
    methods: {
      addFileInput() {
        let id = this.counter;
        this.extra.push(id);
        this.counter++;
      },
      removeInput(index) {
        this.extra.splice(this.extra.indexOf(index), 1);
        this.formValid = true;
      },
      handleFile(value, index) {
        this.files[index] = value;
      },
      wrongInput(value){
        this.formValid = value;
      },
      sendFiles() {
        let formData = new FormData();
        let i = 0;
        for(const file in this.files){
          if(this.files[file]){
            formData.append('attachment['+ i +']', this.files[file])
            i++;
          }
        }
        this.$axios.$post('files', formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(() => {
            this.$refs.form.reset();
          })
      },
    },
}
</script>
