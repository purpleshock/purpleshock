<template>
  <md-card class="batch-info">
    <md-card-header>
      <h2 class="md-title batch-code">{{batch.code}}</h2>
    </md-card-header>
    <md-card-content>
      <md-list>
        <md-list-item v-if="batch.createdAt">
          <div class="md-list-text-container">
            <span class="item-title">creation time</span>
            <span>{{batch.createdAt.format('YYYY-MM-DD')}}</span>
          </div>
        </md-list-item>
        <md-list-item v-if="batch.validAt">
          <div class="md-list-text-container">
            <span class="item-title">valid time</span>
            <span>{{batch.validAt.format('YYYY-MM-DD')}}</span>
          </div>
        </md-list-item>
        <md-list-item v-if="batch.expiredAt">
          <div class="md-list-text-container">
            <span class="item-title">expired time</span>
            <span>{{batch.expiredAt.format('YYYY-MM-DD')}}</span>
          </div>
        </md-list-item>
      </md-list>
    </md-card-content>
  </md-card>
</template>

<script>
export default {
  props: {
    batch: Object
  }
}
</script>

<style scoped>
.batch-code {
  text-transform: uppercase;
}

.item-title::first-letter {
  text-transform: uppercase;
}
</style>
