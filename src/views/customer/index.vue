<template>
<Row>
    <Col span="12">
    <Card class="card">
        <p slot="title">个人信息</p>
        <Form ref="formCustom" :model="formCustom" :label-width="80">
            <FormItem label="用户名：" prop="username">
                <Input type="text" v-model="formCustom.username" disabled></Input>
            </FormItem>
            <FormItem label="密码：" prop="password">
                <Input type="text" v-model="formCustom.password" disabled></Input>
            </FormItem>
            <FormItem label="性别：" prop="sex">
                <Input type="text" v-model="formCustom.sex" :disabled="disabled"></Input>
            </FormItem>
            <FormItem label="年龄：" prop="age">
                <Input type="text" v-model="formCustom.age" :disabled="disabled"></Input>
            </FormItem>
            <FormItem label="联系方式：" prop="phone">
                <Input type="text" v-model="formCustom.phone" :disabled="disabled"></Input>
            </FormItem>
            <FormItem>
              <Button @click="update(formCustom)" type="primary" style="float:right;">编 辑  </Button>
              <Button @click="commit(formCustom)" type="primary" style="float:right;margin-right:10px;">保 存  </Button>
            </FormItem>
        </Form>
    </Card>
    </Col>
</Row>
</template>

<script>
export default {
    data() {
        return {
            formCustom: {
                username: '',
                password: '',
                sex: '',
                age: '',
                phone:''
            },
            disabled:false
        }
    },
    methods:{
        commit(formCustom){
            let req ={
                sex:formCustom.sex,
                age:formCustom.age,
                phone:formCustom.phone,
                username:this.formCustom.username
            }
            this.$http.getInfo(req).then(res=>{
                if(res.data.code == 1){
                    this.disabled = true
                    alert('保存成功')
                }
            })
        },
        update(formCustom){
            this.disabled = false;
        },
        search(){
            let req ={
                user_name:this.formCustom.username
            }
             this.$http.getTips(req)
                .then(res => {
                    if (res.data.success) {
                       this.formCustom.sex = res.data.rows[0].user_sex;
                       this.formCustom.age = res.data.rows[0].user_age;
                       this.formCustom.phone = res.data.rows[0].user_phone;
                       this.disabled = true
                    } 
                })
        }
    },
    mounted(){
        this.formCustom.username = localStorage.getItem("u");
        this.formCustom.password = localStorage.getItem("p");
        this.search()
    }
}
</script>

<style lang="less" scoped>
.card {
    text-align: left;
}
</style>
