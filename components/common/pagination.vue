<template>
  <nav v-if="totalPage!==0" class="center">
    <ul class="pagination">
      <li
        class="page-item"
        :class="page === 1 ? 'disabled' : ''"
        @click.prevent="changePage(page - 1)"
      >
        <button class="page-link">
          Previous
        </button>
      </li>
      <li
        v-for="(num, index) in pageDisplay"
        :key="index"
        class="page-item"
        :class="num == page ? 'active' : ''"
        @click.prevent="changePage(num)"
      >
        <button class="page-link">
          {{ num }}
        </button>
      </li>
      <li
        class="page-item"
        :class="page === totalPage ? 'disabled' : ''"
        @click.prevent="changePage(page + 1)"
      >
        <button class="page-link">
          Next
        </button>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    page (): number {
      return this.$store.getters.page
    },
    totalPage (): number {
      return this.$store.getters.totalPage
    },
    pageDisplay (): number[] {
      const page = this.$store.getters.page
      const totalPage = this.$store.getters.totalPage
      const pageDisplay = []
      if (page - 2 > 0 && page + 2 <= totalPage) {
        let i = page - 2
        const j = page + 2
        for (i; i <= j; i++) {
          pageDisplay.push(i)
        }
      } else if (page - 2 <= 0 && page + 2 > totalPage) {
        for (let i = 1; i <= totalPage; i++) {
          pageDisplay.push(i)
        }
      } else if (page - 2 <= 0 && page + 2 <= totalPage) {
        const max = totalPage < 5 ? totalPage : 5
        for (let i = 1; i <= max; i++) {
          pageDisplay.push(i)
        }
      } else {
        const min = totalPage - 4 > 1 ? totalPage - 4 : 1
        for (let i = min; i <= totalPage; i++) {
          pageDisplay.push(i)
        }
      }
      return pageDisplay
    }
  },
  methods: {
    changePage (page: number) {
      this.$store.dispatch('changePage', page)
    }
  }
})
</script>

<style lang='scss' scoped>
  .disabled {
    pointer-events: none;
  }
</style>
