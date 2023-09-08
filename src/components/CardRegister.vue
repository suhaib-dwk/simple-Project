<template>
    <section class="background-radial-gradient overflow-hidden">
        <div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
            <div class="row gx-lg-5 align-items-center mb-5">
                <div class="col-lg-6 mb-5 mb-lg-0" style="z-index: 10">
                    <h1 class="my-5 display-5 fw-bold ls-tight" style="color: hsl(218, 81%, 95%)">
                        The best offer <br />
                        <span style="color: hsl(218, 81%, 75%)">for your business</span>
                    </h1>
                    <p class="mb-4 opacity-70" style="color: hsl(218, 81%, 85%)">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                        Temporibus, expedita iusto veniam atque, magni tempora mollitia
                        dolorum consequatur nulla, neque debitis eos reprehenderit quasi ab
                        ipsum nisi dolorem modi. Quos?
                    </p>
                </div>

                <div class="col-lg-6 mb-5 mb-lg-0 position-relative">
                    <div id="radius-shape-1" class="position-absolute rounded-circle shadow-5-strong"></div>
                    <div id="radius-shape-2" class="position-absolute shadow-5-strong"></div>

                    <div class="card bg-glass">
                        <div class="card-body px-4 py-5 px-md-5">
                            <form @submit.prevent="submit">
                                <div class="row">
                                    <div class="col-md-12 mb-4">
                                        <div class="form-">
                                            <input v-model="data.name" type="text" placeholder="Name"
                                                class="form-control" />
                                        </div>
                                    </div>

                                </div>

                                <div class="form-outline mb-4">
                                    <input v-model="data.email" type="email" placeholder="Email" class="form-control" />
                                </div>

                                <div class="form-outline mb-4">
                                    <input v-model="data.password" type="password" placeholder="Password"
                                        class="form-control" />
                                </div>




                                <button type="submit" style="margin-left: 143px; width: 200px"
                                    class="btn btn-primary btn-block mb-4">
                                    Sign up
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script >
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

export default {
    name: 'CardRegister',

    setup() {
        const data = reactive({
            name: '',
            email: '',
            password: '',
            user_type: 'Admin'
        });

        const router = useRouter();

        const submit = async () => {
            const response = await fetch('http://127.0.0.1:8000/api/auth/register', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });


            const responseData = await response.json();
            if (response.status === 422) {
                console.error('Validation failed:', responseData.errors);
            }
            if (response.status === 500) {
                const responseData = await response.json();
                console.error('Internal Server Error:', responseData);
            }

            // console.log('Before router.push');
            await router.push('/');
            // console.log('After router.push');

            // console.log('Response Status:', response.status);
            // console.log('Response Data:', responseData);
        }


        return {
            data,
            submit
        }
    }
}
</script>

<style>
section {
    height: 100vh;
}

.background-radial-gradient {
    background-color: hsl(218, 41%, 15%);
    background-image: radial-gradient(650px circle at 0% 0%,
            hsl(218, 41%, 35%) 15%,
            hsl(218, 41%, 30%) 35%,
            hsl(218, 41%, 20%) 75%,
            hsl(218, 41%, 19%) 80%,
            transparent 100%),
        radial-gradient(1250px circle at 100% 100%,
            hsl(218, 41%, 45%) 15%,
            hsl(218, 41%, 30%) 35%,
            hsl(218, 41%, 20%) 75%,
            hsl(218, 41%, 19%) 80%,
            transparent 100%);
}

#radius-shape-1 {
    height: 220px;
    width: 220px;
    top: -60px;
    left: -130px;
    background: radial-gradient(#44006b, #ad1fff);
    overflow: hidden;
}

#radius-shape-2 {
    border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;
    bottom: -60px;
    right: -110px;
    width: 300px;
    height: 300px;
    background: radial-gradient(#44006b, #ad1fff);
    overflow: hidden;
}

.bg-glass {
    background-color: hsla(0, 0%, 100%, 0.9) !important;
    backdrop-filter: saturate(200%) blur(25px);
}
</style>

