<template>
  <template v-if="user"> <!--Si User esta definido se muestra router-link-->
      <router-view/> 
  </template>
  <Auth v-if="!user && user !== undefined"></Auth>  <!-- Si user esta vacio !user  y es nulo se muestra la zona de login -->
  
</template>

<script>
import { onMounted, computed } from 'vue'  // paramontar datos en el vdom y computed para detectar cambios en las variables
import { auth } from './utils/firebase' // authenticación de firebase
import {useStore} from 'vuex' //Para usar los datos dentro de store
import Auth from '@/views/Auth'

export default {
  name: "App",
  components:{
    Auth,
  },
  setup(){
    const store = useStore(); // esturctura para usar store
    const user = computed(() => store.state.user)  //hacer computed a user para detectar cambios en la variable
  
    onMounted(() =>{
      auth.onAuthStateChanged((user) =>{
        store.commit("setUser", user) // Al montarse la aplicación, recibimos el parametro user y esta le pasa su estado a la función setUser
        // store.commit("setUser", {name: "Guadalupe"})      
      });
    });
    return {user}
  },
};
</script>

<style lang="scss">

</style>
