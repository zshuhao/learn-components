<template>
    <form>
        <slot></slot>
    </form>
</template>

<script>
// import {} from '
export default {
    name: 'iForm',
    props: {
        model: {
            type: Object
        },
        rules: {
            type: Object
        }
    },
    provide () {
        return {
            form: this
        }
    },
    data () {
        return {
            fields: []
        }
    },
    created () {
        /**
         * 注意，Vue.js 的组件渲染顺序是由内而外的，所以 FormItem 要先于 Form 渲染，
         * 在 FormItem 的 mounted 触发时，我们向 Form 派发了事件 on-form-item-add，
         * 并将当前 FormItem 的实例（this）传递给了 Form，而此时，Form 的 mounted 尚未触发，
         * 因为 Form 在最外层，如果在 Form 的 mounted 里监听事件，是不可以的，
         * 所以要在其 created 内监听自定义事件，Form 的 created 要先于 FormItem 的 mounted。
         */
        this.$on('on-form-item-add', (field) => {
            if (field) this.fields.push(field)
        })
        this.$on('on-form-item-remove', (field) => {
            if (field.prop) this.fields.splice(this.fields.indexOf(field), 1)
        })
    },
    methods: {
        // 公开方法：全部重置数据
        resetFields () {
            this.fields.forEach(field => {
                field.resetField()
            })
        },
        // 公开方法：全部效验数据，支持 Promise
        validate (callback) {
            return new Promise(resolve => {
                let valid = true
                let count = 0
                this.fields.forEach(field => {
                    field.validate('', errors => {
                        if (errors) {
                            valid = false
                        }
                        if (++count === this.fields.length) {
                            resolve(valid)
                            if (typeof callback === 'function') {
                                callback(valid)
                            }
                        }
                    })
                })
            })
        }
    }
}
</script>
