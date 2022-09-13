<template>
    <div class="upload-payroll">
        <button 
        class="ui button primary"
        @click="showCloseForm"
        >New payroll</button>

        <form class="ui form upload-payroll__form" :class=" { open: showForm }" @submit.prevent="handleSubmit">
            <div class="field">
                <label for="file" class="ui icon button">
                    <i class="fa-solid fa-file-lines"></i>
                    Select payroll
                </label>
                <input 
                type="file" 
                id="file" 
                style="display: none"
                @change="uploadFile"
                >
            </div>
            <div class="field">
                <div class="ui calendar">
                    <div class="ui input left icon">
                        <input type="date" @change="changeDate">
                    </div>
                </div>
            </div>
            <button class="ui button positive" :class="{ loading }">Upload payroll</button>
        </form>

  </div>
</template>

<script>
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import { storeFile, dowloadFile} from "../../utils/firebaseFunctions";
import { auth,db } from "../../utils/firebase";
import { collection, addDoc } from "firebase/firestore";
//


export default {
    name: "UploadPayroll",
    props:{
        getPayrolls: Function,
    },
    setup(props){
        let showForm = ref(false);
        let file = ref(null);
        let date = ref(null);
        let loading = ref(false);
        let error = ref(null);
      

        const showCloseForm = () =>{
            showForm.value = !showForm.value;
        };
        const uploadFile = (e) =>{
            const fileTemp = e.target.files[0];
            if (fileTemp.type === "application/pdf") {
                file.value = fileTemp;
            }
        };
        const changeDate = (e) =>{
            date.value = e.target.value;
        }
        const handleSubmit = async () =>{
            if(file.value && date.value){
                loading.value = true;
                try{
                    const nameFile = uuidv4();
                    await storeFile(nameFile, file.value); 
                   const urlFile =  await dowloadFile(nameFile);
                    await addDoc(collection(db, auth.currentUser.uid), {            
                    nameFile,
                    urlFile,
                    date: new Date(date.value),
                    dateString: date.value,
                    });
                    props.getPayrolls();
                }catch(error){
                    console.log(error);
                }
                loading.value = false;
                file.value = null;
                date.value = null;
                showForm.value = false;
                error.value = null;
                document.getElementById("file").value = "";
            } else{
                error.value = "Sube una nómina y selecciona la fecha de la nómina";
            }
        }
        return{ showForm, 
                showCloseForm, 
                uploadFile,
                file,
                date,
                loading,
                error,
                handleSubmit, 
                changeDate,}
    }

}
</script>

<style lang="scss" scoped>
.upload-payroll{
    > .ui.button.primary{
        margin-bottom: 30px;
    }
    &__form{
        display: flex;
        align-items: center;
        flex-direction: column;
        height: 0;
        overflow: hidden;
        transition: height 0.3s ease;
        &.open{
        height: 200px;
    }
    }
    
}

</style>