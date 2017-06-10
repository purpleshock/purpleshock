<template>
  <md-dialog
    ref="dialog"
    :md-click-outside-to-close="!isSubmit"
    :md-esc-to-close="!isSubmit"
    @close="onClose">
    <md-dialog-title>Create batch of vouchers</md-dialog-title>
    <form novalidate @submit.stop.prevent="onSubmit">
      <md-dialog-content>
        <md-input-container>
          <label>Number of vouchers</label>
          <md-input type="number" v-model="formData.num"></md-input>
        </md-input-container>
        <md-input-container>
          <label>Voucher amount</label>
          <md-input type="number" v-model="formData.amount"></md-input>
        </md-input-container>
        <md-input-container>
          <label>Description</label>
          <md-textarea v-model="formData.description"></md-textarea>
        </md-input-container>
        <div>
          <date-range-picker @change="onChangeValidDates"></date-range-picker>
        </div>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button :disabled="isSubmit" @click.native="close()">cancel</md-button>
        <md-button type="submit" class="md-primary">create</md-button>
      </md-dialog-actions>
    </form>
  </md-dialog>
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
    open () {
      this.$refs.dialog.open()
    },
    close () {
      this.$refs.dialog.close()
    },
    onClose () {
      Object.assign(this.$data, this.$options.data())
    },
    onSubmit () {
      this.isSubmit = true
      this.$emit('create', this.formData)
    }
  }
}
</script>
