<template>
    <div class="login">
        <div class="loginModal" v-if="phoneModal">
            <form @submit.prevent="registerPhone">
                <p>It seems it is your first time here, Kindly input your phone number with your country code</p>
                <input type="text" v-model="phone" required placeholder="08012345678">
                <button id="sign-in-button">Register</button>
            </form>
        </div>
        <div class="loginModal" v-if="codeModal">
            <form @submit.prevent="verifyPhone">
                <p>Input the verification code sent to the number you provided earlier</p>
                <input type="number" v-model="code" required placeholder="Verification code">
                <button>Verify</button>
            </form>
        </div>
        <div class="loginModal" v-if="nameModal">
            <form @submit.prevent="registerName">
                <p>This name will be visible to whoever you are chatting with</p>
                <input type="text" v-model="name" required placeholder="Name">
                <button>Finish</button>
            </form>
        </div>
    </div>
</template>

<script>
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getFirestore, collection, addDoc, doc, setDoc } from "firebase/firestore";
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import {useStore} from 'vuex'
import {phone as formatPhone} from 'phone';

export default {

    setup() {
        // variables
        const auth = getAuth();
        const db = getFirestore();
        const store = useStore()
        let confirmVerificationCode;
        const phone = ref(null)
        const code = ref(null)
        const name = ref(null)
        const phoneModal = ref(true)
        const codeModal = ref(false)
        const nameModal = ref(false)
        const router = useRouter()
        let formatedPhoneNumber = '';


        // functions
        const saveDataToFirestore = async (name, tel) => {
            await setDoc(doc(db, "regUsers", tel), {
                Name: name,
                Tel: tel
            }).then(() => {
                console.log('userData pushed to database')
                pushUserdataToStore(name, tel)
                router.push('/')
                alert("Welcome " + name)
            }).catch((err) => {
                console.log(err)
            })
        }

        const pushUserdataToStore = (name, tel) => {
            store.commit('updateUserdata', {Name: name, Tel: tel})
        }

        const registerPhone = () => {
            store.commit('updateLoaderStatus', true)
            window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
                'size': 'invisible',
                'callback': (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                    onSignInSubmit();
                }
            }, auth);

            
            
            let tel = formatPhone(phone.value, {country: 'NG'});
            formatedPhoneNumber = tel.phoneNumber
            console.log(formatedPhoneNumber)
            const appVerifier = window.recaptchaVerifier;

            signInWithPhoneNumber(auth, formatedPhoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                confirmVerificationCode = confirmationResult;
                    alert('code sent')
                    phoneModal.value = false;
                    codeModal.value = true;
                    store.commit('updateLoaderStatus', false)
                }).catch((error) => {
                    store.commit('updateLoaderStatus', false)
                    console.log(error)
                    alert('jam errror')
                });
        }

        const verifyPhone = () => {
            store.commit('updateLoaderStatus', true)
            confirmVerificationCode.confirm(code.value).then((result) => {
                // User signed in successfully.
                store.commit('updateLoaderStatus', false)
                const user = result.user;
                alert('logged in ')
                //console.log(user)
                codeModal.value = false;
                nameModal.value = true;
            }).catch((error) => {
                // User couldn't sign in (bad verification code?)
                store.commit('updateLoaderStatus', false)
                console.log(error)
                alert('bad verification code')
                codeModal.value = false;
                phoneModal.value = true;
            });
        }

        const registerName = () => {
            saveDataToFirestore(name.value, formatedPhoneNumber)
        }

        
      return { registerPhone, verifyPhone, phone, code, name, registerName,
      phoneModal, codeModal, nameModal }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

    div.login{
        background: rgba(0, 0, 0, 0.337);
        height: 100vh;
        width: 100vw;

        div.loginModal{
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 1rem;
            padding: 1rem;
            width: 90%;
            background: white;
            
            form{

                input{
                    width: 100%;
                    height: 40px;
                    border-radius: 5px;
                    padding: 10px;
                    border: 1px solid $whatsappGreen;
                    margin: 0.5rem auto;
                }

                button{
                    width: 120px;
                    line-height: 40px;
                    border: none;
                    background: $whatsappGreen;
                    margin: 0.5rem auto;
                    color: white;
                    border-radius: 0.5rem;
                }
            }
        }
    }
</style>