<template>
    <div class="home">
        <HelloWorld msg="Welcome to Your Vue.js App"/>
        <button @click="handleTest">测试按钮</button>
    </div>
</template>

<script>

import HelloWorld from '@/components/HelloWorld.vue'
import Emitter from '../mixins/emitter'
export default {
    name: 'home',
    components: {
        HelloWorld
    },
    mixins: [ Emitter ],
    data () {
        return {
            obj: {
                name: '000'
            }
        }
    },
    created () {
        this.$on('on-alert', this.showMessage)
    },
    methods: {
        handleTest () {
            this.broadcast('B', 'on-message', 'Hello Vue.js')
        },
        showMessage (text) {
            console.log(text)
        }
    }
}
</script>
