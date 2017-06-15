<template>
  <form class="query-form" novalidate @submit.stop.prevent="$emit('find', $data)">
    <date-range-picker @change="onChangeValidPeriod"></date-range-picker>
    <button type="submit">find</button>
  </form>
</template>

<script>
import DateRangePicker from '@/components/forms/DateRangePicker'
import { Pagination } from '@/components/tables'

export default {
  components: {
    DateRangePicker,
    Pagination
  },
  props: {
    batches: Array,
    totalPages: Number
  },
  data () {
    return {
      validAt: '',
      expiredAt: ''
    }
  },
  computed: {
    page () {
      return parseInt(this.$route.query.page)
    },
    showHistory () {
      return (
        this.batches && this.batches.length > 0 &&
        this.totalPages > 0 &&
        this.$route.query.page > 0
      )
    },
    showPagination () {
      return (
        this.showHistory &&
        this.totalPages > 1
      )
    }
  },
  methods: {
    onChangeValidPeriod (start, end) {
      this.validAt = start
      this.expiredAt = end
    },
    formatTime (time) {
      return time ? time.format('MM/DD/YYYY') : '-'
    },
    getVouchersLink (code) {
      return {
        path: '/batch/' + code,
        query: {
          page: 1
        }
      }
    }
  }
}
</script>

<style scoped>
.query-form {
  display: flex;
}

.table-head {
  text-transform: uppercase;
}
</style>
