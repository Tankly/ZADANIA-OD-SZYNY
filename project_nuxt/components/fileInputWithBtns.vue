<template>
   <div style="display: flex; width: 100%; flex-direction: column;">
        <div style="display: flex; gap: 10px; align-items: center; width: 100%;">
            <v-file-input
                chips
                :value="value"
                label="Dodaj plik"
                @change = "handelFile"
            />
            <v-btn
                color="red"
                outlined
                small
                @click = "$emit('removeInput')"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </div>
        <div>
            <span v-if="!v" class="c-file-sender__warning">
                {{ msg }}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: "FileInputWithBtns",
    props:{
        valid: {
            type:Boolean,
        }
    },
    data() {
        return {
            value: null,
            // valid: true,
            msg: "",
        }
    },
    computed: {
        v: {
            get(){
                return this.valid
            },
            set(value){
               this.$emit("update:valid", value); 
            }
        }
    },
    // watch: {
    //     valid() {
    //         this.$emit("wrongInput", this.valid);
    //     }
    // },
    methods: {
        validType(type){
            return !type  || type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || type =="image/png" || type == "image/jpeg" || type == "image/bmp"
        },
        validSize(size){
            return !size || size < 2000000
        },
        handelFile(value) {
            this.msg = "";
            this.v = true;
            if(value){
                const type = this.validType(value.type);
                const size = this.validSize(value.size);
                this.value = value
                if(type && size) {
                    this.$emit('handleFile', value)
                }
                else {
                    if(!size){
                        this.msg += "Podany plik jest zbyt duży. "
                    }
                    if(!type){
                        this.msg += " Niepoprawny typ pliku."
                    }
                    this.v = false;
                }
            }
        }
    },
}
</script>