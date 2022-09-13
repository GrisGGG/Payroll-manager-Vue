<template>
<div class="register">
    <h2>Crear Cuenta</h2>
    <form class="ui form" @submit.prevent="onRegister">
        <div class="field">
            <input 
            type="text"
            placeholder="Email"
            v-model="formData.email"
            :class="{error : formError.email}"
            >
        </div>
        <div class="field">
            <input type="password" 
            placeholder="Password"
            v-model="formData.password"
            :class="{error : formError.password}"
            >
        </div>
         <div class="field">
            <input 
            type="password" 
            placeholder="Password"
            v-model="formData.repeatPassword"
            :class="{error : formError.repeatPassword}"
            >
        </div>
        <button 
        type="changeForm" 
        class="ui button positive fluid"
        :class="{ loading }"
        >Sign up</button>
        <p @click="changeForm">Sign in</p>
    </form>

  </div>
</template>

<script>
import { ref } from 'vue';
import * as Yup  from 'yup';
import { auth } from '../../utils/firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";


export default {
    name: "Register",
      props:{
        changeForm: Function,
    },
    setup(props){
        let formData = {};
        let formError = ref({});
        let loading = ref(false);
        const schemaForm =Yup.object().shape({
            email: Yup.string().email(true).required(true),
            password: Yup.string().required(true),
            repeatPassword: Yup.string()
            .required(true)
            .oneOf([Yup.ref("password")], true),
        });

        const onRegister = async ()=>{
            loading.value = true;
            formError.value = {};
            try{//Petición a la validación
                await schemaForm.validate(formData, { abortEarly: false}); 
                try{ //petición a firebase
                    const { email, password } = formData;
                     await 
                     createUserWithEmailAndPassword(auth, email, password)
                }catch(error){
                    console.log(error)
                }   
            }catch(err){
                err.inner.forEach((error) =>{
                formError.value[error.path] = error.message;
                });
            }
            loading.value = false;
        }
        return {formData, onRegister, formError, loading}
    }
}
</script>

<style lang="scss" scoped>
$bg-form: #f1f1f1;
$error-color:#faa;
$error-color-bg: #ffeded;
.register{
    width: 400px;
    background-color:$bg-form ;
    padding: 30px;
    box-shadow: 0px 0px 38px -5px rbga(0, 0, 0, 0.45);
    border-radius:10px;
    h1{
        text-align: center;
        margin-bottom: 30px;
    }
    form{
        input.error{
            border-color: $error-color;
            background-color: $error-color-bg;
        }
        p{
            text-align: center;
            margin-top: 30px;

            &:hover{
                cursor: pointer;
                opacity: 0.6;
            }
        }
    }
}

</style>