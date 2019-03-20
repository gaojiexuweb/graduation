export default [
    {
        id:'1',
        name:'订单管理',
        children:[
            {
                name:'处理订单',
                url:'/nav/HandleOrder'
            },
            {
                name:'进行订单',
                url:'/nav/DoingOrder'
            },
            {
                name:'完成订单',
                url:'/nav/DoneOrder'
            }
        ]
    },
    {
        id:'2',
        name:'车辆管理',
        children:[
            {
                name:'车辆安排',
                url:'/nav/Vehicle'
            },
            {
                name:'车辆配置',
                url:'/nav/VehicleStatus'
            }
        ]
    },
    {
        id:'3',
        name:'计费管理',
        children:[
            {
                name:'价格列表',
                url:'/nav/Price'
            }
        ]
    },
    {
        id:'4',
        name:'信息管理',
        children:[
            {
                name:'个人信息',
                url:'/nav/Customer'
            }
        ]
    }
]