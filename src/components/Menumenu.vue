<template>
    <div class="menumenu">
        <div class="popupMenu">
            <div class="logout" @click="logout">Logout</div>
        </div>
        <div class="popupOverlay" @click="closeMenuOptions"></div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { getAuth, signOut } from "firebase/auth";

export default {
    setup(props, { emit }) {
        // variables
        const auth = getAuth();

        // functions 
        const closeMenuOptions = () => {
            emit('closeMenuOptions')
        }
        const logout = () => {
            
            signOut(auth).then(() => {
                // Sign-out successful.
            }).catch((error) => {
                // An error happened.
            });
        }

      return { closeMenuOptions, logout }  
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
    div.menumenu{
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: 999;
        
        div.popupOverlay{
            position: fixed;
            width: 100vw;
            height: 100vh;
            top: 0;
            left: 0;
            background: transparent;
        }

        div.popupMenu{
            width: 180px;
            height: 230px;
            position: fixed;
            top: 5px;
            right: 5px;
            background: $menuBackground;
            z-index: 9999;
            box-shadow: 2px 2px 7px black, 2px 2px 7px black;
            color: white;

            div.logout{
                line-height: 40px;
                width: 100%;
                padding: 0 1rem;
                text-align: left;
            }
        }
    }
    
</style>