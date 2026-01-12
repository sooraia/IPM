<template>
  <div class="container" ref="containerRef">
    <input ref="inputEl" id="myInput" type="text" v-model="current" 
      :placeholder="placeholderText"  name="search" :disabled="disabled"
      autocomplete="off"
      @input="handleInput"
      @keydown="handleKeyDown"
      @focus="showSuggestions = true"
    />
    <div 
      v-if="showSuggestions && filteredSuggestions.length > 0"
      class="autocomplete-items"
    >
      <div
        v-for="(suggestion, index) in filteredSuggestions"
        :key="suggestion"
        :class="['suggestion-item', { 'autocomplete-active': activeIndex === index }]"
        @click="selectSuggestion(suggestion)"
        @mouseenter="activeIndex = index"
        @mouseleave="activeIndex = -1"
      >
        <span v-html="boldMatch(suggestion, current)"></span>
      </div>
    </div>
    <div 
      v-if="showSuggestions && current && filteredSuggestions.length === 0"
      class="autocomplete-items no-results"
    >
      <div class="no-suggestions">
        No suggestions found
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onUnmounted } from 'vue';
import { fetchAvailableCities } from '@/utils/cityData';

const props = defineProps({
    placeholderText: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: false,
        default: ''
    },
    disabled:{
        type: Boolean,
        required: false,
        default: false
    },
    suggestionsList: {
        type: Array,
        required: false,
        default: () => []
    },
    isValueCity: {
        type: Boolean,
        required: false,
        default: true
    }
});

const emit = defineEmits(['update:value']);

const current = ref('');
const inputEl = ref(null);
const containerRef = ref(null);
const suggestions = ref([]);
const showSuggestions = ref(false);
const activeIndex = ref(-1);

watch(() => props.value, (v) => {
    current.value = v;
});

watch(current, (v) => {
    emit('update:value', v);
});

watch(() => props.suggestionsList, (newSuggestions) => {
    current.value = '';
    suggestions.value = newSuggestions;
});


onMounted(async () => {
    if (props.value) current.value = props.value.match(/[A-Z][a-z]+|[0-9]+/g).join(" ");
    if (props.isValueCity) {
        suggestions.value = await fetchAvailableCities();
    } else suggestions.value = props.suggestionsList;
    document.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', closeSuggestions);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
    window.removeEventListener('scroll', closeSuggestions);
});

const filteredSuggestions = computed(() => {
    if (!current.value || !suggestions.value.length) return [];
    
    const searchTerm = current.value.toLowerCase();
    return suggestions.value.filter(suggestion => suggestion.toLowerCase().includes(searchTerm));
});

function handleInput() {
    showSuggestions.value = true;
    activeIndex.value = -1;
}

function handleKeyDown(e) {
    if (!showSuggestions.value || filteredSuggestions.value.length === 0) return;
    
    switch (e.key) {
        case 'ArrowDown':
            e.preventDefault();
            activeIndex.value = (activeIndex.value + 1) % filteredSuggestions.value.length;
            scrollToActive();
            break;
            
        case 'ArrowUp':
            e.preventDefault();
            activeIndex.value = activeIndex.value <= 0 
                ? filteredSuggestions.value.length - 1 
                : activeIndex.value - 1;
            scrollToActive();
            break;
            
        case 'Enter':
            e.preventDefault();
            if (activeIndex.value >= 0 && activeIndex.value < filteredSuggestions.value.length) {
                selectSuggestion(filteredSuggestions.value[activeIndex.value]);
            }
            break;
            
        case 'Escape':
            closeSuggestions();
            break;
    }
}

function selectSuggestion(suggestion) {
    current.value = suggestion;
    showSuggestions.value = false;
    activeIndex.value = -1;
    inputEl.value?.focus();
}

function boldMatch(txt, search) {
    if (!search) return txt;
    const matchIndex = txt.toLowerCase().indexOf(search.toLowerCase());
    
    if (matchIndex >= 0) {
        return txt.substring(0, matchIndex) + `<strong>${txt.substring(matchIndex, matchIndex + search.length)}</strong>` +
               txt.substring(matchIndex + search.length);
    }
    
    return txt;
}

function handleClickOutside(e) {
    if (containerRef.value && !containerRef.value.contains(e.target)) {
        closeSuggestions();
    }
}

function closeSuggestions() {
    showSuggestions.value = false;
    activeIndex.value = -1;
}
</script>

<style scoped>
.container {
    position: relative;
    width: 100%;
}
input {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    border: 0;
    border-radius: 30px;
    background-color: var(--bg);
    padding: 6px 12px;
    font-size: 15px;
    color: var(--gray-color);
    outline: none;
}

input:disabled {
    color: #acacac;
    opacity: 0.6;
    cursor: not-allowed;
}

input:focus {
    outline: 2px solid var(--accent2);
    width: 100%;
}

.autocomplete-items {
    position: absolute;
    width: 100%;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    max-height: 200px;
    overflow-y: auto;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    z-index: 99;
}

.autocomplete-items.no-results {
    border-color: #ffcccc;
}

.suggestion-item {
    padding: 10px;
    cursor: pointer;
    border-bottom: 1px solid #eee;
    transition: background-color 0.2s;
}

.suggestion-item:hover,
.suggestion-item.autocomplete-active {
    background-color: var(--accent2);
    color: white;
}

.suggestion-item:last-child {
    border-bottom: none;
}

.suggestion-item strong {
    font-weight: bold;
    color: #007bff;
}

.suggestion-item:hover strong,
.suggestion-item.autocomplete-active strong {
    color: white;
}

.no-suggestions {
    padding: 10px;
    color: #999;
    text-align: center;
    font-style: italic;
}
</style>