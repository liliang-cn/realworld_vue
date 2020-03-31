<template>
    <div>
        <ul class="error-messages" v-if="userInfo.error">
            <li
                v-for="err in Object.entries(userInfo.errors)"
                :key="err[0]"
            >{{ err[0] }} {{ err[1].toString() }}</li>
        </ul>

        <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="isRegister">
                <input
                    class="form-control form-control-lg"
                    v-model="user.username"
                    type="text"
                    placeholder="Your Name"
                />
            </fieldset>
            <fieldset class="form-group">
                <input
                    class="form-control form-control-lg"
                    v-model="user.email"
                    type="text"
                    placeholder="Email"
                />
            </fieldset>
            <fieldset class="form-group">
                <input
                    class="form-control form-control-lg"
                    v-model="user.password"
                    type="password"
                    placeholder="Password"
                />
            </fieldset>
            <button
                class="btn btn-lg btn-primary pull-xs-right"
                type="submit"
            >{{ isRegister ? "Sign up": "Sign in" }}</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "AuthForm",
    data() {
        return {
            user: {
                username: "",
                email: "",
                password: ""
            }
        };
    },
    props: {
        userInfo: {
            type: Object,
            default() {
                return {
                    error: false,
                    errors: {}
                };
            }
        },
        isRegister: {
            type: Boolean,
            default() {
                return false;
            }
        }
    },
    methods: {
        onSubmit() {
            this.$emit("handleSubmit", this.user);
        }
    }
};
</script>

<style scoped>
</style>