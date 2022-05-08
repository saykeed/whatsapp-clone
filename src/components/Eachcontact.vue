<template>
    <router-link class="eachcontact" :to="`/chatpage/${JSON.stringify(contact)}`">
        <img src="https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png" alt=""/>
        <div class="info">
            <h3>{{contact.name[0]}}</h3>
            <p>{{ contact.tel[0]}}</p>
        </div>
    </router-link>
    <!-- 
            name: {{contact.name[0]}}
        <p> tel: {{ contact.tel[0]}}</p>
     -->
</template>

<script>

export default {
  name: 'HomeView',
  props: ['contact'],
  components: { },
  setup(props) {
    // variables


    // functions
    

    return {  }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/variable.scss";

    a.eachcontact{
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem;
        cursor: pointer;
        text-decoration: none;
        -webkit-tap-highlight-color: $fadeBlack;

        &:active{
            background: $fadeBlack;
        }

        img{
            width: 50px;
            height: 50px;
            border-radius: 50px;
            object-fit: cover;
        }

        div.info{
            width: 100%;
            margin-left: 1rem;
            text-align: left;

            h3{
                color: white;
            }

            p{
                color: $fadeBlack;
            }
        }
    }

</style>
