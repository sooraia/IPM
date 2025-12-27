<template>
 <div id="editable">
    <div class="input-group">
        <label id="label" for="content">{{ label }}:</label>
        <input id="content" v-model="fieldValue" placeholder="Enter new value" :readonly="!props.editingMode" :type="type" />
    </div>
 </div>
</template>

<script setup>
import { ref } from 'vue';
import {computed} from 'vue';

const props = defineProps({
    label: {
        type: String
    },
    value: {
        type: String
    },
    type: {
        type: String,
        default: 'text'
    },
    editingMode: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['update:value']);

const fieldValue = ref(props.value);

</script>

<style scoped>

#editable {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 10px;
}
.input-group {
    background-color: var(--accent);
    border-radius: 30px;
    color: var(--white);
    font-weight: 600;
    display: flex;
    gap: 10px;
    text-align: center;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    padding-left: 20px;
    height: 60px;
    width: 100%;
}

#label {
    font-size: 20px;
    white-space: nowrap;
}


#content {
    width: 100%;
    height: 35px;
    border-radius: 20px;
    border: none;
    background-color: var(--bg);
    color: var(--gray-color);
    padding-left: 15px;
    margin-right: 20px;
    font-size: 20px;
}
#content:focus {
    outline: 2px solid var(--accent2);
}

#content:read-only {
    cursor: default;
    background-color: #d5dfde73;
    color: var(--white);
    font-weight: 400;

}
#content:read-only:focus {
    outline: none;
}
#editable button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 52px;
    width: 62px;
    background-color: var(--light-accent2);
    border-radius: 30px;
    cursor: pointer;
    border: none;
}


#editable button:hover {
    background-color: var(--accent2);
    filter: drop-shadow(4px 4px 6px var(--shadow));
}
</style>