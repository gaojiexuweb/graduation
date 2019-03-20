<template>
  <Modal :value="modalOpen" :mask-closable="false" :title="$t('titles.change_password')"
    @on-ok="ok" @on-cancel="cancel" :loading="loading">
    <Alert type="info" show-icon v-if="!notNew">
      {{$t('msg.new_user_change_password')}}
    </Alert>
    <Form ref="form" :model="query" :label-width="90" :rules="rules">
      <FormItem :label="$t('labels.currentPwd')" prop="oldPass">
        <Input style="width:300px;" v-model="query.oldPass" type="password"></Input>
      </FormItem>
      <FormItem :label="$t('labels.newPwd')" prop="newPass">
        <Input style="width:300px;" v-model="query.newPass" type="password"></Input>
      </FormItem>
      <FormItem :label="$t('labels.checkPwd')" prop="checkPass">
        <Input style="width:300px;" v-model="query.checkPass" type="password"></Input>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
// import md5 from "js-md5";

export default {
  data() {
    const checkOldPass = (rule, value, cb) => {
      let req = {};
      req.userId = this.user.userId;
      // req.userPass = md5.hex(this.query.oldPass).toUpperCase();
      req.userPass = btoa(this.query.oldPass)
      this.$http.checkPass(req).then(res => {
        if (res && res.data.success) {
          cb();
        } else {
          cb(new Error(res.data.message));
        }
      });
    };
    const checkPass = (rule, value, cb) => {
      if (this.query.newPass == this.query.checkPass) {
        cb();
      } else {
        cb(
          new Error(
            localStorage.lang == "en"
              ? "Different passwords were entered"
              : "两次输入密码不同"
          )
        );
      }
    };
    return {
      query: {
        oldPass: "",
        newPass: "",
        checkPass: ""
      },
      rules: {
        oldPass: [
          this.$vRules.required,
          { validator: checkOldPass, trigger: "blur" }
        ],
        newPass: [this.$vRules.required, this.$vRules.at_least_6, this.$vRules.at_most_18, this.$vRules.userPassword],
        checkPass: [
          this.$vRules.required,
          { validator: checkPass, trigger: "change blur" }
        ]
      },
      loading: true
    };
  },
  watch: {
    modalOpen(val) {
      if (val) {
        this.query.oldPass = ""
        this.query.newPass = ""
        this.query.checkPass = ""
      } else {
        this.$refs.form.resetFields();
      }
    }
  },
  props: ["modalOpen","user","notNew"],
  methods: {
    ok() {
      this.$refs.form.validateField('oldPass', (v) => {
        if (v.length===0) {
          this.$refs.form.validateField('newPass', (n) => {
            if (n.length===0) {
              this.$refs.form.validateField('checkPass', (e) => {
                if (e.length===0) {
                  let req = {};
                  // req.oldPassword = md5.hex(this.query.oldPass).toUpperCase();
                  // req.password = md5.hex(this.query.newPass).toUpperCase();
                  req.oldPassword = btoa(this.query.oldPass)
                  req.password = btoa(this.query.newPass)
                  this.$http.updatePass(req).then(res => {
                    if (res && res.data.success) {
                      this.$popSuccess(this.$t('msg.new_user_relogin'));
                      this.$emit("modal-cancel", "modalPassword");
                    } else {
                      this.$popError(res.data.message);
                    }
                  });
                }
              })
            }
          })
        }
        this.changeLoading()
      })
    },
    cancel() {
      this.$emit("modal-cancel");
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
