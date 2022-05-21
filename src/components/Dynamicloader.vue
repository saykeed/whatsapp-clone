<template>
    <div class="dynamicLoader">
        <div class="dynamicModal">
            <h3><slot></slot></h3>
            <div class="spinnerBox">
                <div><Spinner /></div>
                <p>Please wait a moment...</p>
            </div>
        </div>
    </div>
</template>

<script>
import Spinner from '@/components/Spinner.vue'
export default {
    components: { Spinner },
    setup () {


        // functions
        

      return {  }  
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

    div.dynamicLoader{
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0.700);

        div.dynamicModal{
            width: 90%;
            max-width: 500px;
            background: white;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: left;
            padding: 1rem;
            box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.693), -2px -2px 2px rgba(0, 0, 0, 0.693);

            div.spinnerBox{
                display: flex;
                align-items: center;
                margin: 0.5rem auto;

                p{
                    font-size: 0.8rem;
                    margin-left: 1rem;
                }
            }
        }
    }
</style>