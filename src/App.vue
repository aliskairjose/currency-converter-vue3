<script setup>
import { ref, computed, onMounted, nextTick, watch, watchEffect } from "vue";
import { currencyList, converter } from './providers/api'

const currencies = ref( [] )
const baseCurrency = ref( { code: 'USD', name: "US Dollar", } )
const currency = ref( { code: 'EUR', name: 'Euro' } )
const importe = ref( 1 )
const rate = ref( 0 );

onMounted( () => {
  getCurrencies();

} )

// Vigila todos los cambios de las propiedades reactivas del dom,
watchEffect( () => {
  getConverter();
})

// El watch trabaja como observable, viggilando los cambios de las propiedades establecidas

// watch(baseCurrency, ()=>{
//   console.log('watch');
//   getConverter()
// })

// watch(currency, ()=>{
//   console.log('watch');
//   getConverter()
// })

async function getCurrencies () {
  currencies.value = await currencyList();
  await nextTick()
}

async function getConverter () {
  rate.value = await converter( baseCurrency.value.code, currency.value.code );
}

function changeCurrency () {
  // ae aplica el cambio de monedas y se actualiza los valores, activando el watch
  const base = baseCurrency.value;
  const curr = currency.value
  baseCurrency.value = curr;
  currency.value = base
}

const computedRate = computed(()=>{
  const _rate = rate.value[currency.value.code] * importe.value
  return _rate || 0
})

const computedReverseRate = computed(()=>{
  const _rate = importe.value / rate.value[ currency.value.code ]
  return _rate || 0
})
</script>

<template>
  <div class="grid gap-6 container mx-auto border rounded-xl px-10 py-14 shadow-xl bg-white w-10/12">
    <div class="">
      <form @submit.prevent class="flex justify-between gap-4 text-justify">
        <div class="flex-1">
          <p class="font-semibold pb-1">Importe</p>
          <input v-model=" importe " class="border rounded-md border-gray-300 p-3 w-full" type="text" />
        </div>
        <div class="flex-1">
          <p class="font-semibold pb-1">De:</p>
          <select v-model=" baseCurrency " class="border rounded-md border-gray-300 p-3 w-full">
            <option v-for="bCurr in currencies" :value=" bCurr " :key="bCurr.code">
              {{ bCurr.code }} - {{ bCurr.name }}
            </option>
          </select>
        </div>
        <div class="grid place-items-end">
          <button class="rounded-full border border-gray-300 h-14 w-14 hover:border-blue-500 hover:bg-gray-200 "
            @click=" changeCurrency ">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="bi bi-arrow-left-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z" />
            </svg>
          </button>
        </div>
        <div class="flex-1">
          <p class="font-semibold pb-1">a</p>
          <select v-model=" currency " class="border rounded-md border-gray-300 p-3 w-full">
            <option v-for=" curr in currencies " :value=" curr " :key="curr.code">
              {{ curr.code }} - {{ curr.name }}
            </option>
          </select>
        </div>
      </form>
    </div>
    <div class="flex flex-col items-start gap-2">
      <p class="font-semibold text-gray-500">
        {{ importe }} {{ baseCurrency.name }} =
      </p>
      <p class="text-4xl">
        {{ computedRate }} {{ currency.name  }}
      </p>
      <p class="text-gray-500">
        1 {{ currency.code }} = {{ computedReverseRate }} {{ baseCurrency.code }}
      </p>
    </div>
    <div class="flex justify-between">
      <div class="w-1/2">
        <div class="bg-sky-50 w-10/12 text-xs text-gray-600 p-3 rounded-md text-justify">
          Usamos la tasa del mercado medio para nuestro conversor. Esto solo tiene fines informativos. No
          recibirás esta tasa cuando envíes dinero. <span class="text-blue-600">Consulta las tasas de
            envío.</span>
        </div>
      </div>
      <div class="w-1/2 text-right">
        <button class="py-2 px-6 text-white bg-sky-500 rounded-md mb-4">
          Ver contizacón de transferencia
        </button>
        <p class="text-xs text-gray-600 text-justify">Conversión de <span class="text-blue-600">Dólar
            estadounidense</span> a
          <span class="text-blue-600">Euro</span> — Última actualización: 12 nov 2023, 23:46 UTC
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
