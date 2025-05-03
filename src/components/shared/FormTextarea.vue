<template>
    <div>
      <label :for="id" class="block text-sm font-bold text-gray-700 mb-1">{{ label }}</label>
      <textarea
        :id="id"
        :placeholder="placeholder"
        :required="required"
        :rows="rows"
        class="w-full border rounded-lg p-2"
        :value="modelValue"
        @input="updateValue"
      ></textarea>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  // Props
  const props = defineProps({
    modelValue: { type: String, required: true },
    id: { type: String, required: true },
    label: { type: String, required: true },
    placeholder: { type: String, default: '' },
    required: { type: Boolean, default: false },
    rows: { type: Number, default: 4 },
  });
  
  // Emit function
  const emit = defineEmits(['update:modelValue']);
  
  // Update the modelValue when the textarea input changes
  function updateValue(event) {
    emit('update:modelValue', event.target.value);
  }
  </script>
  
  <style scoped>
  </style>
  