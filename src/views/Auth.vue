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
$color-bg-main: rgba(77,60,173,1) ;
$color-bg-second:rgba(60,203,132,1)  ;
.auth {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: $color-bg-main;
    background: linear-gradient(194deg,$color-bg-main 0%, $color-bg-second 100%);
}
</style>