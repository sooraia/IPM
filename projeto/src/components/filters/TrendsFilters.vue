<template>
  <div class="filter-box">
    <label>From:
      <input type="month" v-model="local.from" />
    </label>

    <label>To:
      <input type="month" v-model="local.to" />
    </label>

    <label>Aggregation:
      <select v-model="local.agg">
        <option value="monthly">Monthly</option>
        <option value="weekly">Weekly</option>
      </select>
    </label>

    <div class="actions">
      <button @click="emitApply">Apply</button>
      <button @click="clear">Clear</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({ initialFilters: { type: Object, default: () => ({ from: '', to: '', agg: 'monthly' }) } })
const emit = defineEmits(['update:filters', 'apply', 'clear'])

const local = reactive({ from: props.initialFilters.from ?? '', to: props.initialFilters.to ?? '', agg: props.initialFilters.agg ?? 'monthly' })

watch(local, (val) => emit('update:filters', { ...val }), { deep: true })

function emitApply() { emit('apply', { ...local }) }
function clear() { local.from = ''; local.to = ''; local.agg = 'monthly'; emit('clear') }
</script>

<style scoped>
.filter-box{display:flex;flex-direction:column;gap:8px}
.actions{display:flex;gap:8px;margin-top:8px}
button{padding:6px 10px}
</style>
