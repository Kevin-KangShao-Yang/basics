<template>
    <el-card>
        <div id="container">
            <!-- 这是用来渲染 echars -->
        </div>
    </el-card>
</template>

<script>
// 导入 echarts
import echarts from 'echarts'

export default {
    data() {
        return {
            myChart: null
        }
    },
    methods: {
        initEcharts() {
            // 初始化
            this.myChart = echarts.init(document.querySelector('#container'))
            // 设置属性
            // 绘制图表
            // this.myChart.setOption({
            //     title: {
            //         text: 'ECharts 入门示例'
            //     },
            //     tooltip: {},
            //     xAxis: {
            //         data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            //     },
            //     yAxis: {},
            //     series: [{
            //         name: '销量',
            //         type: 'bar',
            //         data: [5, 20, 36, 10, 10, 20]
            //     }]
            // });
            let option = {
                xAxis: {},
                yAxis: {},
                series: [{
                    symbolSize: 20,
                    data: [
                        [10.0, 8.04],
                        [8.0, 6.95],
                        [13.0, 7.58],
                        [9.0, 8.81],
                        [11.0, 8.33],
                        [14.0, 9.96],
                        [6.0, 7.24],
                        [4.0, 4.26],
                        [12.0, 10.84],
                        [7.0, 4.82],
                        [5.0, 5.68]
                    ],
                    type: 'scatter'
                }]
            };
            this.myChart.setOption(option)
        }
    },
    // 页面打开时初始化 echart
    mounted() {
        this.initEcharts()
    }
    // vue 的生命周期的问题；
    //  created: 没有生成 dom 初始化了 data & method
    //  mounted: 可以获取到 dom   
}
</script>

<style>
#container {
    width: 100%;
    height: 500px;
    background-color: pink;
}
</style>
