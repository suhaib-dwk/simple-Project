<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Add Student</h4>
            </div>
            <div class="card-body">
                <!-- <ul class="alert alert-warning" v-if="Object.keys(errorList) > 0">
                    <li class="mb-0 ms-3" v-for="(error, index) in errorList" :key="index">
                        {{ errorList[0] }}
                    </li>
                </ul> -->
                <div class="mb-3">
                    <label for="name">Name</label>
                    <input v-model="form.name" type="text" class="form-control" id="name" />
                    <div v-if="this.errors && errors.name">{{ errors.name[0] }}</div>
                </div>
                <div class="mb-3">
                    <label for="age">Age</label>
                    <input v-model.number="form.age" type="number" class="form-control" id="age" />
                    <div v-if="this.errors && errors.age">{{ errors.age[0] }}</div>
                </div>
                <div class="mb-3">
                    <label for="department">Department</label>
                    <input v-model="form.department" type="text" class="form-control" id="department" />
                    <div v-if="this.errors && errors.department">{{ errors.department[0] }}</div>
                </div>
                <div class="mb-3">
                    <label for="dateOfJoining">Date of Joining</label>
                    <input v-model="form.date_of_join" type="date" class="form-control" id="date_of_join" />
                    <div v-if="this.errors && errors.date_of_join">{{ errors.date_of_join[0] }}</div>
                </div>

                <div class="mb-3">
                    <label for="age">Salary</label>
                    <input v-model.number="form.salary" type="number" step="any" class="form-control" id="salary" />
                    <div v-if="this.errors && errors.salary">{{ errors.salary[0] }}</div>
                </div>
                <div class="mb-3">
                    <label for="gender">Gender</label>
                    <select v-model="form.gender" class="form-control" id="gender">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <div v-if="this.errors && errors.gender">{{ errors.gender[0] }}</div>
                </div>
                <div class="mb-3">
                    <button type="button" class="btn btn-primary" @click="updateStudent">Update</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    name: "TeacherEdit",
    data() {
        return {
            form: {
                name: "",
                age: 0,
                department: "",
                gender: "Male",
                salary: 0,
                date_of_join: "",
            },
            errors: null,
            teacherId: ''
        }
    },
    mounted() {
        this.teacherId = this.$route.params.id;
        console.log(this.teacherId)
        this.getTeacherEdit(this.$route.params.id);
    },  
    methods: {

        getTeacherEdit(teacherId){
            axios.get(`teachers/get/${teacherId}`).then(res => {
                console.log(res.data);

                this.form = res.data;
            }).catch(function (error) {
                if(error.response){
                    if(error.response.status === 404){
                        alert("Not found the teacher id")
                    }
                }
            })
        },
        
        updateStudent () {
            const self = this;
            axios.put(`teachers/${this.teacherId}/update`, this.form).then(res => {
                console.log(res.data)
                alert(res.data.message);

                
            }).catch(function (error) {
                if (error.response) {
                    console.log(error.response);

                    if (error.response.status == 422) {
                        self.errors = error.response.data.errors;
                    }
                } else if (error.request) {

                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            })
            console.log(this.form);
        }
    },
    
};
</script>
  