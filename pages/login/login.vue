<template>
  <view class="login">
    <view class="logo-warp">
      <image class="logo" src="../../static/images/login/logo.png"></image>
    </view>
    <!-- 标题 -->
    <view class="title"> 欢迎登录 </view>
    <!-- 登录表单 -->
    <form action="/" class="login-form">
      <view class="user-name">
        <!-- 用户头像 -->
        <image
          class="user-icon"
          src="../../static/images/login/user.png"
        ></image>
        <!-- 输入框 -->
        <input
          :cursor-spacing="20"
          v-model="loginForm.username"
          placeholder="请输入账号"
        />
        <!-- 清除按钮 -->
        <image
          ref="userNameRef"
          @touchend.prevent="clearUserName"
          class="close-icon"
          src="../../static/images/login/close.png"
        ></image>
      </view>
      <view class="psw">
        <!-- 密码琐 -->
        <image class="psw-icon" src="../../static/images/login/psw.png"></image>
        <input
          :cursor-spacing="40"
          v-model="loginForm.password"
          placeholder="请输入密码"
          cursor-spacing="80"
          :password="isPassword"
        />
        <!-- 展示密码 -->
        <image
          @touchend.prevent="changePswType"
          v-if="isPassword"
          class="show-psw-icon"
          src="../../static/images/login/show-psw.png"
        >
        </image>
        <!-- 隐藏密码 -->
        <image
          @touchend.prevent="changePswType"
          v-else
          class="hidden-psw-icon"
          src="../../static/images/login/hidden-psw.png"
        ></image>
      </view>
    </form>
    <view class="login-btn" @click="handleLogin"> 登录 </view>
  </view>
</template>

<script setup>
import { validateNull, $showToast } from "@/utils/index.js";
import { ref } from "vue";
import { useUserStore } from "@/stores/index.js";
const userStore = useUserStore();
// 登录表单
const loginForm = ref({
  username: "",
  password: "",
});
// 密码状态（默认进来是密码状态）
const isPassword = ref(true);
// 切换密码状态
const changePswType = () => {
  isPassword.value = !isPassword.value;
};
// 清除用户账号
const clearUserName = () => {
  loginForm.value.username = "";
};
// 表单校验
const validateForm = (calback) => {
  console.log(loginForm.value, 89);
  if (validateNull(loginForm.value.username)) {
    $showToast("账号不能为空!");
  } else if (validateNull(loginForm.value.password)) {
    $showToast("密码不能为空!");
  } else {
    calback();
  }
};
// 处理登录
const handleLogin = () => {
  validateForm(() => {
    userStore.Login(loginForm.value).then((res) => {
      uni.navigateTo({
        url: "/pages/home/home",
      });
    });
  });
};
</script>

<style lang="scss">
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: url(../../static/images/login/bg.png) no-repeat;
  background-size: cover;
  .logo-warp {
    display: flex;
    justify-content: flex-start;
    padding-top: 216rpx;
    padding-left: 80rpx;
    // padding-bottom: 116rpx;
    .logo {
      width: 137.11rpx;
      height: 48rpx;
    }
  }

  .title {
    width: 192rpx;
    height: 68rpx;
    padding-left: 80rpx;
    font-family: PingFang SC, PingFang SC;
    font-weight: bold;
    font-size: 48rpx;
    color: #ffffff;
    line-height: 67rpx;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }
  .login-form {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    .user-name,
    .psw {
      width: 590rpx;
      height: 72rpx;
      line-height: 72rpx;
      background: #f7f7f7;
      border-radius: 80rpx;
      padding: 10rpx 94rpx;
      position: relative;
      box-sizing: border-box;

      input,
      input::placeholder {
        width: 100%;
        font-weight: 400;
        font-size: 32rpx;
        line-height: 38rpx;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }
      // 有点偏上了
      input {
        margin-top: 2rpx;
      }

      input::placeholder {
        color: #999999;
      }

      image {
        width: 40rpx;
        height: 40rpx;
        position: absolute;
      }

      .user-icon,
      .psw-icon {
        left: 32rpx;
        top: 16rpx;
      }

      .close-icon,
      .show-psw-icon,
      .hidden-psw-icon {
        right: 32rpx;
        top: 16rpx;
      }
    }

    .user-name {
      margin-top: 80rpx;
    }

    .psw {
      margin-top: 40rpx;
    }
  }
  .login-btn {
    margin: 0 auto;
    margin-bottom: 278rpx;
    width: 590rpx;
    height: 92rpx;
    background: #409eff;
    border-radius: 46rpx;
    font-family: PingFang SC, PingFang SC;
    font-weight: bold;
    font-size: 32rpx;
    color: #ffffff;
    line-height: 92rpx;
    text-align: center;
    font-style: normal;
    text-transform: none;
  }
}
</style>
