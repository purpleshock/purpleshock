<template>
  <div class="centered-layout">
    <slot></slot>
  </div>
</template>

<style scoped>
.centered-layout {
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;
}
</style>
