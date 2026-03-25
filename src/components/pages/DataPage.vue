<template>
  <div class="form-container">
    <p class="step-indicator">Etapa <strong>2</strong> de 4</p>
    <h2 class="form-title">{{ formData.tipoCadastro === 'PF' ? 'Pessoa Física' : formData.tipoCadastro === 'PJ' ? 'Pessoa Jurídica' : 'Tipo de Cadastro' }}</h2>

    <form @submit.prevent="$emit('next')" class="form">
      <div v-if="formData.tipoCadastro === 'PF'">
        <FormInput
          id="nome"
          label="Nome:"
          v-model="formData.nome"
          placeholder="João da Silva"
          required
          :error="errors.nome"
        />

        <FormInput
          id="cpf"
          label="CPF:"
          v-model="formData.cpf"
          placeholder="12345678912"
          inputmode="numeric"
          :error="errors.cpf"
        />

        <FormInput
          id="dataNascimento"
          label="Data de Nascimento:"
          v-model="formData.dataNascimento"
          type="date"
          required
        />

        <FormInput
          id="telefone"
          label="Telefone:"
          v-model="formData.telefone"
          placeholder="(11) 91234-5678"
          inputmode="numeric"
          :error="errors.telefone"
        />
      </div>

      <div v-else-if="formData.tipoCadastro === 'PJ'">
        <FormInput
          id="razaoSocial"
          label="Razão Social:"
          v-model="formData.razaoSocial"
          placeholder="Mercado Bitcoin"
          required
          :error="errors.razaoSocial"
        />

        <FormInput
          id="cnpj"
          label="CNPJ:"
          v-model="formData.cnpj"
          placeholder="10123456000178"
          inputmode="numeric"
          @input="filterNumericInput('cnpj', 14)"
          :error="errors.cnpj"
        />

        <FormInput
          id="dataAbertura"
          label="Data de Abertura:"
          v-model="formData.dataAbertura"
          type="date"
          required
        />

        <FormInput
          id="telefone"
          label="Telefone:"
          v-model="formData.telefone"
          placeholder="(11) 91234-5678"
          inputmode="numeric"
          :error="errors.telefone"
        />
      </div>

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
