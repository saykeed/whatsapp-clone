<template>
    <div class="login">
        <div class="loginModal" v-if="phoneModal">
            <form @submit.prevent="registerPhone">
                <div>
                    <h4>Verify your phone number</h4>
                    <p class="desc">Whatsapp will need to verify your phone number.</p>
                    <select v-model="callingCode">
                        <option :value="country[1]" v-for="(country, index) in countries" :key="country.index">
                            {{ country[0] }}
                        </option>
                    </select>
                    <div class="numberDiv">
                        <p>+{{callingCode}}</p>
                        <input type="text" v-model="phone" required placeholder="phone number">
                    </div>
                </div>
                <button id="sign-in-button" :disabled="verifying">NEXT</button>
            </form>
        </div>

        <div class="loginModal" v-if="codeModal">
            <div class="verifyingDiv">
                <h4>Verifying your number</h4>
                <p class="desc">An SMS has been sent to {{ formatedPhoneNumber }}. <router-link to="/login">Wrong number?</router-link> </p>
                <input type="number" v-model="code" @input="verifyPhone" required placeholder="code">
                <p class="caption">Enter 6-digit code</p>
                <div class="buttons">
                    <p><i class="material-icons">message</i>Resend SMS</p>
                    <p><i class="material-icons">call</i>Call me</p>
                </div>
            </div>
        </div>
        
        <div class="loginModal" v-if="nameModal">
            <div class="profileDiv">
                <div>
                    <h4>Create your Profile</h4>
                    <p class="desc">This will be visible to other users you chat with.</p>
                    <input class="inputFile" type="file" accept="image/*" ref="getImage" @change="uploadImage">
                    <div class="imageBtn" @click="loadImage">
                        <i v-if="!photoUrl" class="material-icons">photo_camera</i>
                        <img v-if="photoUrl" :src="photoUrl" alt="">
                    </div>
                    <div class="username">
                        <i class="material-icons">account_circle</i>
                        <input type="text" placeholder="Username" v-model="name">
                    </div>
                </div>
                <button @click="registerName" >NEXT</button>
            </div>
        </div>
        
        <Dynamicloader v-if="dynamicAlertStatus"> 
            {{ alertSlotValue }}
        </Dynamicloader>

        <Erroralert v-if="errorAlertStatus">
            {{ errorSlotValue }}
        </Erroralert>
    </div>
</template>

<script>
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getFirestore, collection, addDoc, doc, setDoc } from "firebase/firestore";
import { getStorage, uploadBytes, ref as storageRef, getDownloadURL } from "firebase/storage";
import Dynamicloader from '@/components/Dynamicloader.vue'
import Erroralert from '@/components/Erroralert.vue'
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router'
import {useStore} from 'vuex'
import {phone as formatPhone} from 'phone';
import countryCodes from 'country-codes-list'
import gsap from 'gsap'

export default {
    components: { Dynamicloader, Erroralert },
    setup() {
        // variables
        const auth = getAuth();
        const db = getFirestore();
        const store = useStore()
        const storage = getStorage()
        let confirmVerificationCode;
        const phone = ref(null)
        const code = ref(null)
        const name = ref(null)
        const phoneModal = ref(true)
        const codeModal = ref(false)
        const nameModal = ref(false)
        const router = useRouter()
        let formatedPhoneNumber = ref(null);
        let countries = ref(null)
        const callingCode = ref(234)
        const verifying = ref(false)
        const dynamicAlertStatus = ref(false)
        const alertSlotValue = ref('')
        const getImage = ref(null)
        const photoUrl = ref(null)
        const errorSlotValue = ref('Error while trying to execute action, Please try again')


        // functions
        const saveDataToFirestore = async (name, tel, image) => {
            await setDoc(doc(db, "regUsers", tel), {
                Name: name,
                Tel: tel,
                Photo: image
            }).then(() => {
                console.log('userData pushed to database')
                pushUserdataToStore(name, tel, image)
                router.push('/')
            }).catch((err) => {
                console.log(err)
            })
        }

        const pushUserdataToStore = (name, tel, image) => {
            store.commit('updateUserdata', {Name: name, Tel: tel, Photo: image})
        }

        const registerPhone = () => {
            verifying.value = true
            window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
                'size': 'invisible',
                'callback': (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                    onSignInSubmit();
                }
            }, auth);
            let phoneInput = `+${callingCode.value}${phone.value}`
            let formatedTel = formatPhone(phoneInput, {country: ''});
            formatedPhoneNumber.value = formatedTel.phoneNumber
            //console.log(formatedPhoneNumber.value)
            const appVerifier = window.recaptchaVerifier;
            
            signInWithPhoneNumber(auth, formatedPhoneNumber.value, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                confirmVerificationCode = confirmationResult;
                    //alert('code sent')
                    phoneModal.value = false;
                    codeModal.value = true;
                }).catch((error) => {
                    //console.log(error)
                    errorSlotValue.value = 'Kindly Input your Phone number and try Again'
                    store.commit('updateErrorAlertStatus', true)
                    router.push('/')
                });
        }

        const verifyPhone = () => {
            // convert the input to string
            let x = String(code.value)
            if(x.length == 6) {
                alertSlotValue.value = 'Verifying'
                dynamicAlertStatus.value = true
                confirmVerificationCode.confirm(code.value).then((result) => {
                    // User signed in successfully.
                    const user = result.user;
                    dynamicAlertStatus.value = false
                    codeModal.value = false;
                    nameModal.value = true;
                }).catch((error) => {
                    // User couldn't sign in (bad verification code?)
                    dynamicAlertStatus.value = false
                    console.log(error)
                    store.commit('updateErrorAlertStatus', true)
                    codeModal.value = false;
                    phoneModal.value = true;
                    verifying.value = false
                });
            }
       }

        const registerName = () => {
            if(name.value){
                if (photoUrl.value) {
                    saveDataToFirestore(name.value, formatedPhoneNumber.value, photoUrl.value)
                } else {
                    let noPhoto = 'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png'
                    saveDataToFirestore(name.value, formatedPhoneNumber.value, noPhoto)
                }
            }
            
        }

        const fetchAllCountry = () => {
            // Codes.customList('countryCode', '[{countryCode}] {countryNameEn}: +{countryCallingCode}')
            const myCountryCodesObject = countryCodes.customList('countryNameEn', '{countryCallingCode}')
            countries.value = Object.entries(myCountryCodesObject);
        }

        const loadImage = () => {
            getImage.value.click()
        }

        const uploadImage = () => {
            dynamicAlertStatus.value = true
            alertSlotValue.value = 'Uploading Image'
            const imageFile = getImage.value.files[0]
            const imageName = imageFile.name +'_' + new Date()
            const imageRef = storageRef(storage, imageName);
            // uploading the selected image file
            uploadBytes(imageRef, imageFile)
            .then(() => {
                console.log('Uploaded a blob or file!');
                // getting the image url 
                const pathReference = storageRef(storage, imageName);
                getDownloadURL(pathReference)
                .then((url) => {
                    photoUrl.value = url;
                    console.log('photourl: ', photoUrl.value)
                    dynamicAlertStatus.value = false
                })
            })
            .catch( err => {
                console.log(err, 'error now')
                dynamicAlertStatus.value = false
            })
        }

        // computed properties
        const errorAlertStatus = computed(() => {
            return store.state.errorAlertStatus
        })

        // mounted
        onMounted(() => {
            fetchAllCountry()
        })
        
      return { registerPhone, verifyPhone, phone, code, name, registerName, alertSlotValue, dynamicAlertStatus,
                phoneModal, codeModal, nameModal, countries, callingCode, verifying, formatedPhoneNumber, getImage,
                loadImage, uploadImage, photoUrl, errorAlertStatus, errorSlotValue}
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

    div.login{
        background: white;
        height: 100vh;
        width: 100vw;
        position: relative;

        h4{
            text-align: center;
        }

        p.desc{
            font-size: 0.8rem;
            margin: 1rem auto 1rem;
            text-align: center;
            a{
                color: blue;
                text-decoration: none;
            }
        }

        div.loginModal{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 1rem;
            padding: 1rem;
            width: 90%;
            max-width: 400px;
            height: 100vh;
            background: white;
            
            form{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                height: 100%;

                select{
                    width: 100%;
                    height: 30px;
                    border: none;
                    border-bottom: 1px solid $whatsappGreen;
                    outline: none;
                    appearance: none;
                    -moz-appearance: none;
                    -webkit-appearance: none;
                    background: none;
                    text-align: center;
                    text-align-last:center;
                }

                .numberDiv{
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    height: 40px;
                    margin: 0.5rem auto;

                    p{
                        width: 30%;
                        line-height: 40px;
                        border-bottom: 1px solid $whatsappGreen;
                    }
                    input{
                        width: 60%;
                        height: 100%;
                        padding: 10px;
                        border: none;
                        outline: none;
                        border-bottom: 2px solid $whatsappGreen;
                    }
                }

                button{
                    width: 90px;
                    line-height: 40px;
                    border: none;
                    background: $whatsappGreen;
                    margin: 0.5rem auto;
                    color: white;
                    border-radius: 0.5rem;

                    &:disabled{
                        opacity: 0.5;
                        cursor: not-allowed;
                    }
                }
            }

            div.verifyingDiv{

                input{
                    display: block;
                    width: 50%;
                    margin: 0.5rem auto;
                    border: none;
                    border-bottom: 2px solid $whatsappGreen;
                    text-align: center;

                    &:focus{
                        outline: none;
                    }
                }

                p.caption{
                    font-size: 0.8rem;
                    text-align: center;
                }

                div.buttons{
                    width: 100%;
                    text-align: left;
                    margin: 1rem auto;

                    p{
                        line-height: 3rem;
                        color: rgba(0, 0, 0, 0.44);

                        i{
                            vertical-align: middle;
                            margin-right: 1rem;
                            margin-left: 0.5rem;
                        }

                        &:last-child{
                            border-top: 1px solid rgba(0, 0, 0, 0.44);
                        }
                    }
                }
            }

            div.profileDiv{
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;

                input.inputFile{
                    display: none;
                }

                .imageBtn{
                    width: 6rem;
                    height: 6rem;
                    border-radius: 6rem;
                    background: rgba(0, 0, 0, 0.179);
                    margin: 0.5rem auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;

                    i{
                        font-size: 2.5rem;
                        color: rgba(0, 0, 0, 0.439);
                    }

                    img{
                        width: 6rem;
                        height: 6rem;
                        border-radius: 6rem;
                        object-fit: cover;
                        object-position: top center;
                    }
                }

                div.username{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    input{
                        border: none;
                        border-bottom: 1px solid black;
                        width: 85%;
                        outline: none;

                        &:focus{
                            outline: none;
                            border: none;
                        }
                    }
                }

                button{
                    width: 90px;
                    line-height: 40px;
                    border: none;
                    background: $whatsappGreen;
                    margin: 0.5rem auto;
                    color: white;
                    border-radius: 0.5rem;

                    &:disabled{
                        opacity: 0.5;
                        cursor: not-allowed;
                    }
                }
            }
        }
    }
</style>