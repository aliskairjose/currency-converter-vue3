
<script setup>
  import { ref, computed, onMounted, nextTick, watch, watchEffect } from "vue";
  import { currencyList, converter } from './providers/api'
  import ButtonChangeCurrency from "./components/ButtonChangeCurrency.vue";
  import Footer from "./components/Footer.vue";
import ConverterTable from "./components/ConverterTable.vue";

  const currencies = ref( [] )
  const baseCurrency = ref( { code: 'USD', name: "US Dollar", } )
  const currency = ref( { code: 'EUR', name: 'Euro' } )
  const importe = ref( 1 )
  const rate = ref( 0 );

  onMounted( () => {
    getCurrencies();
  } )

  /**
   * Vigila todos los cambios de las propiedades reactivas del dom,
   * observará cambios en todos los valores reactivos referenciados dentro de su callback
   * */
  watchEffect( () => {
    getConverter();
  })

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
  <h1 class="lg:w-10/12 w-11/12 text-left text-4xl lg:text-5xl my-10 font-semibold">Conversor de divisas</h1>
  <div class="grid gap-6 container mx-auto border rounded-xl lg:px-10 px-4 py-14 shadow-xl bg-white lg:w-10/12 w-11/12 mb-20">
    <div class="">
      <form @submit.prevent class="flex flex-col lg:flex-row justify-between lg:gap-4 gap-1 text-justify">
        <div class="flex-1">
          <p class="font-semibold pb-1">Importe</p>
          <input v-model=" importe " class="border rounded-md border-gray-300 p-3 w-full" type="text" />
        </div>
        <div class="flex-1">
          <p class="font-semibold pb-1">De</p>
          <select v-model=" baseCurrency " class="border rounded-md border-gray-300 p-3 w-full">
            <option v-for="bCurr in currencies" :value=" bCurr " :key="bCurr.code">
              {{ bCurr.code }} - {{ bCurr.name }}
            </option>
          </select>
        </div>
        <div class="grid lg:place-items-end place-items-center">
          <ButtonChangeCurrency @clickHandler="changeCurrency" />
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
      <p class="text-2xl lg:text-4xl">
        {{ computedRate }} {{ currency.name  }}
      </p>
      <p class="text-gray-500">
        1 {{ currency.code }} = {{ computedReverseRate }} {{ baseCurrency.code }}
      </p>
    </div>
    <div class="flex flex-col lg:flex-row justify-between">
      <div class="lg:w-1/2 w-full">
        <div class="bg-sky-50 lg:w-10/12 w-full text-xs text-gray-600 p-3 rounded-md text-justify">
          Usamos la tasa del mercado medio para nuestro conversor. Esto solo tiene fines informativos. No
          recibirás esta tasa cuando envíes dinero. <span class="text-blue-600">Consulta las tasas de
            envío.</span>
        </div>
      </div>
      <div class="lg:w-1/2 w-full lg:text-right text-center mt-4 lg:mt-0">
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
  <ConverterTable :data="{
    baseCurrency,
    currency,
    rate
  }" />
  <Footer />
</template>


<style lang="scss" scoped>

</style>