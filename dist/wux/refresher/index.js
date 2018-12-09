const defaultStyle = 'transition: transform .4s; transform: translate3d(0px, 0px, 0px) scale(1);'

Component({
    externalClasses: ['wux-class'],
    data: {
        className: 'wux-refresher--hidden',
        lClassName: 'wux-loader--hidden',
        style: defaultStyle,
        noData: false
    },
    properties: {
        pullingIcon: {
            type: String,
            value: 'wux-refresher__icon--arrow-down',
        },
        pullingText: {
            type: String,
            value: '下拉刷新',
        },
        refreshingIcon: {
            type: String,
            value: 'wux-refresher__icon--refresher',
        },
        refreshingText: {
            type: String,
            value: '正在刷新',
        },
        loadingText: {
            type: String,
            value: '正在加载'
        },
        loadNoDataText: {
            type: String,
            value: '没有更多数据'
        },
        disablePullingRotation: {
            type: Boolean,
            value: false,
        },
        distance: {
            type: Number,
            value: 30,
        },
        hasFooter: {
            type: Boolean,
            value: false,
        },
        footerHeight: {
            type: Number,
            value: 88,
        }
    },
    methods: {
        /**
         * 显示
         */
        activate() {
            this.setData({
                style: defaultStyle,
                className: 'wux-refresher--visible',
            })
        },
        /**
         * 隐藏
         */
        deactivate() {
            if (this.activated) this.activated = false

            this.setData({
                style: defaultStyle,
                className: 'wux-refresher--hidden',
            })
        },
        /**
         * 正在刷新
         */
        refreshing() {
            this.setData({
                style: 'transition: transform .4s; transform: translate3d(0, 50px, 0) scale(1);',
                className: 'wux-refresher--active wux-refresher--refreshing',
                noData: false,
                lClassName: 'wux-loader--hidden'
            })
        },
        /**
         * 刷新后隐藏动画
         */
        tail() {
            this.setData({
                className: 'wux-refresher--active wux-refresher--refreshing wux-refresher--refreshing-tail',
            })
        },
        hide(){
            this.setData({
                lClassName: 'wux-loader--hidden',
            })
        },
        /**
         * 正在下拉
         * @param {Number} diffY 距离
         */
        move(diffY) {
            const style = `transition-duration: 0s; transform: translate3d(0, ${diffY}px, 0) scale(1);`


            let c
            let d
            if (diffY > 0) {
                if (diffY < this.data.distance) {
                    c = 'wux-refresher--visible'
                } else if (diffY > this.data.distance) {
                    c = 'wux-refresher--active'
                }
                const className = c
                this.setData({
                    style,
                    className,
                })
            } else if(diffY < 0 && this.data.noData === false) {
                if (Math.abs(diffY) < this.data.distance) {
                    d = 'wux-loader--hidden'
                } else if (Math.abs(diffY) > this.data.distance) {
                    d = 'wux-loader--visible'
                }
                const lClassName = d
                this.setData({
                    lClassName
                })
            }
        },
        /**
         * 判断是否正在刷新
         */
        isRefreshing() {
            return this.data.className.indexOf('wux-refresher--refreshing') !== -1
        },
        /**
         * 获取触摸点坐标
         */
        getTouchPosition(e) {
            return {
                x: e.changedTouches[0].pageX,
                y: e.changedTouches[0].pageY,
            }
        },
        /**
         * 创建定时器
         */
        requestAnimationFrame(callback) {
            let currTime = new Date().getTime()
            let timeToCall = Math.max(0, 16 - (currTime - this.lastTime))
            let timeout = setTimeout(() => {
                callback.bind(this)(currTime + timeToCall)
            }, timeToCall)
            this.lastTime = currTime + timeToCall
            return timeout
        },
        /**
         * 清空定时器
         */
        cancelAnimationFrame(timeout) {
            clearTimeout(timeout)
        },
        /**
         * 下拉刷新完成后的函数
         */
        finishPullToRefresh() {
            setTimeout(() => {
                this.requestAnimationFrame(this.tail)
                setTimeout(() => this.deactivate(), 200)
            }, 200)
        },
        finishLoadmore(){
            if(this.data.noData === true){
                this.setData({
                    noData: true
                })
            }else{
                setTimeout(() => {
                    this.requestAnimationFrame(this.hide)
                    setTimeout(() => this.deactivate(), 200)
                }, 200)
            }
            
        },
        endLoadmore(){
            this.setData({
                noData: true
            })
        },
        /**
         * 手指触摸动作开始
         */
        bindtouchstart(e) {
            if (this.isRefreshing()) return false

            const p = this.getTouchPosition(e)

            this.start = p
            this.diffX = this.diffY = 0

            this.activate()
        },
        /**
         * 手指触摸后移动
         */
        bindtouchmove(e) {
            if (!this.start || this.isRefreshing()) return false

            const p = this.getTouchPosition(e)

            this.diffX = p.x - this.start.x
            this.diffY = p.y - this.start.y

            if (this.diffY < 0) {
                this.diffY = - Math.pow(Math.abs(this.diffY), 0.8)
            } else {
                this.diffY = Math.pow(this.diffY, 0.8)
            }

            if (!this.activated && this.diffY > 0 && this.diffY > this.data.distance) {
                this.activated = true
                this.triggerEvent('pulling')
            } else if (this.activated && this.diffY > 0 && this.diffY < this.data.distance) {
                this.activated = false
            }
            else if (!this.activated && this.diffY < 0 && Math.abs(this.diffY) > this.data.distance) {
                this.activated = true
                this.triggerEvent('pulling')
            } else if (!this.activated && this.diffY < 0 && Math.abs(this.diffY) < this.data.distance) {
                this.activated = false
            }

            this.move(this.diffY)
        },
        /**
         * 	手指触摸动作结束
         */
        bindtouchend(e) {
            this.start = false

            if (this.isRefreshing()) return false

            this.deactivate()

            if (this.diffY > 0 && Math.abs(this.diffY) >= this.data.distance) {
                this.refreshing()
                this.triggerEvent('refresh')
            } else if (this.diffY < 0 && Math.abs(this.diffY) >= this.data.distance) {
                if(this.data.noData !== true){
                    this.triggerEvent('loadmore')
                }
            }
        },
    },
    created() {
        this.lastTime = 0
        this.activated = false
    },
})