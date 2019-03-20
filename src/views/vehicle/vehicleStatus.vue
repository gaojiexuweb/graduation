<template>
<div class="active">
    <div class="top">
        <Button type="primary" @click="search" icon="refresh">刷新</Button>
        <Button type="primary" @click="openModalAdd" icon="add" style="margin:0 20px;">新增</Button>
        <Input v-model="value1" icon="ios-search" style="width: 130px;margin-left:10px;" @on-enter="search()"/>
    </div>
        <Table :columns="columns" :data="data" stripe :loading="tableLoading"></Table>
        <Page :total="total" :current="query.page" :page-size="query.rows" @on-change="search" show-total show-sizer show-elevator @on-page-size-change="pageSizeChangeHandler" placement="top" class="page">
        </Page>
        <AddInfoModal :open="add.open" :okAdd="okAdd" :cancel="cancel"></AddInfoModal>
        <ModalEdit :open="modalEdit.open" :ok="ok" :cancel="cancel"></ModalEdit>
    </div>
</template>

<script>
import ModalEdit from './TypeEditModal.vue';
import AddInfoModal from './addTypeModal.vue'
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
                status: 0
            },
            columns: [{
                    key: 'vehicleType',
                    title: '车辆型号'
                },
                {
                    key: 'vehicleNumber',
                    title: '车辆编号'
                },
                {
                    key: 'largeNumber',
                    title: ' 大件格数'
                },
                {
                    key: 'smallNumber',
                    title: ' 小件格数'
                },
                {
                    key: 'color',
                    title: ' 颜色'
                },
                {
                    key: 'length',
                    title: ' 长度(cm)'
                },
                {
                    key: 'width',
                    title: ' 宽度(cm)'
                },
                {
                    key: 'height',
                    title: ' 高度(cm)'
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
                                        this.openModalEdit(params)
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.deleteContarct(params)
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
                vehicleType: this.value1
            }
            this.query.page = p ? p : this.query.page
            this.$http.getVehicleConfiguration(req)
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
                                vehicleType: el.vehicleType,
                                vehicleNumber: el.vehicleNumber,
                                largeNumber: el.largeNumber,
                                smallNumber: el.smallNumber,
                                color: el.color,
                                length: el.length,
                                width: el.width,
                                height: el.height
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
        //编辑弹窗打开
        openModalEdit(row) {
            this.modalEdit.open = true;
            this.params = row;
        },
        // 打开新增工单弹窗  获取问题类型列表
        openModalAdd() {
            this.add.open = true;
        },
        // 新增
        okAdd(obj) {
            this.add.open = false
            // let req = {
            //     contractNumber: obj.contractNumber,
            //     contractName: obj.contractName,
            //     customerName: obj.customerName,
            //     customerManager: obj.customerManager,
            //     signTime: obj.signTime.getTime(),
            //     saleManager: obj.saleManager,
            //     startTime: obj.startTime.getTime(),
            //     expireTime: obj.expireTime.getTime(),
            //     contractMoney: obj.contractMoney,
            //     attachmentName: obj.attachmentName,
            //     attachmentUrl: obj.attachmentUrl
            // }
            // this.$http.getContractAdd(req)
            //     .then(res => {
            //         if (res.data.success) {
            //             this.search();
            //             this.add.open = false;
            //             this.$popSuccess('新增合同成功')
            //         }
            //     })
        },
        // 编辑提交
        ok(obj) {
            this.modalEdit.open = false
            // let req = {
            //     contractNumber: obj.contractNumber,
            //     contractName: obj.contractName,
            //     customerName: obj.customerName,
            //     customerManager: obj.customerManager,
            //     signTime: obj.signTime.getTime(),
            //     saleManager: obj.saleManager,
            //     startTime: obj.startTime.getTime(),
            //     expireTime: obj.expireTime.getTime(),
            //     contractMoney: obj.contractMoney,
            //     attachmentName: obj.attachmentName,
            //     attachmentUrl: obj.attachmentUrl
            // }
            // this.$http.getContractAdd(req)
            //     .then(res => {
            //         if (res.data.success) {
            //             this.search();
            //             this.add.open = false;
            //             this.$popSuccess('新增合同成功')
            //         }
            //     })
        },
        cancel() {
            this.modalEdit.open = false;
            this.add.open = false;
        },
        //删除
        deleteContarct(row) {
            this.$Modal.confirm({
                title: '删除订单',
                content: '确认要删除这条订单吗？',
                loading: true
                // onOk: () => {
                //     this.$http.getContractDelete({
                //         contractId: row.contractId
                //     }).then((res) => {
                //         this.tableLoading = false
                //         if (res && res.data.success) {
                //             this.$popSuccess()
                //             this.search()
                //             this.$Modal.remove()
                //         } else {
                //             this.$popError(res.data.message)
                //             this.$Modal.remove()
                //         }
                //     })
                // }
            })
        }
    },
    mounted() {
        this.search();
        // this.getContractSaleFind()
    },
    components: {
        AddInfoModal,
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
