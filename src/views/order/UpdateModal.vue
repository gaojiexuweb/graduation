<template>
<Modal :value="open" title="发货管理" :loading="loading" @on-cancel="cancel">
    <footer slot="footer">
        <!-- slot设置之后本身的无用    对话框标题，如果使用 slot 自定义了页头，则 title 无效 -->
        <Button @click="cancel">取消</Button>
        <Button @click="commit(sendObj)" type="primary">确定</Button>
    </footer>
    <Form ref="formInline" :model="sendObj" :label-width="100">
        <FormItem prop="lineArrangement" label="线路安排" required>
            <!-- <Select v-model="sendObj.lineArrangement">
                    <Option v-for="item in proTypeList" :value="item.id" :key="item.id">
                        {{ item.name }}
                    </Option>
                </Select> -->
        </FormItem>
        <FormItem prop="vehicleNumber" label="车辆编号" required>
            <!-- <Select v-model="sendObj.vehicleNumber">
                    <Option v-for="item in proTypeList" :value="item.id" :key="item.id">
                        {{ item.name }}
                    </Option>
                </Select> -->
        </FormItem>
        <FormItem prop="responsible" label="负责人" required>
            <!-- <Select v-model="sendObj.responsible">
                    <Option v-for="item in proTypeList" :value="item.id" :key="item.id">
                        {{ item.name }}
                    </Option>
                </Select> -->
        </FormItem>
        <FormItem prop="servicePhone" label="客服号码" required>
            <!-- <Select v-model="sendObj.servicePhone">
                    <Option v-for="item in proTypeList" :value="item.id" :key="item.id">
                        {{ item.name }}
                    </Option>
                </Select> -->
        </FormItem>
        <FormItem label="取件号" prop="pickNumber" required>
            <Input v-model="sendObj.pickNumber" type="text"></Input>
        </FormItem>
    </Form>
</Modal>
</template>

<script>
export default {
    data() {
        return {
            sendObj: {
                lineArrangement: "",
                vehicleNumber: "",
                responsible: "",
                servicePhone: "",
                pickNumber: ''
            },
            loading: true
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
            if (val) {
                this.sendObj = {
                    lineArrangement: "",
                    vehicleNumber: "",
                    responsible: "",
                    servicePhone: "",
                    pickNumber: ''
                }
            }
        }
    },
    methods: {
        commit(sendObj) {
            if (!this.sendObj.lineArrangement) {
                this.$popError('请选择线路安排');
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
            } else {
                this.ok(sendObj);
            }
        },
        changeLoading() {
            this.loading = false;
            this.$nextTick(() => {
                this.loading = true;
            });
        }
    }
};
</script>
