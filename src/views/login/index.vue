<template>
  <div class="login">
    <div class="login-container">
      <div class="login-container__left">
        <div>
          <div class="login-container__left-title">欢迎登录 好比记SaaS</div>
          <div class="login-container__left-slogan">
            人力资源自己的超级工具平台
          </div>
        </div>
      </div>
      <div class="login-container__right">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          label-width="0"
        >
          <div class="login-container__right-title">欢迎登录</div>
          <el-form-item label="">
            <el-input v-model="loginForm.username" placeholder="用户名" />
          </el-form-item>

          <el-form-item label="">
            <el-input v-model="loginForm.password" placeholder="密码" />
          </el-form-item>

          <el-form-item label="">
            <el-button class="login-container__login-button" type="primary">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">
          {{ $t("login.title") }}
        </h3>
        <lang-select class="set-language" />
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          :placeholder="$t('login.username')"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip
        v-model="capsTooltip"
        content="Caps lock is On"
        placement="right"
        manual
      >
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            :placeholder="$t('login.password')"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
      >
        {{ $t("login.logIn") }}
      </el-button>

      <div style="position: relative">
        <div class="tips">
          <span>{{ $t("login.username") }} : admin</span>
          <span>{{ $t("login.password") }} : {{ $t("login.any") }}</span>
        </div>
        <div class="tips">
          <span style="margin-right: 18px">
            {{ $t("login.username") }} : editor
          </span>
          <span>{{ $t("login.password") }} : {{ $t("login.any") }}</span>
        </div>

        <el-button
          class="thirdparty-button"
          type="primary"
          @click="showDialog = true"
        >
          {{ $t("login.thirdparty") }}
        </el-button>
      </div> -->
    <!-- </el-form> -->
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  setup() {
    const state = reactive({
      loginForm: {
        username: "1",
        password: "",
      },
    });
    return {
      ...toRefs(state),
      loginRules: [],
    };
  },
});
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url(../../assets/images/login/bg.png) no-repeat;
  background-size: cover;
  overflow: hidden;
  box-sizing: border-box;
  z-index: 1;

  &:after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: inherit;
    filter: blur(2px);
    z-index: 2;
  }

  &-container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    z-index: 11;

    display: flex;

    height: 576px;

    &__left {
      min-width: 591px;
      height: 100%;
      background: url(../../assets/images/login/bg.png) no-repeat;
      background-size: cover;
      overflow: hidden;

      border-radius: 4px 0 0 4px;

      padding: 0 81px;

      display: flex;
      align-items: center;

      &-title {
        color: #fff;
        line-height: 43.2px;
        font-size: 24px;
        font-weight: 900;
      }

      &-slogan {
        color: #fff;
        font-size: 18px;
        line-height: 28px;
      }
    }

    &__right {
      min-width: 443px;
      height: 100%;
      background: white;
      overflow: hidden;

      border-radius: 0 4px 4px 0;

      padding: 10% 71px 0 54px;
      &-title {
        margin-bottom: 54px;
        color: #545dff;
        font-size: 24px;
        line-height: 42px;
        font-weight: 900;
      }
    }

    &__login-button {
      width: 100%;
    }
  }
}

// @media screen and (min-width: 1680px) and (max-width: 1920px) {
//   .login-container__left {
//     width: 1024px;
//   }
// }

@media screen and (min-width: 1200px) and (max-width: 1680px) {
  .login-container {
    height: 498px;
    &__left {
      min-width: 500px;
    }
    &__right {
      min-width: 380px;
    }
  }
}

@media screen and (min-width: 960px) and (max-width: 1200px) {
  .login-container {
    height: 448px;
    &__left {
      min-width: 450px;
    }
    &__right {
      min-width: 340px;
    }
  }
}

@media screen and (max-width: 960px) {
  .login-container {
    height: 448px;
    &__left {
      display: none;
    }
    &__right {
      border-radius: 4px;
    }
  }
}
</style>