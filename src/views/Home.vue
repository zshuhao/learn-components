<template>
    <div class="home">
        <HelloWorld msg="Welcome to Your Vue.js App"/>
        <button @click="handleTest">测试按钮</button>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
export default {
    name: 'home',
    components: {
        HelloWorld
    },
    data () {
        return {
            obj: {
                name: '000'
            }
        }
    },
    methods: {
        handleTest () {
            console.log(this.obj)
            this.obj.name = 'lele'
            console.log(this.obj)
        }
    }
}
</script>
