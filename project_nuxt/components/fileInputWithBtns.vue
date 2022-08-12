<template>
   <v-row class="c-file-sender d-flex align-center">
        <v-file-input
            v-model="value"
            chips
            label="Dodaj plik"
            @change = "handelFile()"
        ></v-file-input>
        <v-btn
            color="red"
            outlined
            small
            @click = "$emit('removeInput')"
        >
            <v-icon>mdi-close</v-icon>
        </v-btn>
        <span color="red">
            
        </span>
    </v-row>
</template>

<script>
export default {
    name: "FileInputWithBtns",
    props:{
        index: {
            type: Number,
            default: Number,
            required: true,
        }
    },
    data() {
        return {
            value: null,
            i: this.index,
            valid: true,
        }
    },
    methods: {
        validType(type){
            return !type  || "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || "image/png" || "image/jpeg" || "image/bmp"
        },
        validSize(size){
            return !size || size < 2000000
        },
        handelFile() {
            console.log(this.validType(this.value.type));
            if(this.validType(this.value.type) && this.validSize(this.value.name)) {
                this.$emit('handleFile', this.value, this.i)
                this.valid = true;
            }
            else {
                this.value = null;
                this.valid = false;
            }
        }
    },
}
</script>