<template>
    <div>
        <label v-if="label" :class="{ 'i-form-item-label-required': isRequired }">{{ label }}</label>
        <div>
            <slot></slot>
            <div v-if="validateState === 'error'" class="i-form-item-message">{{ validateMessage }}</div>
        </div>
    </div>
</template>

<script>
import AsyncValidator from 'async-validator'
import Emitter from '../../mixins/emitter'
export default {
    name: 'iFormItem',
    props: {
        label: {
            type: String,
            default: ''
        },
        prop: {
            type: String
        }
    },
    mixins: [Emitter],
    inject: ['form'],
    data () {
        return {
            isRequired: false, // 是否必填
            validateState: '', // 效验状态
            validateMessage: '' // 效验不通过的提示
        }
    },
    computed: {
        // 从 Form 的 model中动态获取当前表单组件的数据
        fieldValue () {
            return this.form.model[this.prop]
        }
    },
    mounted () {
        if (this.prop) {
            this.dispatch('iForm', 'on-form-item-add', this)

            // 设置初始值，以便在重置时恢复默认值
            this.initialValue = this.fieldValue

            this.setRules()
        }
    },
    methods: {
        setRules () {
            let rules = this.getRules()
            if (rules.length) {
                rules.every(rule => {
                    // 如果当前校验规则中有必填项，则标记出来
                    this.isRequired = rule.required
                })
            }

            this.$on('on-form-blur', this.onFieldBlur)
            this.$on('on-form-change', this.onFieldChange)
        },
        // 从 Form 的 rules 属性中，获取当前 FormItem 的效验规则
        getRules () {
            let formRules = this.form.rules
            formRules = formRules ? formRules[this.prop] : []
            return [].concat(formRules || [])
        },
        getFileredRule (trigger) {
            const rules = this.getRules()
            return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1)
        },
        /**
         * 效验数据
         * @param trigger 效验类型
         * @param callback 回调函数
         */
        validate (trigger, callback = function () {}) {
            let rules = this.getFileredRule(trigger)

            if (!rules || rules.length === 0) {
                return true
            }

            // 设置状态为效验中
            this.validateState = 'validating'

            // 以下为 async-validator 库的调用方法
            let descriptor = {}
            descriptor[this.prop] = rules

            const validator = new AsyncValidator(descriptor)
            let model = {}
            model[this.prop] = this.fieldValue

            validator.validate(model, { firstFields: true }, errors => {
                this.validateState = !errors ? 'success' : 'error'
                this.validateMessage = errors ? errors[0].message : ''

                callback(this.validateMessage)
            })
        },
        onFieldBlur () {
            this.validate('blur')
        },
        onFieldChange () {
            this.validate('change')
        },
        resetField () {
            this.validateState = ''
            this.validateMessage = ''

            this.form.model[this.prop] = this.initialValue
        }
    }
}
</script>

<style lang="less">
.i-form-item-label-required:before {
    content: '*';
    color: red;
}
.i-form-item-message {
    color: red;
}
</style>
