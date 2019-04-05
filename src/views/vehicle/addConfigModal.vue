<template>
<Modal :value="open" title="新增配置" :loading="loading" @on-cancel="cancel">
    <footer slot="footer">
        <!-- slot设置之后本身的无用    对话框标题，如果使用 slot 自定义了页头，则 title 无效 -->
        <Button @click="cancel">取消</Button>
        <Button @click="commit(sendObj)" type="primary">确定</Button>
    </footer>
    <Form ref="formInline" :model="sendObj" :label-width="100">
        <FormItem prop="vehicleType" label="车辆型号" required>
            <Input v-model="sendObj.vehicleType" type="text"></Input>
        </FormItem>
        <FormItem prop="vehicleNumber" label="车辆编号" required>
            <Input v-model="sendObj.vehicleNumber" type="text"></Input>
        </FormItem>
        <FormItem prop="largeNumber" label="大件格数" required>
            <Input v-model="sendObj.largeNumber" type="text"></Input>
        </FormItem>
        <FormItem prop="smallNumber" label="小件格数" required>
            <Input v-model="sendObj.smallNumber" type="text"></Input>
        </FormItem>
        <FormItem prop="color" label="颜色" required>
            <Input v-model="sendObj.color" type="text"></Input>
        </FormItem>
        <FormItem prop="length" label="长度" required>
            <Input v-model="sendObj.length" type="text"></Input>
        </FormItem>
        <FormItem prop="width" label="宽度" required>
            <Input v-model="sendObj.width" type="text"></Input>
        </FormItem>
        <FormItem prop="height" label="高度" required>
            <Input v-model="sendObj.height" type="text"></Input>
        </FormItem>
    </Form>
</Modal>
</template>

<script>
export default {
    data() {
        return {
            sendObj: {
                vehicleType: '',
                vehicleNumber: "",
                largeNumber: "",
                smallNumber: "",
                color: "",
                length: "",
                width: "",
                height: ""
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
            if (val) {
                this.sendObj = {
                    vehicleType: '',
                    vehicleNumber: "",
                    largeNumber: "",
                    smallNumber: "",
                    color: "",
                    length: "",
                    width: "",
                    height: ""
                }
            }
        }
    },
    methods: {
        commit(sendObj) {
            this.okAdd(sendObj);
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
