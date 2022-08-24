<template>
    <div class="auth">
        <Login v-if="showLogin" :changeForm="changeForm"></Login>
        <Register v-if="!showLogin" :changeForm="changeForm"></Register>
    </div>
 

</template>

<script>
import {ref} from 'vue'
import Login from '@/components/Auth/Login'
import Register from '@/components/Auth/Register'
export default {
    name: "Auth",
    components:{
        Login, Register,
    },
    setup(){
        let showLogin = ref(true)
        const changeForm = ()=>{
            showLogin.value = !showLogin.value;
        }

    return {showLogin, changeForm}
    }
    

}
</script>

<style lang="scss" scoped>
$color-bg-main: #14453D;
$color-bg-second: #3CBBB1 ;
.auth {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: $color-bg-main;
    background: linear-gradient(0deg,$color-bg-main 0%, $color-bg-second 100%);
}
</style>