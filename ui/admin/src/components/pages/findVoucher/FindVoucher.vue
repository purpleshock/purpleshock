<template>
  <div class="find-voucher">
    <code-suggest-form @suggest="onFindCode"></code-suggest-form>
    <voucher-list :codes="codes"></voucher-list>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { GET_VOUCHER_SUGGEST } from '@/store/modules/vouchers'
import { CodeSuggestForm } from '@/components/forms'
import VoucherList from './VoucherList'

export default {
  components: {
    CodeSuggestForm,
    VoucherList
  },
  computed: {
    ...mapState({
      size: state => state.vouchers.pageOffset,
      codes: state => state.vouchers.list,
      totalPages: state => state.vouchers.totalPages
    })
  },
  methods: {
    ...mapActions({
      getVoucherSuggest: GET_VOUCHER_SUGGEST
    }),
    onFindCode (formData) {
      this.getVoucherSuggest({
        term: formData.term,
        size: 5
      })
    }
  }
}
</script>
