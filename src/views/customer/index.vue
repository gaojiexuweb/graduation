<template>
<Row>
    <Col span="12">
    <Card class="card">
        <p slot="title">个人信息</p>
        <Form ref="formCustom" :model="formCustom" :label-width="80">
            <FormItem label="用户名：" prop="username">
                <Input type="username" v-model="formCustom.username"></Input>
            </FormItem>
            <FormItem label="密码：" prop="password">
                <Input type="password" v-model="formCustom.password"></Input>
            </FormItem>
            <FormItem label="性别：" prop="sex">
                <Input type="text" v-model="formCustom.sex"></Input>
            </FormItem>
            <FormItem label="年龄：" prop="age">
                <Input type="text" v-model="formCustom.age" number></Input>
            </FormItem>
            <FormItem label="联系方式：" prop="phone">
                <Input type="text" v-model="formCustom.phone" number></Input>
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
            }
        }
    }
}
</script>

<style lang="less" scoped>
.card {
    text-align: left;
}
</style>
