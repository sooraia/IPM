<template>
    <div class="filter-box">
        <label>Top N:
            <input type="number" v-model.number="local.topN" min="1" />
        </label>

        <label>Sort:
            <select v-model="local.sort">
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
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

    const props = defineProps({ initialFilters: { type: Object, default: () => ({ topN: 10, sort: 'desc' }) } })
    const emit = defineEmits(['update:filters', 'apply', 'clear'])

    const local = reactive({ topN: props.initialFilters.topN ?? 10, sort: props.initialFilters.sort ?? 'desc' })

    watch(local, (val) => emit('update:filters', { ...val }), { deep: true })

    function emitApply() {
      emit('apply', { ...local })
}

function clear() {
    local.topN = 10
    local.sort = 'desc'
    emit('clear')
}

</script>

<style scoped>
    .filter-box{display:flex;flex-direction:column;gap:8px}
    .actions{display:flex;gap:8px;margin-top:8px}
    button{padding:6px 10px}
</style>
