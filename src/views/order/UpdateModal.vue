<template>
<Modal :value="open" title="发货管理" :loading="loading" @on-cancel="cancel">
    <footer slot="footer">
        <!-- slot设置之后本身的无用    对话框标题，如果使用 slot 自定义了页头，则 title 无效 -->
        <Button @click="cancel">取消</Button>
        <Button @click="commit(sendObj)" type="primary">确定</Button>
    </footer>
    <Form ref="formInline" :model="sendObj" :label-width="100">
        <FormItem prop="lineArrangementId" label="范围安排" required>
            <Select v-model="sendObj.lineArrangementId" @on-change="opt">
                <Option v-for="item in lineList" :value="item.id" :key="item.id">{{ item.lineArrangement }}</Option>
            </Select>
        </FormItem>
        <FormItem prop="vehicleNumber" label="车辆编号" required>
            <Select v-model="sendObj.vehicleNumber" @on-change="vehicleNumber">
                    <Option v-for="item in VList" :value="item.vehicleNumber" :key="item.id">
                        {{ item.vehicleNumber }}
                    </Option>
                </Select>
        </FormItem>
        <FormItem prop="responsible" label="负责人" required>
            <Select v-model="sendObj.responsible"  @on-change="responsible">
                    <Option v-for="item in RList" :value="item.responsible" :key="item.id">
                        {{ item.responsible }}
                    </Option>
                </Select>
        </FormItem>
        <FormItem prop="servicePhone" label="客服号码" required>
            <Select v-model="sendObj.servicePhone"  @on-change="servicePhone">
                    <Option v-for="item in PList" :value="item.servicePhone" :key="item.id">
                        {{ item.servicePhone }}
                    </Option>
                </Select>
        </FormItem>
        <FormItem label="取件号" prop="pickNumber" required>
            <Input v-model="sendObj.pickNumber" type="text"></Input>
        </FormItem>
         <FormItem label="金额" prop="orderMoney" required>
            <Input v-model="sendObj.orderMoney" type="text"></Input>
        </FormItem>
    </Form>
</Modal>
</template>

<script>
export default {
    data() {
        return {
            sendObj: {
                lineArrangementId: '',
                // lineArrangement: "",
                vehicleNumber: "",
                responsible: "",
                servicePhone: "",
                pickNumber: '',
                orderMoney:''
            },
            loading: true,
            lineList: [],
            VList: [],
            RList:[],
            PList:[]
        };
    },
    props: {
        open: {
            type: Boolean,
            required: true,
            default: false
        },
        ok: {
            type: Function,
            required: true,
            default: () => {}
        },
        cancel: {
            type: Function,
            required: true,
            default: () => {}
        }
    },
    watch: {
        open(val) {
            this.getLine();
            this.getVNumber();
            this.getResponse();
            this.getPhone();
        }
    },
    methods: {
        commit(sendObj) {
            if (!this.sendObj.lineArrangementId) {
                this.$popError('请选择范围安排');
                this.changeLoading()
                return
            } else if (!this.sendObj.vehicleNumber) {
                this.$popError('请选择车辆编号');
                this.changeLoading()
                return
            } else if (!this.sendObj.responsible) {
                this.$popError('请选择负责人');
                this.changeLoading()
                return
            } else if (!this.sendObj.servicePhone) {
                this.$popError('请选择电话号码');
                this.changeLoading()
                return
            } else if (!this.sendObj.servicePhone) {
                this.$popError('请输入取件号码');
                this.changeLoading()
                return
            }  else if (!this.sendObj.orderMoney) {
                this.$popError('请输入价格');
                this.changeLoading()
                return
            } else {
                this.ok(sendObj);
            }
        },
        changeLoading() {
            this.loading = false;
            this.$nextTick(() => {
                this.loading = true;
            });
        },
        // 获取范围
        getLine() {
            this.$http.getLine()
                .then(res => {
                    if (res.data.success) {
                        this.lineList = res.data.result;
                    }
                })
        },
        opt(val) {
            this.sendObj.lineArrangementId = val;
        },
        vehicleNumber(val) {
            this.sendObj.vehicleNumber = val;
        },
        responsible(val) {
            this.sendObj.responsible = val;
        },
        servicePhone(val) {
            this.sendObj.servicePhone = val;
        },
        // 获取车辆编号
        getVNumber() {
            this.$http.getVNumber()
                .then(res => {
                    if (res.data.success) {
                        this.VList = res.data.result;
                    }
                })
        },
        // 获取负责人
        getResponse() {
            this.$http.getResponse()
                .then(res => {
                    if (res.data.success) {
                        this.RList = res.data.result;
                    }
                })
        },
        // 获取客服号码
        getPhone() {
            this.$http.getPhone()
                .then(res => {
                    if (res.data.success) {
                        this.PList = res.data.result;
                    }
                })
        }
    }
};
</script>
