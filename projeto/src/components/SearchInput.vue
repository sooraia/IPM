<template>
    <input id="myInput" type="text" v-model="current" :placeholder="placeholderText" name="search" :disabled="disabled" />
</template>

<script setup>
import { ref } from 'vue';
import { onMounted, watch } from 'vue';

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
    }
});

const current = ref(props.value);

const suggestions = fetchAvailableCities();
onMounted(async () => {
  const suggestions = await fetchAvailableCities()
  if (inputEl.value) autocomplete(inputEl.value, suggestions)
})

// watch(() => props.value, v => (current.value = v))
// watch(current, v => emit('update:value', v))

const inputEl = ref(null)

async function fetchAvailableCities() {
  const dataaux = {};
    try {
        const response = await fetch(`http://localhost:3000/cities.cities`);
        const data = await response.json();
        Object.assign(dataaux, data);
    } catch (error) {
        console.error("Erro a obter cidades", error);
        return [];
    }
  const cityCountry = [];
  for(let i=0; i<dataaux.length; i++){
    const {continent, countries} = dataaux;
    const { name, cities, available} = countries;

    for(let j=0; j<available.length; j++){
      const { country, city } = available[j];
      const pair = city + ", " + country;
      cityCountry.push(pair);
      }
  }
  return cityCountry;
}

function autocomplete(inp, arr) {
  var currentFocus;
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      this.parentNode.appendChild(a);
      for (i = 0; i < arr.length; i++) {
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          b = document.createElement("DIV");
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
              b.addEventListener("click", function(e) {
              inp.value = this.getElementsByTagName("input")[0].value;
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        currentFocus++;
        addActive(x);
      } else if (e.keyCode == 38) {
        currentFocus--;
        addActive(x);
      } else if (e.keyCode == 13) {
        e.preventDefault();
        if (currentFocus > -1) {
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
})
} 
</script>

<style scoped>
input {
  flex: 1 1 auto;
  height: 75%;
  width: 90%;
  box-sizing: border-box;
  border: 0;
  border-radius: 30px;
  background-color: var(--bg);
  padding: 6px 12px;
  font-size: 15px;
  color: var(--gray-color);
  outline: none;
}


input:focus {
  outline: 2px solid var(--accent2);
}
</style>