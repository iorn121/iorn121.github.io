
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
            {title: "GasshoZukuri VR", category: 'Create', image: "../images/thumb_gasshozukuri.jpg", url:"https://www.youtube.com/watch?v=qT6ygPjV_F0&t=0s"},
            {title: "Biography", category: 'Others', image: "../images/thumb_biography.jpg", url:""},
            {title: "Photograph", category: 'Create', image: "../images/thumb_photograph.jpg", url:"https://www.youtube.com/watch?v=qT6ygPjV_F0&t=0s"}
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
