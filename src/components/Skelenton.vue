<template>
    <div class="eachcontact">
        <img src="https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236__340.png" alt=""/>
        <div class="info">
            <h3></h3>
            <p></p>
        </div>
        <p class="time"></p>
    </div>
</template>

<script>

export default {
  name: 'HomeView',
  components: { },
  setup() {
    // variables

    // functions
        
    return { }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";

    div.eachcontact{
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem;
        cursor: pointer;
        -webkit-tap-highlight-color: $fadeBlack;

        img{
            width: 50px;
            height: 50px;
            border-radius: 50px;
            object-fit: cover;
        }

        div.info{
            width: calc(100% - 180px);
            margin-left: 1rem;
            text-align: left;

            h3{
                height: 20px;
                width: 50%;
                background: rgba(255, 255, 255, 0.275);
                margin: 10px 0;
            }

            p{
                height: 10px;
                width: 80%;
                background: rgba(255, 255, 255, 0.275);
            }
        }
        p.time{
            height: 10px;
            background: rgba(255, 255, 255, 0.275);
            width: 120px;
        }
    }

</style>
