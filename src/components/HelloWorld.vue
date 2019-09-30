<template>
    <div class="hello">
        <div>HelloWorld</div>
        <hello></hello>
    </div>
</template>

<script>
import Hello from './Hello.vue'
export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    components: { Hello },
    inject: ['app'],
    mounted () {
        console.log(this.app.person)
        console.log(this.app.updateName)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
