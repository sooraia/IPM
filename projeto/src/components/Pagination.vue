<template>
    <div class="pages" v-if="totalPages > 1">
        <button 
            v-if="hasPreviousPages"
            @click="previousPageGroup"
            class="page-button"
        >
            <
        </button>
        <p 
            v-for="page in visiblePages" 
            :key="page"
            :class="{ active: page === currentPage }"
            @click="changePage(page)"
        >
            {{ page }}
        </p>
        <button 
            v-if="hasMorePages"
            @click="nextPageGroup"
            class="page-button"
        >
            >
        </button>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
    totalPages: {
        type: Number,
        required: true
    },
    modelValue: {
        type: Number,
    }
});

const emit = defineEmits(['update:modelValue']);

const currentPage = ref(props.modelValue);
const pageGroupStart = ref(1);

const visiblePages = computed(() => {
    const pages = [];
    const end = Math.min(pageGroupStart.value + 1, props.totalPages);
    for (let i = pageGroupStart.value; i <= end; i++) {
        pages.push(i);
    }
    return pages;
});

const hasPreviousPages = computed(() => {
    return pageGroupStart.value > 1;
});

const hasMorePages = computed(() => {
    return pageGroupStart.value + 1 < props.totalPages;
});

function changePage(page) {
    currentPage.value = page;
    emit('update:modelValue', page);
}

function previousPageGroup() {
    pageGroupStart.value = Math.max(1, pageGroupStart.value - 1);
    changePage(pageGroupStart.value);
}

function nextPageGroup() {
    pageGroupStart.value += 1;
    changePage(pageGroupStart.value);
}

watch(() => props.modelValue, (newValue) => {
    currentPage.value = newValue;
});
</script>

<style scoped>
.pages {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin: 10px 0;
    cursor: pointer;
}

.pages p:hover {
    text-decoration: underline;
    color: var(--accent-hover);
}

.pages .active {
    text-decoration: underline;
    color: var(--accent-hover);
}

.page-button {
    background: none;
    cursor: pointer;
    border-radius: 50%;
    border: 1px solid var(--accent);
}

.page-button:hover {
    color: var(--accent-hover);
    border: 1px solid var(--accent-hover);
}
</style>
