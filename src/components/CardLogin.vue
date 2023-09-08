<template>
    <section class="vh-100" style="background-color: #cea147;">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col col-xl-10">
                    <div class="card" style="border-radius: 1rem;">
                        <div class="row g-0">
                            <div class="col-md-6 col-lg-5 d-none d-md-block">
                                <img :src="learn" alt="login form" class="img-fluid"
                                    style="border-radius: 1rem 0 0 1rem; height:630px ;" />
                            </div>
                            <div class="col-md-6 col-lg-7 d-flex align-items-center">
                                <div class="card-body p-4 p-lg-5 text-black">

                                    <form @submit.prevent="submit">

                                        <div class="d-flex align-items-center mb-3 pb-1">
                                            <i class="fas fa-cubes fa-2x me-3" style="color: #ff6219;"></i>
                                            <span class="h1 fw-bold mb-0">Logo</span>
                                        </div>

                                        <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Sign into your account
                                        </h5>

                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form2Example17">Email address</label>

                                            <input v-model="data.email" type="email" id="form2Example17"
                                                class="form-control form-control-lg" />

                                        </div>

                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form2Example27">Password</label>
                                            <input v-model="data.password" type="password" id="form2Example27"
                                                class="form-control form-control-lg" />

                                        </div>

                                        <div class="pt-1 mb-4">
                                            <button class="btn btn-dark btn-lg btn-block" style="width: 470px;"
                                                type="submit">Login</button>
                                        </div>

                                        <a class="small text-muted" href="#!">Forgot password?</a>
                                        <p class="mb-5 pb-lg-2" style="color: #393f81;">Don't have an account? >
                                            <router-link class="mb-5 pb-lg-2" style="color: #393f81;"
                                                to="/register">Register Here </router-link>
                                        </p>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { reactive } from 'vue';
import learn from '../assets/images/learn.jpg';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import axios from 'axios';

export default {
    name: 'CardLogin',
    data() {
        return {
            learn: learn,
            errors: null
        };
    },
    setup() {
        const data = reactive({
            email: '',
            password: ''
        });

        const router = useRouter();
        const store = useStore();

        const submit = async () => {
            const self = this;
            try {
                const response = await fetch('http://127.0.0.1:8000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });


                
                const responseData = await response.json();
                axios.defaults.headers.common['Authorization'] = `Bearer ${responseData.access_token}`;
                console.log('Authorization' , axios.defaults.headers.common['Authorization']);

                if (response.status === 401) {
                    console.error('Unauthorized:', responseData.message);
                    await store.dispatch('setAuth', false);

                    await store.dispatch('setMessage', {
                        type: 'error',
                        text: 'You are not registered. Please register to continue.'
                    });


                    await router.push('/register');
                } else if (response.status === 422) {
                    console.error('Validation failed:', responseData.errors);
                     self.errors = error.response.data.errors;
                } else if (response.status === 500) {
                    console.error('Internal Server Error:', responseData);
                } else if (response.status === 200) {
                    console.log('Login successful');
                    console.log('Response Data:', responseData);

                    if (responseData.access_token) {
                        store.dispatch('setTokens', {
                            accessToken: responseData.access_token,
                            // refreshToken: responseData.refresh_token,
                            
                            accessTokenExpiration: responseData.expires_in * 1000 + Date.now()
                        });
                        console.log(store.state.accessToken);
                        console.log(`user :${responseData.user.user_type}`)
                    }
                    if(responseData.user.user_type == 'Student'){
                        store.dispatch('setAuth', true);
                        store.dispatch('setRoles', 'Student'); 
                        console.log(store.state.userRole);
                        router.push('/home');
                    } else if (responseData.user.user_type == 'Admin') {
                        store.dispatch('setAuth', true);
                        store.dispatch('setRoles', 'Admin'); 
                        console.log(store.state.userRole);
                        router.push('/HomeAdmin');
                    } else {
                        console.error('An error occurred:', error);
                    }
                    
                }
                setInterval(async () => {
                    await store.dispatch('refreshTokenIfNeeded');
                },60 *60 * 1000);


            } catch (error) {
                console.error('An error occurred:', error);
            }
        };

        return {
            data,
            submit,

        };
    }
};
</script>
