<template>
  <div class="batch-list">
    <ul>
      <li v-for="(batch, batchCode) in batches" class="batch" :key="batchCode">
        <span class="batch-code">{{batchCode}}</span>
        <button
          type="button"
          v-show="showMore(batch)"
          @click="onClickMore(batchCode, batch)">more</button>
        <ul v-if="batch.vouchers.length > 0">
          <li v-for="voucherCode in batch.vouchers" :key="voucherCode">
            <router-link :to="/voucher/ + voucherCode">{{voucherCode}}</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    batches: Object
  },
  methods: {
    showMore (batch) {
      return batch.page === 0 || batch.page < batch.totalPages
    },
    onClickMore (batchCode, batch) {
      this.$emit('load-voucher', {
        ...batch,
        code: batchCode
      })
    }
  }
}
</script>
