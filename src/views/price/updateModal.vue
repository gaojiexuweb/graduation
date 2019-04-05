<template>
<Modal :value="open" title="编辑价格" :loading="loading" @on-cancel="cancel">
    <footer slot="footer">
        <!-- slot设置之后本身的无用    对话框标题，如果使用 slot 自定义了页头，则 title 无效 -->
        <Button @click="cancel">取消</Button>
        <Button @click="commit(sendObj)" type="primary">确定</Button>
    </footer>
    <Form ref="formInline" :model="sendObj" :label-width="100">
        <FormItem prop="lineArrangement" label="范围安排" required>
            <Input v-model="sendObj.lineArrangement" type="text"></Input>
        </FormItem>
        <FormItem prop="largeMoney" label="大件(元/件)" required>
            <Input v-model="sendObj.largeMoney" type="text"></Input>
        </FormItem>
        <FormItem prop="smallMoney" label="小件(元/件)" required>
            <Input v-model="sendObj.smallMoney" type="text"></Input>
        </FormItem>
    </Form>
</Modal>
</template>

<script>
export default {
    data() {
        return {
            sendObj: {
                id:'',
                lineArrangement: "",
                largeMoney: "",
                smallMoney: ""
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
        },
        params: {
            type: Object,
            required: true,
            default: () => {}
        }
    },
    watch: {
        open(val) {
            this.sendObj = JSON.parse(JSON.stringify(this.params));
        }
    },
    methods: {
        commit(sendObj) {
            if (!this.sendObj.lineArrangement) {
                this.$popError('请选择范围安排');
                this.changeLoading()
                return
            } else if (!this.sendObj.largeMoney) {
                this.$popError('请输入大件元数');
                this.changeLoading()
                return
            } else if (!this.sendObj.smallMoney) {
                this.$popError('请输入小件元数');
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
