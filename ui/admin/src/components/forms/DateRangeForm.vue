<template>
  <form class="date-range-finder" novalidate @submit.stop.prevent="$emit('find', $data)">
    <date-range-picker @change="onChangeValidPeriod"></date-range-picker>
    <md-button type="submit" class="md-primary">find</md-button>
  </form>
</template>

<script>
import DateRangePicker from '@/components/forms/DateRangePicker'

export default {
  components: {
    DateRangePicker
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
.date-range-finder {
  display: flex;
}
</style>
