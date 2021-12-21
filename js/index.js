
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
            {title: "AtCoder", category: 'Study', image: "../images/thumb_atcoder.png", url:"https://atcoder.jp/users/Iorn"},
            {title: "VRChat", category: 'Enjoy', image: "../images/thumb_vrchat.jpg", url:"https://vrchat.com/home/user/usr_0c1fec8f-a643-40f2-a884-80b5915a53d7"},
            {title: "GasshoZukuri VR", category: 'Create', image: "../images/thumb_gasshozukuriVR.jpg", url:"./articles/gasshozukuriVR.html"},
            {title: "Biography", category: 'Others', image: "../images/thumb_biography.jpg", url:"./articles/biography.html"},
            {title: "Photograph", category: 'Create', image: "../images/thumb_photograph.jpg", url:"https://www.youtube.com/watch?v=qT6ygPjV_F0&t=0s"},
            {title: "Movie", category: 'Create', image: "../images/thumb_movie.png", url:"https://www.youtube.com/watch?v=qT6ygPjV_F0&t=0s"},
            {title: "Savonius Windmill", category: 'Create', image: "../images/thumb_windmill.jpg", url:"./articles/windmill.html"},
            {title: "ColorScheme Converter", category: 'Create', image: "../images/thumb_colorscheme.png", url:"https://www.youtube.com/watch?v=qT6ygPjV_F0&t=0s"},
            {title: "Qiita", category: 'Study', image: "../images/thumb_qiita.jpg", url:"./articles/qiita.html"},
            {title: "GitHub", category: 'Study', image: "../images/thumb_qiita.jpg", url:"./articles/github.html"}
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
