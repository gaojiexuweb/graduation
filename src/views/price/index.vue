<template>
<div class="active">
    <div class="top">
        <Button type="primary" @click="refresh" icon="refresh">刷新</Button>
        <Button type="primary" @click="openModalAdd" icon="add" style="margin:0 20px;">新增</Button>
        <Input v-model="value1" icon="ios-search" style="width: 130px;margin-left:10px;" @on-enter="search()"/>
    </div>
        <Table :columns="columns" :data="data" stripe :loading="tableLoading"></Table>
        <Page :total="total" :current="query.page" :page-size="query.rows" @on-change="search" show-total show-sizer show-elevator @on-page-size-change="pageSizeChangeHandler" placement="top" class="page">
        </Page>
        <AddInfoModal :open="add.open" :okAdd="okAdd" :cancel="cancel"></AddInfoModal>
        <ModalEdit :open="modalEdit.open" :ok="ok" :cancel="cancel" :params="params"></ModalEdit>
    </div>
</template>

<script>
import ModalEdit from './updateModal.vue';
import AddInfoModal from './addModal.vue'
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
                    key: 'lineArrangement',
                    title: '线路'
                },
                {
                    key: 'largeMoney',
                    title: '大件(元/件)'
                },
                {
                    key: 'smallMoney',
                    title: '小件(元/件)'
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
                            }, '编辑'),
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
                lineArrangement: this.value1
            }
            this.query.page = p ? p : this.query.page
            this.$http.getPrice(req)
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
                                lineArrangement: el.lineArrangement,
                                largeMoney: el.largeMoney,
                                smallMoney: el.smallMoney
                            }
                        })
                    } else {
                        this.data = [];
                        console.log(this.data)
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
            this.value1 = '';
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
        // 新增
        okAdd(obj) {
            let req = {
                lineArrangement: obj.lineArrangement,
                largeMoney: obj.largeMoney,
                smallMoney: obj.smallMoney
            }
            this.$http.getPriceAdd(req)
                .then(res => {
                    if (res.data.code === 1) {
                        this.add.open = false;
                        this.$popSuccess('新增价格成功');
                        this.search();
                    }
                })
        },
        // 编辑提交
        ok(obj) {
            this.modalEdit.open = false
            let req = {
                id: obj.id,
                lineArrangement: obj.lineArrangement,
                largeMoney: obj.largeMoney,
                smallMoney: obj.smallMoney
            }
            this.$http.getPriceUpdate(req)
                .then(res => {
                    if (res.data.code === 1) {
                        this.add.open = false;
                        this.$popSuccess('新增价格成功');
                        this.search();
                    }
                })
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
