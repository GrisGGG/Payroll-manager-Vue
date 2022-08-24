<template>
    <div class="login">
        <h1>Iniciar Sesión</h1>
        <form class="ui form" @submit.prevent="onLogin">
            <div class="field">
                <input 
                type="text" 
                placeholder="Correo Electronico" 
                v-model="formData.email"
                :class="{error: formError.email}"
                >
            </div>
            <div class="field">
                <input 
                type="password" 
                placeholder="Contraseña" 
                v-model="formData.password"
                 :class="{error: formError.password}"
                >
            </div>
            <button type="submit" class="ui button positive fluid" :class="{loading}">Entrar</button>
        </form>
        <p @click="changeForm">Crear una nueva cuenta</p>
    </div>
</template>

<script>
import {ref} from "vue";
import * as Yup from "yup";
import {auth } from '../../utils/firebase'
import {signInWithEmailAndPassword} from "firebase/auth"
export default {
    name:"Login",
    props:{
        changeForm: Function,
    },
    setup(){
        let formData = {};
        let formError = ref({});
        let loading = ref(false);

        const schemaForm = Yup.object().shape({
            email: Yup.string().email(true).required(true),
            password: Yup.string().required(true),
        })
        let onLogin = async () =>{
            loading.value = true;
            formError.value = {};
            try{
                await schemaForm.validate(formData, {abortEarly:false});
                try{
                    const {email, password} = formData;
                    await signInWithEmailAndPassword(auth, email, password)
                }catch (error){
                 console.log(error);
                }
            }catch(error){
                error.inner.forEach((error) =>{
                    formError.value[error.path] = error.message
                })
            }
            loading.value = false;
        }
        return{
            formData,
            onLogin,
            formError,
            loading
        }
    }
}
</script>

<style lang="scss" scoped>
$bg-form: #f1f1f1;
$error-color:#faa;
$error-color-bg: #ffeded;
.login{
    width: 400px;
    background-color:$bg-form;
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

</style>