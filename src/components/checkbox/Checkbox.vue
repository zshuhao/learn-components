<template>
    <label>
        <span>
            <input v-if="group" type="checkbox" :disabled="disabled" :value="label" v-model="model" @change="change">
            <input v-else type="checkbox" :disabled="disabled" :checked="currentValue" @change="change">
        </span>
        <slot></slot>
    </label>
</template>

<script>
import Emitter from '../../mixins/emitter'
import { findComponentUpward } from '../../utils/assist'
export default {
    name: 'iCheckbox',
    mixins: [Emitter],
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        value: {
            type: [String, Number, Boolean],
            default: false
        },
        trueValue: {
            type: [String, Number, Boolean],
            default: true
        },
        falseValue: {
            type: [String, Number, Boolean],
            default: false
        },
        label: {
            type: [String, Number, Boolean]
        }
    },
    data () {
        return {
            currentValue: this.value,
            model: [],
            group: false, // 是否放在 checkboxGroup 中使用
            parent: null
        }
    },
    mounted () {
        // 用 findComponentUpward 方法判断父组件是否有 CheckboxGroup
        this.parent = findComponentUpward(this, 'iCheckboxGroup')

        if (this.parent) {
            this.group = true
        }

        if (this.group) {
            this.parent.updateModel(true)
        } else {
            this.updateModel()
        }
    },
    watch: {
        value (val) {
            if (val === this.trueValue || val === this.falseValue) {
                this.updateModel()
            } else {
                throw new Error('Value should be trueValue or falseValue')
            }
        }
    },
    methods: {
        updateModel () {
            this.currentValue = this.value === this.trueValue
        },
        change (event) {
            if (this.disabled) {
                return false
            }

            const checked = event.target.checked
            this.currentValue = checked

            const value = checked ? this.trueValue : this.falseValue

            if (this.group) {
                this.parent.change(this.model)
            } else {
                this.$emit('input', value)
                this.$emit('on-change', value)
            }

            // 配合 iFormItem 使用
            this.dispatch('iFormItem', 'on-form-change', value)
        }
    }
}
</script>
