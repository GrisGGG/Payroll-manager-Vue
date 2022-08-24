<template>
      <form class="ui form change-email" @submit.prevent="onChangeEmail">
        <div class="two fields">
            <div class="field">
                <input 
                type="text" 
                placeholder="Nuevo email" 
                v-model="formData.email"
                :class="{ error: formError.email}"
                >
            </div>
            <div class="field">
                <div class="field">
                <input 
                type="password" 
                placeholder="Contraseña actual" 
                v-model="formData.password"
                :class="{ error: formError.password}"
                >
            </div>
            </div>
            <p v-if="messageError"> {{ messageError }}</p>
            <button 
        type="submit" 
        class="ui button primary"
        :class="{ loading: loading}"
        >Actualizar</button>
        </div>
    </form>
</template>

<script>

import { ref } from "vue";
import * as Yup from "yup";
import { reauthenticate } from "../../utils/firebaseFunctions";
import { auth } from "../../utils/firebase";
import { updateEmail } from "firebase/auth";



export default {
    name: "ChangeEmail",
    setup(){
        let formData = {};
        let formError = ref({});
        let messageError = ref("");
        let loading = ref(false)

        const schemaForm = Yup.object().shape({
             email: Yup.string().email(true).required(true),
             password: Yup.string().required(true),
        });

        const onChangeEmail = async () => {
            formError.value = {};
            messageError.value = "";
            loading.value = true;

            try{
                await schemaForm.validate(formData, { abortEarly: false});
                try{
                    const { email, password} = formData;
                    await reauthenticate(password);
                    await updateEmail(auth.currentUser, email);
                    auth.signOut();
                }catch(error){
                    console.log(error);
                    messageError.value = error.menssage;
                }
            }catch(err){
                err.inner.forEach((error) =>{
                    formError.value[error.path] = error.menssage
                })
            }
            loading.value= false;

        }
        return{
            formData, formError, messageError, onChangeEmail, loading
        }
    }
}
</script>

<style lang="scss" scoped>
.ui.form.change-email{
    text-align: center;
    input.error{
        border-color: #faa;
        background-color: #ffeded;
    }
    .ui.button{
        margin: 20px 0 0 0;
    }
}
</style>