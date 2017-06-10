<template>
  <md-table-card>
    <form class="query-form" novalidate @submit.stop.prevent="$emit('find', $data)">
      <date-range-picker @change="onChangeValidPeriod"></date-range-picker>
      <md-button type="submit" class="md-primary">find</md-button>
    </form>
    <md-table
      v-if="showHistory"
      md-sort="dessert"
      md-sort-type="desc">
      <md-table-header>
        <md-table-row>
          <md-table-head class="table-head">code</md-table-head>
          <md-table-head class="table-head">creation time</md-table-head>
          <md-table-head class="table-head">validated time</md-table-head>
          <md-table-head class="table-head">expired time</md-table-head>
          <md-table-head class="table-head">description</md-table-head>
        </md-table-row>
      </md-table-header>
      <md-table-body>
        <md-table-row
          v-for="(batch, batchIndex) in batches"
          :key="batchIndex"
          :md-item="batch">
          <md-table-cell class="code">
            <router-link :to="getVouchersLink(batch.code)">{{batch.code}}</router-link>
          </md-table-cell>
          <md-table-cell>{{formatTime(batch.createdAt)}}</md-table-cell>
          <md-table-cell>{{formatTime(batch.validAt)}}</md-table-cell>
          <md-table-cell>{{formatTime(batch.expiredAt)}}</md-table-cell>
          <md-table-cell>{{batch.description || '-'}}</md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>
    <pagination v-if="showPagination" :page="page" :totalPages="totalPages"></pagination>
  </md-table-card>
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
        path: '/batches/' + code,
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
