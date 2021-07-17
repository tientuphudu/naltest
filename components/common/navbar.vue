<template>
  <b-navbar toggleable="lg" type="light" variant="light" :sticky="true">
    <b-navbar-brand href="/">
      Home
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse" />
    <b-navbar-nav>
      <b-nav-item href="#">
        Java
      </b-nav-item>
      <b-nav-item href="#">
        C#
      </b-nav-item>
      <b-nav-item href="#">
        PHP
      </b-nav-item>
    </b-navbar-nav>
    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav v-if="hasSearch" class="ml-auto">
        <b-nav-form>
          <b-form-input v-model="keyword" size="sm" class="mr-sm-2" placeholder="Search" />
          <b-button size="sm" class="my-2 my-sm-0" type="submit" @click.prevent="search()">
            Search
          </b-button>
        </b-nav-form>

        <b-nav-item-dropdown text="Sort" right>
          <b-dropdown-item v-for="sortType in sortTypes" :key="sortType.sortName" :class="currentSort.sortName === sortType.sortName ? 'sort-active' : ''" @click.prevent="sort(sortType)">
            {{ sortType.sortName }}
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts">
/* eslint-disable no-console */
import Vue from 'vue'
import SortType from '@/models/SortType'
import { SortE } from '@/models/SortE'
export default Vue.extend({
  props: {
    hasSearch: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data () {
    return {
      keyword: '' as string,
      sortTypes: [
        {
          sortName: 'None',
          sortBy: SortE.ID,
          order: 'asc'
        },
        {
          sortName: 'Title Asc',
          sortBy: SortE.TITLE,
          order: 'asc'
        },
        {
          sortName: 'Title Desc',
          sortBy: SortE.TITLE,
          order: 'desc'
        },
        {
          sortName: 'Latest',
          sortBy: SortE.CREATED_AT,
          order: 'desc'
        },
        {
          sortName: 'Oldest',
          sortBy: SortE.CREATED_AT,
          order: 'asc'
        }
      ] as SortType[]
    }
  },
  computed: {
    currentSort () {
      return this.$store.getters.sortType
    }
  },
  methods: {
    search () {
      this.$store.dispatch('search', this.keyword)
    },
    sort (sortType: SortType) {
      this.$store.dispatch('sort', sortType)
    }
  }
})
</script>

<style lang="scss" scoped>
  .sort-active {
    background-color: #007bff;
  }
</style>
