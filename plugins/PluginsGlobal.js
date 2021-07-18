import Vue from 'vue'

Vue.filter('formatDate', (value) => {
  const date = new Date(value)
  const mm = date.getMonth() + 1 // getMonth() is zero-based
  const dd = date.getDate()

  return [date.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
  ].join('/')
})

Vue.filter('capitalizeFirstLetter', (value) => {
  return value.charAt(0).toUpperCase() + value.slice(1)
})
