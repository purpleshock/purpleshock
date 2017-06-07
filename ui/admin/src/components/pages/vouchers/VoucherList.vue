<template>
  <form class="query-form" novalidate @submit.stop.prevent="$emit('find', $data)">
    <date-range-picker @change="onChangeValidPeriod"></date-range-picker>
    <md-button type="submit" class="md-primary">find</md-button>
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
  data () {
    return {
      validAt: '',
      expiredAt: ''
    }
  },
  methods: {
    onChangeValidPeriod (start, end) {
      this.validAt = start
      this.expiredAt = end
    }
  }
}
</script>

<style scoped>
.query-form {
  display: flex;
}
</style>
