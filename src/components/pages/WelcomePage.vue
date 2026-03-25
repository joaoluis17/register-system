<template>
  <div class="form-container">
    <p class="step-indicator">Etapa <strong>1</strong> de 4</p>
    <h2 class="form-title">Seja bem vindo(a)!</h2>

    <form @submit.prevent="$emit('next')" class="form">
      <FormInput
        id="email"
        label="Digite o seu E-mail:"
        type="email"
        v-model="formData.email"
        placeholder="meu_email@mb.com"
        required
        :error="errors.email"
      />
      <div class="select-tipoCadastro">
        <label>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="pf-icon">
            <path fill-rule="evenodd" d="M1 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V6Zm4 1.5a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm2 3a4 4 0 0 0-3.665 2.395.75.75 0 0 0 .416 1A8.98 8.98 0 0 0 7 14.5a8.98 8.98 0 0 0 3.249-.604.75.75 0 0 0 .416-1.001A4.001 4.001 0 0 0 7 10.5Zm5-3.75a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Zm0 6.5a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Zm.75-4a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5h-2.5Z" clip-rule="evenodd" />
          </svg>
          <input type="radio" v-model="formData.tipoCadastro" value="PF" class="pf" />
          Pessoa física
        </label>
        <label>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="pj-icon">
            <path d="M2.879 7.121A3 3 0 0 0 7.5 6.66a2.997 2.997 0 0 0 2.5 1.34 2.997 2.997 0 0 0 2.5-1.34 3 3 0 1 0 4.622-3.78l-.293-.293A2 2 0 0 0 15.415 2H4.585a2 2 0 0 0-1.414.586l-.292.292a3 3 0 0 0 0 4.243ZM3 9.032a4.507 4.507 0 0 0 4.5-.29A4.48 4.48 0 0 0 10 9.5a4.48 4.48 0 0 0 2.5-.758 4.507 4.507 0 0 0 4.5.29V16.5h.25a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75v-3.5a.75.75 0 0 0-.75-.75h-2.5a.75.75 0 0 0-.75.75v3.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1 0-1.5H3V9.032Z" />
          </svg>
          <input type="radio" v-model="formData.tipoCadastro" value="PJ" class="pj" />
          Pessoa jurídica
        </label>
      </div>
      <button type="submit" class="form-button">Continuar</button>
    </form>
  </div>
</template>

<script setup>
const props = defineProps({
  formData: Object,
  errors: Object,
});
const emit = defineEmits(["next"]);
</script>
