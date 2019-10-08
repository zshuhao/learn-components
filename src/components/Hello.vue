<template>
  <div class="hello">
      hello
      <button style="color: red" @click="handleTest">dispatch</button>
  </div>
</template>

<script>
import Emitter from '../mixins/emitter'
export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    mixins: [ Emitter ],
    mounted () {
    },
    methods: {
        handleTest () {
            this.dispatch('home', 'on-alert', 'dispatch')
        }
    }
}
</script>

<style scoped lang="less">

</style>
