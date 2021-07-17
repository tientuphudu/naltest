import { GetterTree, ActionTree, MutationTree } from 'vuex'
import Blog from '@/models/Blog'
import SortType from '@/models/SortType'
import { SortE } from '@/models/SortE'

export const state = () => ({
  blogs: [] as Blog[],
  limit: 8 as number,
  page: 1 as number,
  totalPage: 0 as number,
  search: '' as string,
  sortType: {
    sortName: 'None',
    sortBy: SortE.ID,
    order: 'asc'
  } as SortType,
  sortBy: SortE.ID as string,
  order: 'asc' as string
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  blogs: state => state.blogs,
  limit: state => state.limit,
  page: state => state.page,
  totalPage: state => state.totalPage,
  search: state => state.search,
  sortType: state => state.sortType
}

export const mutations: MutationTree<RootState> = {
  setBlogs: (state, blogs: Blog[]) => (state.blogs = blogs),
  setPage: (state, page: number) => (state.page = page),
  setLimit: (state, limit: number) => (state.limit = limit),
  setTotalPage: (state, totalPage: number) => (state.totalPage = totalPage),
  setSearch: (state, search: string) => (state.search = search),
  setSortType: (state, sortType: SortType) => (state.sortType = sortType)
}

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit (vuexContext) {
    await vuexContext.dispatch('loadData')
  },
  setTotalPage (vuexContext) {
    return this.$axios.$get(`blogs?search=${vuexContext.state.search}`).then((data) => {
      const totalItem : number = data.length
      if (totalItem % vuexContext.state.limit === 0) {
        vuexContext.commit('setTotalPage', totalItem / vuexContext.state.limit)
      } else {
        vuexContext.commit('setTotalPage', Math.floor(totalItem / vuexContext.state.limit) + 1)
      }
    })
  },
  async loadData (vuexContext) {
    await vuexContext.dispatch('setTotalPage')
    return this.$axios.$get(`blogs?p=${vuexContext.state.page}` +
      `&l=${vuexContext.state.limit}` +
      `&search=${vuexContext.state.search}` +
      `&sortBy=${vuexContext.state.sortType.sortBy}` +
      `&order=${vuexContext.state.sortType.order}`).then((data) => {
      vuexContext.commit('setBlogs', data)
    })
  },
  changePage (vuexContext, page: number) {
    vuexContext.commit('setPage', page)
    vuexContext.dispatch('loadData')
  },
  search (vuexContext, keyword: string) {
    vuexContext.commit('setSearch', keyword)
    vuexContext.dispatch('loadData')
  },
  sort (vuexContext, sort: SortType) {
    vuexContext.commit('setSortType', sort)
    vuexContext.dispatch('loadData')
  }
}
