<template>
  <div class="date-range-picker">
    <label class="label">from</label>
    <date-picker :date="start" :option="startOption" @change="onChangeStart"></date-picker>
    <label class="label">to</label>
    <date-picker :date="end" :option="endOption" @change="onChangeEnd"></date-picker>
    <button type="reset" @click="onClear">clear</button>
  </div>
</template>

<script>
import moment from 'moment'
import DatePicker from 'vue-datepicker/vue-datepicker-es6'

const defaultOption = {
  type: 'day',
  week: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  format: 'YYYY-MM-DD'
}

export default {
  components: {
    DatePicker
  },
  props: {
    startPlaceholder: String,
    endPlaceholder: String
  },
  computed: {
    start () {
      return {
        time: this.startTime && this.startTime.format(defaultOption.format)
      }
    },
    end () {
      return {
        time: this.endTime && this.endTime.format(defaultOption.format)
      }
    }
  },
  data () {
    return {
      startTime: '',
      endTime: '',
      startOption: {
        ...defaultOption,
        placeholder: this.startPlaceholder
      },
      endOption: {
        ...defaultOption,
        placeholder: this.endPlaceholder
      }
    }
  },
  methods: {
    onChangeStart (newStartTime) {
      newStartTime = moment(newStartTime)
      if (this.endTime && newStartTime.isAfter(this.endTime)) {
        this.endTime = newStartTime.clone()
      }
      this.startTime = newStartTime
      this.$emit('change', this.startTime, this.endTime)
    },
    onChangeEnd (newEndTime) {
      newEndTime = moment(newEndTime)
      if (this.startTime && this.startTime.isAfter(newEndTime)) {
        this.startTime = newEndTime.clone()
      }
      this.endTime = newEndTime
      this.$emit('change', this.startTime, this.endTime)
    },
    onClear () {
      this.startTime = ''
      this.endTime = ''
      this.$emit('change', this.startTime, this.endTime)
    }
  }
}
</script>

<style scoped>
.date-range-picker {
  display: flex;
}

.label {
  text-transform: uppercase;
}

.picker {
  align-items: center;
  display: flex;
}
</style>
