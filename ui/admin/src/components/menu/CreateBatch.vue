<template>
  <modal name="create-batch" @closed="onClosed">
    <form novalidate @submit.stop.prevent="onSubmit">
      <label class="form-label">
        <span>Number of vouchers</span>
        <input type="number" v-model="formData.num"></input>
      </label>
      <label class="form-label">
        <span>Voucher amount</span>
        <input type="number" v-model="formData.amount"></input>
      </label>
      <label class="form-label">
        <span>Description</span>
        <textarea v-model="formData.description"></textarea>
      </label>
      <div>
        <date-range-picker @change="onChangeValidDates"></date-range-picker>
        <button type="button" :disabled="isSubmit" @click="$modal.hide('create-batch')">cancel</button>
        <button type="submit">create</button>
      </div>
    </form>
  </modal>
</template>

<script>
import { DateRangePicker } from '@/components/forms'

export default {
  components: {
    DateRangePicker
  },
  data () {
    return {
      isSubmit: false,
      formData: {
        num: '',
        amount: '',
        description: '',
        validAt: '',
        expiredAt: ''
      }
    }
  },
  methods: {
    onChangeValidDates (start, end) {
      this.formData.validAt = start
      this.formData.expiredAt = end
    },
    onClosed () {
      Object.assign(this.$data, this.$options.data())
    },
    onSubmit () {
      this.isSubmit = true
      this.$emit('create', this.formData)
    }
  }
}
</script>

<style scoped>
.form-label {
  display: block;
}
</style>
