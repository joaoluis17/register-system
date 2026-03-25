<template>
  <div class="form-container">
    <p class="step-indicator">Etapa <strong>3</strong> de 4</p>
    <h2 class="form-title">Senha de acesso</h2>

    <form @submit.prevent="$emit('next')" class="form">
      <FormInput
        id="senha"
        label="Digite a sua senha:"
        type="password"
        v-model="formData.senha"
        required
      />

      <FormInput
        id="confirmarSenha"
        label="Confirme a sua senha:"
        type="password"
        v-model="formData.confirmarSenha"
        required
      />

      <div class="buttons">
        <button type="button" @click="$emit('back')" class="back-button">Voltar</button>
        <button type="submit" class="form-button">Continuar</button>
      </div>
    </form>
  </div>
</template>

<script setup>
const props = defineProps({
  formData: Object,
  errors: Object,
});
const emit = defineEmits(["next", "back"]);
</script>

<!--
<style>
.form-container {
  width: 100%;
  max-width: 400px;
  margin: 50px auto;
  font-family: Arial, sans-serif;
}

.step-indicator {
  font-size: 14px;
  color: #000;
  margin-bottom: 10px;
}

strong {
  color: #ff8c00;
}

.form-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 30px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-label {
  display: flex;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
  align-items: flex-start;
}

.input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
  box-sizing: border-box;
}

.error {
  color: red;
  font-size: 0.9em;
  margin-top: 4px;
}

.buttons {
  padding: 40px;
  display: inline-block;
}

.back-button {
  margin-right: 12px;
}

.form-button {
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  background-color: #ffa500;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.form-button:hover {
  background-color: #ff8c00;
  transform: scale(1.02);
}
</style>
-->
