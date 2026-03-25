<template>
  <div class="home">
    <h1>Cadastro realizado com sucesso!</h1>
    <p>Obrigado por se cadastrar. Agora você pode acessar sua conta.</p>

    <button @click="resetForm">Voltar para o Formulário</button>
  </div>
</template>

<script setup>
const emit = defineEmits(["reset"]);

function resetForm() {
  emit("reset");
}
</script>

<!--
<style scoped>
.home {
  text-align: center;
  padding: 20px;
}

button {
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

button:hover {
  background-color: #ff8c00;
  transform: scale(1.02);
}
</style>
-->
