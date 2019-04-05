<template>
<Modal :value="open" title="新增车辆" :loading="loading" @on-cancel="cancel">
    <footer slot="footer">
        <!-- slot设置之后本身的无用    对话框标题，如果使用 slot 自定义了页头，则 title 无效 -->
        <Button @click="cancel">取消</Button>
        <Button @click="commit(sendObj)" type="primary">确定</Button>
    </footer>
    <Form ref="formInline" :model="sendObj" :label-width="100">
         <FormItem prop="vehicleNumber" label="车辆编号" required>
              <Input v-model="sendObj.vehicleNumber" type="text"></Input>
        </FormItem>
        <FormItem prop="lineArrangementId" label="范围安排" required>
           <Select v-model="sendObj.lineArrangementId" @on-change="opt">
                <Option v-for="item in lineList" :value="item.id" :key="item.id">{{ item.lineArrangement }}</Option>
            </Select>
        </FormItem>
        <FormItem prop="responsible" label="负责人" required>
           <Input v-model="sendObj.responsible" type="text"></Input>
        </FormItem>
        <FormItem prop="servicePhone" label="客服号码" required>
             <Input v-model="sendObj.servicePhone" type="text"></Input>
        </FormItem>
        <FormItem prop="largeNumber" label="大件格数" required>
           <Input v-model="sendObj.largeNumber" type="text"></Input>
        </FormItem>
        <FormItem prop="smallNumber" label="小件格数" required>
             <Input v-model="sendObj.smallNumber" type="text"></Input>
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
                largeNumber:'',
                smallNumber:''
            },
            loading: true,
            lineList:[]
        };
    },
    props: {
        open: {
            type: Boolean,
            required: true,
            default: false
        },
        okAdd: {
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
            // if (val) {
            //     this.sendObj = {
            //         lineArrangement: "",
            //         vehicleNumber: "",
            //         responsible: "",
            //         servicePhone: "",
            //         largeNumber: '',
            //         smallNumber:''
            //     }
            // }
            this.getLine()
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
            }  else if (!this.sendObj.largeNumber) {
                this.$popError('请输入大件格数');
                this.changeLoading()
                return
            }  else if (!this.sendObj.smallNumber) {
                this.$popError('请输入小件格数');
                this.changeLoading()
                return
            } else {
                this.okAdd(sendObj);
            }
        },
        changeLoading() {
            this.loading = false;
            this.$nextTick(() => {
                this.loading = true;
            });
        },
        getLine(){
             this.$http.getLine()
                .then(res => {
                    if (res.data.success) {
                        this.lineList = res.data.result;
                    } 
                })
        },
        opt(val){
            console.log('val',val)
            this.sendObj.lineArrangementId = val;
        }
    }
};
</script>
