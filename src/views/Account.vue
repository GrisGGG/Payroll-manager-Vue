<template>
    <div class="account">
        <BasicLayout>
            <h2>Settings</h2>
                <div class="account__section">  
                    <p class="title">Change name: 
                    <span v-if="user.displayName">{{ user.displayName }}</span>
                    </p>
                    <ChangeName></ChangeName>    
                </div>
                <div class="account__section">  
                    <p class="title">Change email: 
                    <span v-if="user.email">{{ user.email }}</span>
                    </p>
                    <ChangeEmail></ChangeEmail>  
                </div>
                <div class="account__section">
                    <p class="title">Change your password</p>
                    <ChangePassword></ChangePassword>
                </div>
        </BasicLayout>
        </div>
        
  
</template>

<script>

import { useStore } from 'vuex';
import { computed } from 'vue';
import BasicLayout from '@/layouts/BasicLayout';
import ChangeName from '../components/Account/ChangeName';
import ChangeEmail from '../components/Account/ChangeEmail';
import ChangePassword from '../components/Account/ChangePassword';


export default {
    name: "Account",
    components:{
    BasicLayout,
    ChangeName,
    ChangeEmail,
    ChangePassword,
},
    setup(){
        const store = useStore();
        const user = computed(() => store.state.user);

        return{ user, }
    }
}
</script>

<style lang="scss" scoped>
.account{
    h2{
        margin: 50px 0;
        text-align: center;
    }
     &__section{
            position:relative;
            padding: 10px;
            border:1px solid #16212b;
            padding-top: 25px;
            margin-top: 40px;
            .title{
                position:absolute;
                top:-12px;
                background-color: #16212c;
                color:#fff;
                padding: 2px 10px;
            }
        }
}
</style>