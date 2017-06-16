<template>
  <div class="find-voucher">
    <code-suggest-form @suggest="onFindCode"></code-suggest-form>
    <voucher-list :codes="codes"></voucher-list>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { GET_VOUCHER_SUGGEST } from '@/store/modules/vouchers'
import { CodeSuggestForm } from '@/components/forms'
import VoucherList from './VoucherList'

export default {
  components: {
    CodeSuggestForm,
    VoucherList
  },
  data () {
    return {
      codes: []
    }
  },
  methods: {
    ...mapActions({
      getVoucherSuggest: GET_VOUCHER_SUGGEST
    }),
    async onFindCode (formData) {
      const vouchers = await this.getVoucherSuggest({
        term: formData.term,
        size: 10
      })
      this.codes = vouchers.map(voucher => voucher.code)
    }
  }
}
</script>
