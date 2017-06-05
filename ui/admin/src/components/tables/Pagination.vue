<template>
  <ul class="pagination" v-if="show">
    <li class="pagination-item">
      <router-link :to="getPageLocation(1)">
        <md-icon>first_page</md-icon>
      </router-link>
    </li>
    <li class="pagination-item">
      <router-link :to="getPageLocation(pages[0])">
        <md-icon>chevron_left</md-icon>
      </router-link>
    </li>
    <li v-for="page in pages" :key="page" class="pagination-item">
      <router-link :to="getPageLocation(page)">{{page}}</router-link>
    </li>
    <li class="pagination-item">
      <router-link :to="getPageLocation(pages[numOffset - 1])">
        <md-icon>chevron_right</md-icon>
      </router-link>
    </li>
    <li class="pagination-item">
      <router-link :to="getPageLocation(totalPages)">
        <md-icon>last_page</md-icon>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    totalPages: {
      type: Number,
      required: true
    },
    numOffset: {
      type: Number,
      default: 10
    }
  },
  computed: {
    show () {
      return this.$route.query.page > 0
    },
    isFirstDisable () {
      return this.$route.query.page === 1
    },
    isLastDisable () {
      return this.$route.query.page === this.totalPages
    },
    pages () {
      const halfPagination = Math.floor(this.numOffset / 2) - 1
      let min = this.$route.query.page - halfPagination
      min = Math.max(min, 1)
      let max = min + this.numOffset - 1
      if (max > this.totalPages) {
        max = this.totalPages
        min = Math.max(max - this.numOffset + 1, 1)
      }

      const pages = []
      for (let i = min; i <= max; i++) {
        pages.push(i)
      }

      return pages
    }
  },
  methods: {
    getPageLocation (linkPage) {
      const { path, query } = this.$route
      return {
        path,
        query: {
          ...query,
          page: linkPage
        }
      }
    }
  }
}
</script>

<style scoped>
.pagination {
  align-items: center;
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  padding: 0;
}

.pagination-item {
  margin: 0;
}
</style>
