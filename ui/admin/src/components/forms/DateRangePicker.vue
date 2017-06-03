<template>
  <div class="date-range-picker">
    <div class="picker">
      <md-subheader class="label">from</md-subheader>
      <date-picker :date="start" :option="startOption" @change="onChangeStart" @cancel=""></date-picker>
      <md-button class="md-icon-button md-dense" @click.native="onClear('startTime')">
        <md-icon>clear</md-icon>
      </md-button>
    </div>
    <div class="picker">
      <md-subheader class="label">to</md-subheader>
      <date-picker :date="end" :option="endOption" @change="onChangeEnd"></date-picker>
      <md-button class="md-icon-button md-dense" @click.native="onClear('endTime')">
        <md-icon>clear</md-icon>
      </md-button>
    </div>
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
    },
    onChangeEnd (newEndTime) {
      newEndTime = moment(newEndTime)
      if (this.startTime && this.startTime.isAfter(newEndTime)) {
        this.startTime = newEndTime.clone()
      }
      this.endTime = newEndTime
    },
    onClear (target) {
      this[target] = ''
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
