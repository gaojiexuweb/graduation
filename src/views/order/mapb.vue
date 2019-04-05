<template>
<div>
    <baidu-map :center="{lng:  119.927069, lat:  31.760247}" :scroll-wheel-zoom="true" :zoom="18">
        <bm-view class="map">
        </bm-view>
        <bm-walking :start="start" :end="end" :auto-viewport="true" location="常州"></bm-walking>
        <my-overlay :position="pos" text="" :active="active" @mouseover.native="active = true" @mouseleave.native="active = false">
        </my-overlay>
    </baidu-map>
</div>
</template>

<script>
import MyOverlay from './MyOverlay.vue'
export default {
    data() {
        return {
            start: '常州市武进区江苏理工学院北院八角楼餐厅后面',
            end: '江苏理工学院25栋',
            active: false,
            pos: {
                lng: 119.926769, //经度
                lat: 31.759714 //纬度
            }
        }
    },
    methods: {
        timer() {
            let timer = setInterval(() => {
                this.pos.lat += 0.00005;
                this.pos.lng -= 0.0001;
                if (this.pos.lng <= 119.92656899999999) {
                    clearInterval(timer);
                    this.timer1();
                }
            }, 1000);
        },
        timer1() {
            let timer1 = setInterval(() => {
                this.pos.lat -= 0.0001;
                if (this.pos.lat <= 31.757514000000015) {
                    clearInterval(timer1);
                    this.timer2()
                }
            }, 1000);
        },
        timer2() {
            let timer2 = setInterval(() => {
                this.pos.lat -= 0.00005;
                this.pos.lng -= 0.0001;
                if (this.pos.lat <= 31.757264000000006) {
                    clearInterval(timer2);
                    this.timer3()
                }
            }, 1000);
        },
        timer3() {
            let timer3 = setInterval(() => {
                this.pos.lat -= 0.00005;
                if (this.pos.lat <= 31.756663999999986) {
                    clearInterval(timer3);
                    setTimeout(() => {
                        this.pos.lng = 119.92486899999999;
                        this.pos.lat = 31.756663999999986;
                        setTimeout(() => {
                            this.pos.lng = 119.92486899999999;
                            this.pos.lat = 31.754563999999986;
                            setTimeout(() => {
                                this.pos.lng = 119.92606899999999;
                                this.pos.lat = 31.754403999999986;
                                setTimeout(() => {
                                    this.pos.lng = 119.92606899999999;
                                    this.pos.lat = 31.754403999999986;
                                    setTimeout(() => {
                                        this.pos.lng = 119.92606899999999;
                                        this.pos.lat = 31.753003999999986;
                                        setTimeout(() => {
                                            this.pos.lng = 119.92856899999999;
                                            this.pos.lat = 31.753003999999986;
                                        }, 3000)
                                    }, 3000)
                                }, 3000)
                            }, 3000)
                        }, 3000)
                    }, 3000)
                }
            }, 3000);
        }
    },
    created() {
        this.end = this.$route.params.receivingAddress;
        if ('江苏理工学院61栋' == this.$route.params.receivingAddress) {
            this.timer()
        }
    },
    components: {
        MyOverlay
    }
}
</script>

<style lang="less" scoped>
.map {
    width: 100%;
    height: 700px;
    font-family: "微软雅黑";
    border: 1px solid black;
}
</style>
