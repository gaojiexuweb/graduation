<template>
  <div>
      <div class="jq22-container" style="padding-top:100px">
          <div class="login-wrap">
            <div class="login-html">
              <input id="tab-1" type="radio" name="tab" class="sign-in" checked><label for="tab-1" class="tab">登 陆  </label>
              <input id="tab-2" type="radio" name="tab" class="sign-up"><label for="tab-2" class="tab">  注 册</label>
              <div class="login-form">
                <!-- 登录页面 -->
                <div class="sign-in-htm">
                  <div class="group">
                    <label for="user" class="label">用 户 名</label>
                    <input id="user" type="text" class="input"  name="username" v-model="username" placeholder="请输入用户姓名">
                  </div>
                  <div class="group">
                    <label for="pass" class="label">密 码</label>
                    <input id="pass" type="password" class="input" data-type="password" name="password" v-model="password" placeholder="请输入用户密码">
                  </div>
                  <div class="group">
                    <input id="check" type="checkbox" class="check" checked>
                    <label for="check"><span class="icon"></span>记 住 密 码</label>
                  </div>
                  <div class="group">
                    <button class="button" @click="jump">登 陆</button>
                  </div>
                  <div class="hr"></div>
                  <div class="foot-lnk">
                    <a href="#forgot">忘 记 密 码?</a>
                  </div>
                </div>
                <!-- 注册页面 -->
                <div class="sign-up-htm">
                  <div class="group">
                    <label for="user" class="label">用 户 名</label>
                    <input id="user" type="text" class="input" v-model="registerName" name="username">
                  </div>
                  <div class="group">
                    <label for="pass" class="label">密 码</label>
                    <input id="pass" type="password" class="input" data-type="password" v-model="registerPassword" name="password">
                  </div>
                  <div class="group">
                    <label for="pass" class="label">确 认 密 码</label>
                    <input id="pass" type="password" class="input" data-type="password" v-model='requirePassword'>
                  </div>
                  <div class="group">
                    <button class="button" @click.prevent="register()">登 陆</button>
                  </div>
                  <div class="hr"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
  </div>
</template>
<script>  
  export default {
    data(){
      return {
        username:"",
        password:"",
        registerName:'',
        registerPassword:'',
				requirePassword:''
			
      }
    },
    methods:{
        jump(){
					if(this.username != '' && this.password !=''){
						const query = {"username":this.username,"password":this.password}
						this.$http.login(query).then((res) => {
							if(res.data.code == 1){
							var u = this.username;
							var p = this.password;
							localStorage.setItem("u", u)
							localStorage.setItem("p", p)
								this.$router.push({path: `/nav/HandleOrder`})
							}else{
								this.username = "",
								this.password = '',
								alert("登录失败")
							}
						})
					}
			},
			register(){
				if(!this.registerName){
					alert("请输入用户名")
				}else if(!this.registerPassword){
					alert('请输入密码')
				}else if(!this.requirePassword){
					alert('请确认密码')
				}else if(this.registerPassword !== this.requirePassword){
					alert('密码不一致，请重新输入')
					this.requirePassword = ''
				}else{
					let req ={'username':this.registerName,'password':this.registerPassword}
					this.$http.register(req).then((res)=>{
						console.log(res.data)
						if(res.data.code === 1){
							alert('注册成功')
							// this.$router.push({path:'/'})
							location.reload()
						}else{
							alert('注册失败')
						}
					})
				}
			}
		}
  }
</script>
<style>
 .app-newinfo{
   overflow: hidden;
 }

 body{
	margin:0;
	color:#6a6f8c;
	background:#c8c8c8;
	font:600 16px/18px 'Open Sans',sans-serif;
}
*,:after,:before{box-sizing:border-box}
.clearfix:after,.clearfix:before{content:'';display:table}
.clearfix:after{clear:both;display:block}
a{color:inherit;text-decoration:none;}
input, button {
  outline: none;
  border: none;
}
.login-wrap{
	width:100%;
	margin:auto;
	max-width:525px;
	min-height:670px;
	position:relative;
	background:url(../assets/bg.jpg) no-repeat center;
	box-shadow:0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19);
}
.login-html{
	width:525px;
	height:100%;
	position:absolute;
	padding:90px 70px 50px 70px;
	background:rgba(6, 6, 6, 0.9);
}
.login-html .sign-in-htm,
.login-html .sign-up-htm{
	top:0;
	left:0;
	right:0;
	bottom:0;
	position:absolute;
	-webkit-transform:rotateY(180deg);
	        transform:rotateY(180deg);
	-webkit-backface-visibility:hidden;
	        backface-visibility:hidden;
	-webkit-transition:all .4s linear;
	        transition:all .4s linear;
}
.login-html .sign-in,
.login-html .sign-up,
.login-form .group .check{
	display:none;
}
.login-html .tab,
.login-form .group .label,
.login-form .group .button{
	text-transform:uppercase;
}
.login-html .tab{
	font-size:22px;
	margin-right:15px;
	padding-bottom:5px;
	margin:0 15px 10px 0;
	display:inline-block;
	border-bottom:2px solid transparent;
}
.login-html .sign-in:checked + .tab,
.login-html .sign-up:checked + .tab{
	color:#fff;
	border-color:#1161ee;
}
.login-form{
	min-height:345px;
	position:relative;
	-webkit-perspective:1000px;
	        perspective:1000px;
	-webkit-transform-style:preserve-3d;
	        transform-style:preserve-3d;
}
.login-form .group{
	margin-bottom:15px;
}
.login-form .group .label,
.login-form .group .input,
.login-form .group .button{
	width:100%;
	color:#fff;
	display:block;
}
.login-form .group .input,
.login-form .group .button{
	border:none;
	padding:15px 20px;
	border-radius:25px;
	background:rgba(255,255,255,.1);
}
.login-form .group input[data-type="password"]{
	text-security:circle;
	-webkit-text-security:circle;
}
.login-form .group .label{
	color:#aaa;
	font-size:12px;
}
.login-form .group .button{
	background:#1161ee;
}
.login-form .group label .icon{
	width:15px;
	height:15px;
	border-radius:2px;
	position:relative;
	display:inline-block;
	background:rgba(255,255,255,.1);
}
.login-form .group label .icon:before,
.login-form .group label .icon:after{
	content:'';
	width:10px;
	height:2px;
	background:#fff;
	position:absolute;
	-webkit-transition:all .2s ease-in-out 0s;
	        transition:all .2s ease-in-out 0s;
}
.login-form .group label .icon:before{
	left:3px;
	width:5px;
	bottom:6px;
	-webkit-transform:scale(0) rotate(0);
	    -ms-transform:scale(0) rotate(0);
	        transform:scale(0) rotate(0);
}
.login-form .group label .icon:after{
	top:6px;
	right:0;
	-webkit-transform:scale(0) rotate(0);
	    -ms-transform:scale(0) rotate(0);
	        transform:scale(0) rotate(0);
}
.login-form .group .check:checked + label{
	color:#fff;
}
.login-form .group .check:checked + label .icon{
	background:#1161ee;
}
.login-form .group .check:checked + label .icon:before{
	-webkit-transform:scale(1) rotate(45deg);
	    -ms-transform:scale(1) rotate(45deg);
	        transform:scale(1) rotate(45deg);
}
.login-form .group .check:checked + label .icon:after{
	-webkit-transform:scale(1) rotate(-45deg);
	    -ms-transform:scale(1) rotate(-45deg);
	        transform:scale(1) rotate(-45deg);
}
.login-html .sign-in:checked + .tab + .sign-up + .tab + .login-form .sign-in-htm{
	-webkit-transform:rotate(0);
	    -ms-transform:rotate(0);
	        transform:rotate(0);
}
.login-html .sign-up:checked + .tab + .login-form .sign-up-htm{
	-webkit-transform:rotate(0);
	    -ms-transform:rotate(0);
	        transform:rotate(0);
}

.hr{
	height:2px;
	margin:60px 0 50px 0;
	background:rgba(255,255,255,.2);
}
.foot-lnk{
	text-align:center;
}
</style>