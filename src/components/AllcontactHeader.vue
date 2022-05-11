<template>
    <div class="allcontactheader">
        <router-link to="/"><i class="material-icons">arrow_back</i></router-link>
        <div class="headerText">
            <h3>Select Contact</h3>
            <p>406 contacts</p>
        </div>
        <div class="icons">
            <i class="material-icons">search</i>
            <i class="material-icons">menu</i>
        </div>
    </div>
</template>

<script>

export default{
    name: 'AllcontactHeader',
    props: ['name'],
    setup() {
        

      return {  }  
    },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

    .allcontactheader{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 70px;
        background: $headerBackground;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: white;
        padding: 0 0.5rem;
        text-align: left;

        a{
            text-decoration: none;
            color: white;
        }

        div.headerText{
            width: calc(100% - 100px);
            margin: 0 1rem 0 2rem;
        }

        div.icons{
            width: 100px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }

</style>