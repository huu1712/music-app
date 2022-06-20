const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const player = $('.player')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const app = {
    currentIndex: 0,
    isPlaying: false,
    songs: [
        {
            name: 'Ông bà già tao lo hết',
            singer: 'Bình Gold',
            path: './assets/songs/OngBaGiaTaoLoHet-BinhGoldLilShady-6720293.mp3',
            img: './assets/img/AcclaimedHeartfeltGoat-size_restricted.gif'
        },
        {
            name: 'Tháng 7 của anh em và cô đơn',
            singer: 'Khói',
            path: './assets/songs/Thang-7-Cua-Anh-Em-Va-Co-Don-Khoi.mp3',
            img: './assets/img/pngtree-musical-note-icon-png-image_1748676.jpg'
        },
        {
            name: 'Tháng tư là lời nói dối của em',
            singer: 'Hà Anh Tuấn',
            img: './assets/img/acca43e84e838dddd492.jpg',
            path: './assets/songs/Thang-Tu-La-Loi-Noi-Doi-Cua-Em-Ha-Anh-Tuan.mp3'
        },
        {
            name: 'Vì mẹ anh bắt chia tay',
            singer: 'Karik ft Miu Lê',
            img: './assets/img/bdda39eb3680f5deac91.jpg',
            path: './assets/songs/Vi-Me-Anh-Bat-Chia-Tay-Miu-Le-Karik-Chau-Dang-Khoa.mp3'
        },

    ],

    render: function () {
        const htmls = this.songs.map(song => {
            return `
            <div class="song">
                <div class="thumb" style="background-image: url('${song.img}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>`
        })
        $('.playlist').innerHTML = htmls.join('')
    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function () {
        const _this = this;
        const cdWidth = cd.offsetWidth

        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newcdWidth = cdWidth - scrollTop
            cd.style.width = newcdWidth > 0 ? newcdWidth + 'px' : 0
            cd.style.opacity = newcdWidth / cdWidth
        }

        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play();
            }
        }

        audio.onpause = function () {
            _this.isPlaying = false
            player.classList.remove('playing')
        }

        audio.onplay = function () {
            _this.isPlaying = true
            player.classList.add('playing')
        }

        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent;
            }
        }

        progress.onchange = function (e) {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
        }

        nextBtn.onclick = function () {
            _this.nextSong();
            audio.play();
        }

        prevBtn.onclick = function () {
            _this.prevSong();
            audio.play();
        }

    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.img}')`
        audio.src = this.currentSong.path
    },

    nextSong: function () {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },

    prevSong: function () {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },

    start: function () {
        this.defineProperties();
        this.handleEvents();
        this.loadCurrentSong();
        this.render();
    }

}
app.start();