<template>
    <div>
        <i-checkbox v-model="checkboxValue">ddd</i-checkbox>
        <!-- <button @click="handelClick">测试</button> -->
        <i-checkbox-group v-model="checkboxGroupValue">
            <i-checkbox :label="1">选项1</i-checkbox>
            <i-checkbox :label="2">选项2</i-checkbox>
            <i-checkbox :label="3">选项3</i-checkbox>
        </i-checkbox-group>
    </div>
</template>

<script>
import iCheckbox from '../../components/checkbox/Checkbox'
import iCheckboxGroup from '../../components/checkbox/CheckboxGroup'
export default {
    name: 'CheckboxIndex',
    components: { iCheckbox, iCheckboxGroup },
    data () {
        return {
            checkboxValue: true,
            checkboxGroupValue: []
        }
    },
    watch: {
        checkboxValue (val) {
            console.log(val)
        },
        checkboxGroupValue (val) {
            console.log(val)
        }
    },
    methods: {
        handelClick () {
            // this.checkboxValue = '99999'
        }
    }
}
</script>
