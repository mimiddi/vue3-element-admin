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
        <!-- ref 与 model 同名会导致值显示不出来 -->
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginRules"
          autocomplete="on"
          label-width="0"
        >
          <div class="login-container__right-title">欢迎登录</div>
          <el-form-item label="" prop="username">
            <el-input
              v-model="loginForm.username"
              clearable
              name="username"
              type="text"
              tabindex="1"
              autocomplete="on"
              placeholder="用户名"
            />
          </el-form-item>

          <el-form-item label="" prop="password">
            <el-input
              v-model="loginForm.password"
              show-password
              name="password"
              tabindex="2"
              autocomplete="on"
              placeholder="密码"
              @keyup="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter="handleLogin"
            />
          </el-form-item>

          <el-form-item label="">
            <el-button
              class="login-container__login-button"
              type="primary"
              :loading="loading"
              @click.prevent="handleLogin"
              >登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "Login",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
      loading: false, // 提交状态
      loginFormRef: ref(),
      handleLogin: () => {
        state.loginFormRef.validate(async (valid) => {
          if (valid) {
            state.loading = true;
            store
              .dispatch("user/login", state.loginForm)
              .then(({ message }) => {
                ElMessage.success({ message });
                const targetPath = decodeURIComponent(route.query.redirect);
                if (targetPath.startsWith("http")) {
                  // 如果是一个url地址
                  window.location.href = targetPath;
                } else if (targetPath.startsWith("/")) {
                  // 如果是内部路由地址
                  router.push(targetPath);
                } else {
                  router.push("/");
                }
                state.loading = false;
              });
          }
        });
      },
    });

    return {
      ...toRefs(state),
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
      padding: 10% 54px 0 54px;
    }
  }
}
</style>