
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
            {title: "AtCoder", category: 'Study', image: "../images/AtCoderThumb.png", url:"https://atcoder.jp/users/Iorn"},
            {title: "Movie", category: 'Art', image: "../images/MovieThumb.png", url:"https://www.youtube.com/channel/UCjQq82FU2vNtW_bF6T011bA"},
            {title: "Novel", category: 'Art', image: "../images/NovelThumb.png", url:"https://note.com/doshow_novel/m/m7bb8325986f0"},
            {title: "VTuber", category: 'Study', image: "../images/ColorSchemeThumb.png", url:"http://icc-heroku.herokuapp.com/"},
            {title: "Photo", category: 'Art', image: "../images/PhotoThumb.png", url:"https://www.instagram.com/doshow_art/"}
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
