<template>
<div class="active">
    <div class="top">
        <Button type="primary" @click="refresh" icon="refresh">刷新</Button>
        <Input v-model="value1" icon="ios-search" style="width: 130px;margin-left:10px;" @on-enter="search()"/>
    </div>
        <Table :columns="columns" :data="data" stripe :loading="tableLoading"></Table>
        <Page :total="total" :current="query.page" :page-size="query.rows" @on-change="search" show-total show-sizer show-elevator @on-page-size-change="pageSizeChangeHandler" placement="top">
        </Page>
        <ModalEdit :open="modalEdit.open" :ok="ok" :cancel="cancel"></ModalEdit>
    </div>
</template>

<script>
import ModalEdit from './UpdateModal.vue'
export default {
    data() {
        return {
            value1: '',
            add: {
                open: false
            },
            modalEdit: {
                open: false
            },
            params: {},
            tableLoading: true,
            total: 0,
            query: {
                page: 1,
                rows: 10,
                status: 0 //0.待处理  1.进行中  2.已完成
            },
            columns: [{
                    key: 'orderNumber',
                    title: ' 订单编号',
                    ellipsis: true
                },
                {
                    key: 'consignee',
                    title: '收货人',
                    ellipsis: true
                },
                {
                    key: 'contact',
                    title: '联系方式'
                },
                {
                    key: 'shippingAddress',
                    title: '发货地址',
                    ellipsis: true
                },
                {
                    key: 'receivingAddress',
                    title: ' 收货地址',
                    ellipsis: true
                },
                {
                    key: 'orderTime',
                    title: '下单时间'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.openModalEdit(params.row)
                                    }
                                }
                            }, '发货'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.deleteContarct(params.row)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            data: [],
            saleList: []
        }
    },
    methods: {
        search(p) {
            let req = {
                page: p ? p : this.query.page,
                rows: this.query.rows,
                orderNumber: this.value1,
                status: this.query.status
            }
            this.query.page = p ? p : this.query.page;
            this.$http.getOrder(req)
                .then(res => {
                    if (res.data.rows.length == 0) {
                        if (this.query.page > 1) {
                            this.query.page = this.query.page - 1;
                            if (this.query.page > 0) {
                                this.search()
                            }
                        }
                    }
                    this.tableLoading = false;
                    if (res.data.success) {
                        this.data = res.data.rows.map(el => {
                            return {
                                id: el.id,
                                orderNumber: el.orderNumber,
                                consignee: el.consignee,
                                contact: el.contact,
                                shippingAddress: el.shippingAddress,
                                receivingAddress: el.receivingAddress,
                                orderMoney: el.orderMoney,
                                orderTime: el.orderTime.slice(0, 10)
                            }
                        })
                    } else {
                        this.data = []
                    }

                    this.total = res.data.records;

                })
        },
        pageSizeChangeHandler(t) {
            this.query.rows = t;
            this.query.page = 1;
            this.search();
        },
        refresh() {
            this.value1 = ''
            this.search()
        },
        //编辑弹窗打开
        openModalEdit(row) {
            this.modalEdit.open = true;
            this.params = row;
        },
        // 打开新增工单弹窗  获取问题类型列表
        openModalAdd() {
            this.add.open = true;
        },
        // 新增提交
        ok(obj) {
            this.modalEdit.open = false;
            let req = {
                id: this.params.id,
                lineArrangementId: obj.lineArrangementId,
                responsible: obj.responsible,
                servicePhone: obj.servicePhone,
                vehicleNumber: obj.vehicleNumber,
                pickNumber:obj.pickNumber,
                orderMoney:obj.orderMoney,
                status:1
            }
            this.$http.getGoods(req)
                .then(res => {
                    if (res.data.success) {
                        // this.search()
                        this.$router.push({path:'/nav/DoingOrder'})
                    }
                })
            
        },
        cancel() {
            this.modalEdit.open = false
        },
        //删除
        deleteContarct(row) {
            var msg = "您真的确定要删除吗？ 请确认！"
            if (confirm(msg) == true) {
                this.$http.getOrderDelete({
                    id: row.id
                }).then((res) => {
                    this.tableLoading = false
                    if (res && res.data.success) {
                        this.$popSuccess(res.data.message)
                        this.search()
                    } else {
                        this.$popError(res.data.message)
                    }
                })
            } else {
                return false;
            }
        }
    },
    mounted() {
        this.search();
        // this.getContractSaleFind()
    },
    components: {
        // ContractAdd,
        ModalEdit
    }
}
</script>

<style lang="less" scoped>
.active {
    .top {
        margin-bottom: 20px;
        text-align: left;
    }
}
</style>
