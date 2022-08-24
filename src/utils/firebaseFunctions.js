import { EmailAuthProvider, getAuth, reauthenticateWithCredential } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject} from "firebase/storage";

const auth = getAuth()
const storage = getStorage();

export function reauthenticate(password) {
    const user = auth.currentUser;
    const credentials = EmailAuthProvider.credential(
        user.email,
        password
    )
    return reauthenticateWithCredential(user, credentials);
}
export function storeFile(nameFile, file){ 
    const fileRef = ref(storage, auth.currentUser.uid+"/"+nameFile+".pdf");
    return uploadBytes(fileRef, file); 
}

export function dowloadFile(nameFile){
  const httpsReference = getDownloadURL(ref(storage,  auth.currentUser.uid+"/"+nameFile+".pdf")).then((url) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
      };
      const urlRef = url
      return urlRef;
      }).catch((error) => {
    });
  return httpsReference
}









