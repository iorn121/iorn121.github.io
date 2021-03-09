
new Vue({
    el: '#app',
    data: function() {
        return {
        currentFilter: 'ALL',
        projects: [
            /*
                category
                    Art
                    Study
                    Interest
                    Others
            */
            {title: "AtCoder", category: 'Study', image: "../images/AtCoderThumb.png"},
            {title: "Movie", category: 'Art', image: "../images/MovieThumb.png"},
            {title: "Novel", category: 'Art', image: "../images/NovelThumb.png"},
            {title: "VTuber", category: 'Interest', image: "../images/VTuberThumb.png"},
            {title: "Photo", category: 'Art', image: "../images/PhotoThumb.png"}
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
