<template>
  <router-link id="card" :to="props.dest" @click="handleClick">        
        <div id="content">
            <slot>
                <img class="card-image" :src="imageSrc" style="width:80%" />
            </slot>
        </div>
        <div id="info">
            <div style="justify-content: space-between; display: flex;">
                <h2>{{ title }}</h2>
                    <button v-if="trashButton" class="trash-btn" @click.stop="handleDelete" title="Delete">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    height="24px" 
                    viewBox="0 -960 960 960" 
                    width="24px" 
                    fill="#e3e3e3">
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                    </svg>
                </button>
            </div>
            <p v-if="description">{{ description }}</p>
        </div>
    </router-link>
</template>

<script setup>
import { useRouter } from 'vue-router';
    const props = defineProps({
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        trashButton: {
            type: Boolean,
            required: false,
            default: false
        },
        dest: { 
            type: [String, Object], 
            required: false, 
            default: '' 
        },
        imageSrc: {
            type: String,
            required: false,
        }
    });

const emit = defineEmits(['delete', 'click']);
function handleDelete() {
    emit('delete');
}
const router = useRouter();
function handleClick() {
  emit('click')
  if (props.dest) {
    router.push(props.dest)
  }
}
</script>

<style scoped>
#card {
    background-color: var(--accent);
    border-radius: 30px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    min-width: 500px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

#card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    background-color: rgb(0, 48, 65);
    cursor: pointer;
}

#content {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
    background-color: rgba(219, 243, 253, 1);
    border-radius : 20px;
}

#info {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px 15px 10px 15px;
}

#card h2 {
    font-size: 25px;
    color: var(--bg);
    font-weight: 400;
}
#card p {
    font-size: 20px;
    color: var(--light-blue2);
}

.trash-btn {
    background: var(--light-accent2);
    border: none;
    color: var(--bg);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 6px;
    border-radius: 50%;
}

.trash-btn:hover {
    background: rgba(255,255,255,0.06);
}

.card-image { 
    width:100%; 
    max-height: 280px;
    object-fit:cover; 
    border-radius:10px; 
    flex-shrink:0;
}

</style>