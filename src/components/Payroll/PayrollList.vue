<template>
  <div class="payroll-list">
      <p class="payroll-list__not-found" v-if="payrolls?.lenght === 0">
        No tienes ninguna nomina, sube la primera</p>
  </div>
  <div 
    class="payroll-list__payroll"
    v-for="payroll in payrolls"
    :key="payroll.id">
  <p>{{ formDate(payroll.dateString) }}</p>
  <div class="action">
    <a :href="payroll.urlFile" target="_blank" class="ui button positive" id="download">Descargar</a>
    <button class="ui button red" @click="deletePaylloads(payroll.id)" >Eliminar</button>
  </div>
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/es";
import { doc, deleteDoc } from "firebase/firestore";
 import { auth, db } from "../../utils/firebase";


export default {
    name: "PayrollList",
    props: {
      payrolls: Array,
      getPayrolls: Function,

    }, setup(props){
      const formDate = (date) =>{
        return moment(date).format("MMMM [del] YYYY")
      }
      const deletePaylloads = async (id) =>{
        try{
          await deleteDoc(doc(db, auth.currentUser.uid, id));
          props.getPayrolls();
        }catch(error){
        }
      }

        
      
      
      
      
 
      

return{ formDate, deletePaylloads}
      

}}
</script>

<style lang="scss" scoped>
.payroll-list{
  &__not-found{
    text-align: center;
    font-size: 20px;
  }
  &__payroll{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 15px 0;
    p{
      margin: 0;
      text-transform: uppercase;
      font-weight: bold;
    }
  }
}

</style>