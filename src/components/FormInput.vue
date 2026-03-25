<template>
  <div class="input-group">
    <label v-if="label" :for="id" class="form-label">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :inputmode="inputmode"
      :required="required"
      class="input"
      @input="onInput"
    />
    <p class="error" v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  id: { type: String, default: "" },
  label: { type: String, default: "" },
  modelValue: { type: [String, Number], default: "" },
  type: { type: String, default: "text" },
  placeholder: { type: String, default: "" },
  inputmode: { type: String, default: "" },
  required: { type: Boolean, default: false },
  error: { type: String, default: "" },
});

const emit = defineEmits(["update:modelValue", "input"]);

function onInput(event) {
  emit("update:modelValue", event.target.value);
  emit("input", event);
}
</script>
