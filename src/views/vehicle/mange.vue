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
        <ModalEdit :open="modalEdit.open" :ok="ok" :cancel="cancel" :params='params'></ModalEdit>
    </div>
</template>

<script>
import ModalEdit from './editMangeModal.vue';
import AddInfoModal from './addMangeModal.vue'
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
            lines: [],
            columns: [{
                    key: 'vehicleNumber',
                    title: '车辆编号'
                },
                {
                    key: 'responsible',
                    title: '负责人'
                },
                {
                    key: 'lineArrangement',
                    title: '线路安排'
                },
                {
                    key: 'servicePhone',
                    title: '客服电话'
                },
                {
                    key: 'status',
                    title: '状态'
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
                vehicleNumber: this.value1
                // status: this.query.status
            }
            this.query.page = p ? p : this.query.page;
            this.$http.getVehicleInformation(req)
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
                                vehicleNumber: el.vehicleNumber,
                                responsible: el.responsible,
                                lineArrangement: this.lines.filter(ol => Number(ol.id) === Number(el.lineArrangementId))[0].lineArrangement,
                                lineArrangementId: el.lineArrangementId,
                                servicePhone: el.servicePhone,
                                status: el.status,
                                largeNumber: el.largeNumber,
                                smallNumber: el.smallNumber
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
        // 新增
        okAdd(obj) {
            this.add.open = false;
            console.log(obj)
            let req = {
                vehicleNumber: obj.vehicleNumber,
                responsible: obj.responsible,
                lineArrangementId: obj.lineArrangementId,
                servicePhone: obj.servicePhone,
                largeNumber: obj.largeNumber,
                smallNumber: obj.smallNumber,
                status:'休息中'
            }
            this.$http.getVehicleMangeAdd(req)
                .then(res => {
                    if (res.data.code === 1) {
                        this.search();
                        this.add.open = false;
                        this.$popSuccess('新增车辆成功')
                    }
                })
        },
        // 编辑提交
        ok(obj) {
            this.modalEdit.open = false;
            let req = {
                id: obj.id,
                lineArrangementId: obj.lineArrangementId,
                responsible: obj.responsible,
                servicePhone: obj.servicePhone,
                status: obj.status
            }
            this.$http.getVehicleMangeUpdate(req)
                .then(res => {
                    if (res.data.success) {
                        this.search();
                        this.add.open = false;
                        this.$popSuccess('编辑成功')
                    }
                })
        },
        cancel() {
            this.modalEdit.open = false;
            this.add.open = false;
        },
        //删除
        deleteContarct(row) {
            var msg = "您真的确定要删除吗？ 请确认！"
            if (confirm(msg) == true) {
                this.$http.getVehicleMangeDelete({
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
        },
        //查询线路
         getLine(){
             this.$http.getLine()
                .then(res => {
                    if (res.data.success) {
                        this.lines = res.data.result;
                    } 
                })
        }
    },
    created() {
        this.getLine()
    },
    mounted() {
        this.search();
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
