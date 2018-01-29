<template>
  <div>
    <label :for="label">{{label}}</label> 
    <input :value="value" disabled="true" />
  </div>

</template>

<script>
export default {
  props: ['label', 'value']
}
</script>
