<template>
  <div id="app">
    <SuccessPage v-if="isSuccess" @reset="resetFlow" />

    <div v-else>
      <component
        :is="steps[currentStep]"
        :formData="formData"
        :errors="errors"
        @next="nextStep"
        @back="prevStep"
        @confirm="submitForm"
      />
    </div>
  </div>
</template>

<script setup>
import { useRegisterFlow } from "./register";
import WelcomePage from "./components/pages/WelcomePage.vue";
import DataPage from "./components/pages/DataPage.vue";
import PasswordPage from "./components/pages/PasswordPage.vue";
import ReviewPage from "./components/pages/ReviewPage.vue";
import SuccessPage from "./components/pages/SuccessPage.vue";

const steps = [WelcomePage, DataPage, PasswordPage, ReviewPage];

const {
  currentStep,
  isSuccess,
  formData,
  errors,
  nextStep,
  prevStep,
  submitForm,
  resetFlow,
} = useRegisterFlow();
</script>

