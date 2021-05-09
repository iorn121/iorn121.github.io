
new Vue({
    el: '#app',
    data: function() {
        return {
        currentFilter: 'ALL',
        projects: [
            /*
                category
                    Enjoy
                    Study
                    Create
                    Others
            */
            {title: "Novel", category: 'Enjoy', image: "../images/NovelThumb.png", url:"https://note.com/doshow_novel/m/m7bb8325986f0"},
            {title: "Movie", category: 'Enjoy', image: "../images/MovieThumb.png", url:"https://www.youtube.com/channel/UCjQq82FU2vNtW_bF6T011bA"},
            {title: "Animation", category: 'Enjoy', image: "../images/NovelThumb.png", url:"https://note.com/doshow_novel/m/m7bb8325986f0"},
            {title: "Comic", category: 'Enjoy', image: "../images/MovieThumb.png", url:"https://www.youtube.com/channel/UCjQq82FU2vNtW_bF6T011bA"},
            {title: "AtCoder", category: 'Study', image: "../images/AtCoderThumb.png", url:"https://atcoder.jp/users/Iorn"},
            {title: "Books", category: 'Study', image: "../images/AtCoderThumb.png", url:"https://atcoder.jp/users/Iorn"},
            {title: "Folklore", category: 'Study', image: "../images/AtCoderThumb.png", url:"https://atcoder.jp/users/Iorn"},
            {title: "Writing", category: 'Create', image: "../images/NovelThumb.png", url:"https://note.com/doshow_novel/m/m7bb8325986f0"},
            {title: "Application", category: 'Create', image: "../images/ColorSchemeThumb.png", url:"http://icc-heroku.herokuapp.com/"},
            {title: "VR", category: 'Create', image: "../images/VRThumb.png", url:"https://iorn121.github.io/vr"},
            {title: "Music", category: 'Create', image: "../images/ColorSchemeThumb.png", url:"http://icc-heroku.herokuapp.com/"},
            {title: "Photo", category: 'Create', image: "../images/PhotoThumb.png", url:"https://www.instagram.com/doshow_art/"},
            {title: "3DCG", category: 'Create', image: "../images/PhotoThumb.png", url:"https://www.instagram.com/doshow_art/"},
            {title: "Biography", category: 'Others', image: "../images/BiographyThumb.png", url:"https://www.instagram.com/doshow_art/"},
            {title: "SightSeeing", category: 'Others', image: "../images/BiographyThumb.png", url:"https://www.instagram.com/doshow_art/"}
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
