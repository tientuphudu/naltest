<template>
  <div class="app app--background">
    <div class="container-fluid navbar-top--background navbar-top--border-bottom">
      <navbar :has-search="false" class="container" />
    </div>
    <div class="container content--background">
      <div>
        <h1 v-if="blog">
          Detail Blog
        </h1>
        <h1 v-else>
          Not found
        </h1>
      </div>
      <div v-if="blog">
        <div class="header-content width_common">
          <span class="date">{{ blog.createdAt | formatDate }}</span>
        </div>
        <h1 class="title-detail">
          {{ blog.title }}
        </h1>
        <p class="description">
          {{ blog.content | capitalizeFirstLetter }}
        </p>
        <img :src="blog.image">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis saepe
          nihil eligendi est officiis dolore iste similique doloribus dolorem.
          Error eos laudantium eius provident, quasi consequuntur architecto
          voluptatibus veniam recusandae odit facilis asperiores nulla molestias
          necessitatibus dolore omnis quis repudiandae, minus eveniet inventore.
          Cupiditate omnis eaque libero quibusdam laboriosam, aperiam itaque
          deleniti inventore harum iusto tempora doloremque veritatis corporis
          similique animi asperiores! Nesciunt quam accusantium reprehenderit
          sapiente consequatur voluptate dicta! Quam possimus distinctio sed
          esse excepturi, explicabo totam tenetur nesciunt eum ipsa ab odit
          similique magnam voluptatum eaque tempore nobis dolores ullam eos
          veritatis! Dicta assumenda aliquid incidunt, hic quo et iure sed
          necessitatibus. Impedit ea ad eligendi provident fugiat quasi hic
          error eaque, esse dolorem sunt a aspernatur officiis incidunt sequi,
          ex tempore cumque at perspiciatis? Qui quis doloribus odio quam.
          Repellat mollitia consequuntur possimus, est nobis dolore blanditiis
          corrupti consequatur earum voluptas, saepe fuga ratione molestiae
          quidem ex, dolorem hic debitis nemo sit accusamus nulla sequi
          doloribus necessitatibus. Nobis, obcaecati excepturi doloribus ea
          natus veniam dolorum distinctio accusantium ipsa, laboriosam quasi
          ipsum consequuntur debitis neque maiores facilis alias libero aliquid
          totam minima eos rerum? Omnis minus, aspernatur repellendus sapiente
          ea qui rem vero deleniti blanditiis nam consequatur? Suscipit quod,
          minus, quibusdam sequi atque fugiat eaque porro dolores nobis quia
          nulla ea quis debitis eius dolorum ut recusandae iusto sunt est
          incidunt error, saepe qui! Iusto culpa eaque magnam natus sequi
          asperiores est, adipisci id fugiat, quo ad quisquam consequatur quas
          dolore sit, vitae minima delectus eos atque illo beatae eum eius.
          Impedit, iusto inventore quas corporis, odit labore error suscipit cum
          pariatur exercitationem voluptatem a aspernatur, adipisci doloribus
          minima sequi accusamus praesentium! Possimus mollitia debitis,
          reiciendis dolorem quaerat rerum eius nam at iste accusamus officiis
          itaque amet dignissimos corrupti recusandae vel? Molestiae officiis
          dolorem excepturi nemo voluptatem impedit dolor tempora temporibus
          eius provident soluta non fugit deserunt, doloremque quidem illum
          saepe amet cumque, autem ullam reiciendis quaerat sequi! Perferendis
          dolor excepturi suscipit rem exercitationem! Laborum optio quidem
          tempore neque nulla sunt obcaecati, dolores expedita eius ex, ab
          placeat ipsum porro odit. Porro commodi tempore quis illo iste
          molestiae temporibus sed expedita, iure accusamus quia ipsum, iusto
          reprehenderit voluptate labore! Optio blanditiis aperiam mollitia,
          illum eaque vel aliquid officiis eum fuga quae, doloremque aut est,
          rem similique culpa molestiae ex nemo quo enim.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Navbar from '@/components/common/navbar.vue'

export default Vue.extend({
  components: {
    Navbar
  },
  async asyncData (context) {
    return await context.$axios.get(`/blogs/${context.params.id}`).then((reponse) => {
      return {
        blog: reponse.data
      }
    }).catch(() => {
      return {
        blog: null
      }
    })
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
  .content--background {
    background-color: #fff;
  }
}
</style>
