<template>
<div>
    <Form :model="query" inline @keydown.native.enter.prevent="">
        <FormItem>
            <Button type="primary" @click="refresh" icon="refresh">刷新</Button>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="openModalAdd" icon="b-added">{{$t("buttons.add")}}</Button>
        </FormItem>
        <FormItem>
            <Select v-model="query.status" style="width:200px">
          <Option v-for="item in statuses" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </FormItem>
        <FormItem>
            <Button icon="ios-search" @click="getOrderList">搜索</Button>
        </FormItem>
    </Form>
    <Table :columns="dataTable.columns" stripe :data="dataTable.rows" :loading="tableLoading" size="small" style="width:100%"></Table>
    <Page :total="total" :current="query.page" :page-size="query.rows" @on-change="value => {
      this.query.page = value; this.getOrderList(false);
    }" show-total show-sizer show-elevator @on-page-size-change="value => {
      this.query.rows = value; this.getOrderList();
    }" placement="top"></Page>
    <Update :open="updateOpen" :ok="ok" :cancel="cancel" :proTypeList="proTypeList" />
</div>
</template>

<script>
import Update from "./UpdateModal.vue";
export default {
    data() {
        return {
            statuses: [{
                    value: '',
                    label: "全部"
                },
                {
                    value: 7,
                    label: "待反馈"
                },
                {
                    value: 8,
                    label: "已反馈"
                }
            ],
            query: {
                orderType: 3, // 1. 资源  2. 应用  3.问题
                status: '',
                page: 1,
                rows: 10
            },
            tableLoading: false,
            total: 0,
            dataTable: {
                columns: [{
                        title: "工单编号",
                        align: 'center',
                        key: "orderNumber",
                        width: 250,
                        render: (h, params) => {
                            return h('a', {
                                on: {
                                    click: () => {
                                        this.$router.push({
                                            name: 'problemDetail',
                                            params: {
                                                id: params.row.orderId
                                            }
                                        })
                                    }
                                }
                            }, params.row.orderNumber)
                        }
                    },
                    {
                        title: "状态",
                        align: 'center',
                        key: "orderStatusName"
                    },
                    {
                        title: "问题类型",
                        key: "problemTypeName",
                        align: 'center',
                        ellipsis: true
                    },
                    {
                        title: "申请时间",
                        align: 'center',
                        key: "applyTime"
                    },
                    {
                        title: "处理时间",
                        align: 'center',
                        key: "updateTime"
                    }
                ],
                rows: []
            },
            proTypeList: [],
            updateOpen: false,
            userId: 0

        };
    },
    watch: {
        userId() {
            this.getOrderList()
        }
    },
    methods: {
        /** 获取问题工单列表
         * 默认当前重置为第一页
         * 页码跳转传参false
         **/
        refresh() {
            this.query.status = ''
            this.getOrderList();
        },
        getOrderList(flag = true) {
            this.tableLoading = true
            if (flag) {
                this.query.page = 1;
            }
            let obj = {
                applicantId: this.$store.state.user.userId,
                orderType: this.query.orderType,
                orderStatus: this.query.status,
                page: this.query.page,
                rows: this.query.rows
            }
            this.$http.getOrderList(obj)
                .then(res => {
                    this.tableLoading = false;
                    if (res.data.success) {
                        this.dataTable.rows = res.data.rows.map(el => {
                            return {
                                orderNumber: el.orderNumber,
                                applicantId: el.applicantId,
                                applicantName: el.applicantName,
                                applyTime: this.$moment(el.applyTime).format("YYYY-MM-DD hh:mm:ss"),
                                orderId: el.orderId,
                                orderStatus: el.orderStatus,
                                orderStatusName: this.statuses.filter(ol => Number(ol.value) === Number(el.orderStatus))[0].label,
                                updateTime: el.updateTime ? this.$moment(el.updateTime).format("YYYY-MM-DD hh:mm:ss") : '--',
                                problemTypeId: el.problemTypeId,
                                problemTypeName: el.problemTypeName
                            }
                        })
                        this.total = res.data.records;
                    }
                })
        },
        // 打开新增工单弹窗  获取问题类型列表
        openModalAdd() {
            this.updateOpen = true;
            this.$http.getProTypeList({
                    parentId: '0'
                })
                .then(res => {
                    if (res.data.success) {
                        this.proTypeList = res.data.data;
                    }
                })
        },
        // 新增提交
        ok(obj) {
            let req = {
                applicantId: this.$store.state.user.userId,
                orderType: this.query.orderType,
                orderName: '问题工单', // 暂不用管
                orderStatus: 7, // 新增写死状态为7，待反馈
                problemTypeId: obj.type,
                orderDesc: obj.desc,
                attachmentName: obj.attachmentName,
                attachmentUrl: obj.attachmentUrl
            }
            this.$http.addOrder(req)
                .then(res => {
                    if (res.data.success) {
                        this.getOrderList();
                        this.updateOpen = false;
                        this.$popSuccess('创建问题工单成功')
                    }
                })
        },
        cancel() {
            this.updateOpen = false;
        }
    },
    created() {
        this.userId = this.$store.state.user.userId;
        this.getOrderList();
    },
    components: {
        Update
    }
};
</script>
