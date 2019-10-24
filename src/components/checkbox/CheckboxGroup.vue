<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
import { findComponentsDownward } from '../../utils/assist'
import Emitter from '../../mixins/emitter'
export default {
    name: 'iCheckboxGroup',
    mixins: [ Emitter ],
    props: {
        value: {
            type: Array,
            default: () => []
        }
    },
    data () {
        return {
            currentValue: this.value,
            children: []
        }
    },
    watch: {
        value () {
            this.updateModel(true)
        }
    },
    mounted () {
        this.updateModel(true)
    },
    methods: {
        updateModel (update) {
            this.childrens = findComponentsDownward(this, 'iCheckbox')
            // 把 CheckboxGroup 的 value，赋值给 Checkbox 的 model，并根据 Checkbox 的 label，设置一次当前 Checkbox 的选中状态
            if (this.childrens) {
                const { value } = this
                this.childrens.forEach(child => {
                    child.model = value

                    if (update) {
                        child.currentValue = value.indexOf(child.label) >= 0
                        child.group = true
                    }
                })
            }
        },
        change (data) {
            this.currentValue = data
            this.$emit('input', data)
            this.$emit('on-change', data)
            this.dispatch('iFormItem', 'on-form-change', data)
        }
    }
}
</script>
