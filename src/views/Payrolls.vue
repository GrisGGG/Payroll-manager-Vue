<template>
  <BasicLayout>
    <div class="payrolls">
      <h1>My payrolls</h1>
      <UploadPayroll :getPayrolls="getPayrolls" />
      <PayrollList :payrolls="payrolls" :getPayrolls="getPayrolls"></PayrollList>
    </div>
  </BasicLayout>
</template>

<script>
import { ref, onMounted } from "vue";
import BasicLayout from "../layouts/BasicLayout";
import UploadPayroll from "../components/Payroll/UploadPayroll";
import PayrollList from "@/components/Payroll/PayrollList";
import { auth, db } from "../utils/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";



export default {
    name:"Payrolls",
components:{
    BasicLayout,
    UploadPayroll,
    PayrollList

},
setup(){
  let payrolls = ref(null);

  onMounted(() =>{
  getPayrolls()

  });


  const getPayrolls = async () =>{
    const ordersRef = collection(db, auth.currentUser.uid);
    const q = query(ordersRef, orderBy("dateString", "desc"));
    const querySnapshot = await getDocs(q);
    
    const result = [];
    querySnapshot.forEach((doc) => {
    const data = doc.data();
      data.id = doc.id;
      data.date = doc.dateString,
      result.push(data)
    });
    payrolls.value = result;
  }
  
 
 
return{ payrolls, getPayrolls}

}}
</script>

<style lang="scss" scoped>
.payrolls {
  margin: 50px 0;
  text-align: center;
}
</style>