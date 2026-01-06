<template>
 <div id="form-editable">
    <div class="input-group" v-for="([label, type], index) in props.labels">
        <label id="label" for="content">{{ label }}:</label>
        <input id="content" v-model="values[index]" placeholder="Enter new value" :readonly="!props.editingMode" :type="type" />
    </div>
    <div style="display: flex; justify-content: center; gap: 20px; margin-top: 20px;">
        <button v-if="props.editingMode===false" @click="toggleEdit">
            Edit
            <img src="../assets/edit.png" alt="edit icon" style="width: 15%;" />
        </button>
        <button id="save" v-else @click="handleSubmit">
            Save
            <img src="../assets/save-icon.png" alt="save icon" style="width: 20%;" />
        </button>
    </div>
 </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    labels: {
        type: Array
    },
    oldvalues: {
        type: Array
    },
    editingMode: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['submit', 'update:editingMode']);

const handleSubmit = () => {
    console.log("Submitting values:", values.value);
    emit('submit', values.value);
}

function toggleEdit() {
    emit('update:editingMode', !props.editingMode);
}

const values = ref(props.oldvalues);
const editing = ref(props.editingMode);
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


#form-editable {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 40%;
}

#form-editable button {
  display: inline-flex;
  width: 120px;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  height: 40px;
  gap: 10px;
  font-size: 20px;
  color: var(--white);
  background-color: var(--light-accent2);
  border-radius: 30px;
  cursor: pointer;
  border: none;
}

#form-editable button:hover {
    background-color: var(--accent2);
    filter: drop-shadow(4px 4px 6px var(--shadow));
}

</style>