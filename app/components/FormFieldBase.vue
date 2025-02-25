<script lang="ts" setup>
defineProps<{
  name: string
  label: string
}>()
</script>

<template>
  <UiFormField
    v-slot="{ componentField }"
    :validate-on-model-update="false"
    :validate-on-input="false"
    :name
  >
    <UiFormItem>
      <UiFormLabel>{{ label }}</UiFormLabel>

      <UiFormControl>
        <slot :component-field />
      </UiFormControl>

      <UiFormDescription />
      <UiFormMessage />
    </UiFormItem>
  </UiFormField>
</template>
