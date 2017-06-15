<template>
  <div class="batch-list">
    <ul>
      <li v-for="(batch, index) in batches" class="batch" :key="index">
        <div>
          <span class="batch-code">{{batch.code}}</span>
          <button type="button" @click="$emit('load-voucher', batch)">more</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    batches: Array
  }
}
</script>
