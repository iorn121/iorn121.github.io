
new Vue({
  el: '#app',
  data: function() {
      return {
      currentFilter: 'ALL',
      projects: [
          {title: "GasshoZukuri", category: "History", image: "./images/RelaxingGasshoZukuri_Moment1.jpg", url:"https://youtu.be/po9eoQBwmWc"}
      ],
      shuffle_photo: []
      }
  },
  created: function() {
      this.shuffle_photo = this.shuffle(this.projects)
  },
  methods: {
      setFilter: function(filter) {
          this.currentFilter = filter;
      },
      shuffle: function(array) {
          for (let i = array.length - 1; i > 0; i--) {
              let r = Math.floor(Math.random() * (i + 1))
              let tmp = array[i]
              array[i] = array[r]
              array[r] = tmp
          }
          return array
      }
  }
})
