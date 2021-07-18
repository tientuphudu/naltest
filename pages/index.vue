<template>
  <div class="app app--background">
    <div class="container-fluid navbar-top--background navbar-top--border-bottom">
      <navbar :has-search="true" class="container" />
    </div>
    <div class="container content content--background">
      <div>
        <h1 v-if="blogs.length > 0">
          List Blog
        </h1>
        <h1 v-else>
          No data
        </h1>
      </div>
      <ul class="list-unstyled">
        <div v-for="blog in blogs" :key="blog.id" class="media border mb-3 position-relative">
          <nuxt-link :to="blog.id">
            <img :src="blog.image" class="media-img mr-3">
          </nuxt-link>
          <div class="media-body">
            <div>
              <nuxt-link :to="blog.id">
                <h5 class="mt-0 mb-1">
                  {{ blog.title }}
                </h5>
              </nuxt-link>
              {{ blog.content | capitalizeFirstLetter }}
            </div>
            <div class="position-absolute media-body__create-at--bottom">
              <span>Created at: {{ blog.createdAt | formatDate }}</span>
            </div>
          </div>
        </div>
      </ul>
      <div class="d-flex justify-content-center">
        <pagination />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Blog from '@/models/Blog'
import Navbar from '@/components/common/navbar.vue'
import Pagination from '@/components/common/pagination.vue'

export default Vue.extend({
  components: {
    Pagination,
    Navbar
  },
  data () {
    return {
      currentPage: 1 as number
    }
  },
  computed: {
    blogs (): Blog[] {
      return this.$store.getters.blogs
    },
    rows (): number {
      return this.$store.getters.total
    },
    perPage (): number {
      return this.$store.getters.limit
    }
  },
  watch: {
    currentPage (val) {
      return this.$store.dispatch('changePage', val)
    }
  }
})
</script>

<style lang="scss" scoped>
.app{
  &--background{
    background-color:antiquewhite;
  }
  .navbar-top--background {
    background-color: #f8f9fa;
  }
  .navbar-top--border {
    border-bottom: solid 0.5px #ccc;
  }
  .content {
    &--background{
      background-color:#fff;
    }
    .media {
      .media-img{
        width: 150px;
      }
      .media-body{
        &__create-at--bottom{
          bottom: 0;
        }
      }
    }
  }
}
</style>
