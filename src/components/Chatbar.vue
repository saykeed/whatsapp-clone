<template>
    <div class="chatbar">
        <div class="input">
            <i class="material-icons">tag_faces</i>
            <textarea></textarea>
            <i class="material-icons">attachment</i>
            <i class="material-icons camera">camera_alt</i>
        </div>
        <Sendbtn />
    </div>
</template>

<script>
import Sendbtn from '@/components/Sendbtn.vue'
export default{
    name: 'chatpageheader',
    props: ['name'],
    components: { Sendbtn },
    setup() {
        

      return {  }  
    },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

    div.chatbar{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 60px;
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem;

        div.input{
            width: calc(100% - 60px);
            background: $headerBackground;
            height: 100%;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 0.5rem;

            textarea{
                width: 100%;
                resize: none;
                height: auto;
                margin: 0 0.5rem;
                background: transparent;
                border: none;
                color: white;
                font-family: Arial;
                

                &:focus{
                    outline: none;
                }
            }

            i.camera{
                margin-left: 1rem;
            }
        }
    }

</style>