<template>
    
    <div class="container ">
        
        <div class="card">
            <div class="card-header">
                <h4>
                    Teachers
                    <RouterLink to="/teacher/create" class="btn btn-primary float-end">
                        Add Teacher
                    </RouterLink>
                </h4>
            </div>
            <div class="card-body">

                <table class="table">   
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Department</th>
                            <th>Date_of_Join</th>
                            <th>Salary</th>
                            <th>gender</th>
                            <th>Deleted_at</th>
                            <th>Created_at</th>
                            <th>Updated_at</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="this.teachers.length > 0">
                        <tr v-for="(teacher, index) in this.teachers" :key="index">
                            <td>{{ teacher.id }}</td>
                            <td>{{ teacher.name }}</td>
                            <td>{{ teacher.age }}</td>
                            <td>{{ teacher.department }}</td>
                            <td>{{ teacher.date_of_join }}</td>
                            <td>{{ teacher.salary }}</td>
                            <td>{{ teacher.gender }}</td>
                            <td>{{ teacher.deleted_at }}</td>
                            <td>{{ teacher.created_at }}</td>
                            <td>{{ teacher.updated_at }}</td>
                            <td>
                                <RouterLink :to="{path: '/teacher/'+ teacher.id +'/edit'}" class="btn btn-success">
                                    Edit
                                </RouterLink>
                                <button type="button" @click="deleteTeacher(teacher.id)" class="btn btn-danger">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="7">
                                <div class="spinner-border" role="status">
                                    <span class="sr-only"></span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useStore } from 'vuex';
import NavAdmin from '../components/NavAdmin.vue';
export default {
    name: 'CRUDTeacher',
    components: {
        NavAdmin
    },
    data() {
        return {
            teachers: [],
            
        }
    },
    setup() {
        const store = useStore();
        store.dispatch('setRoles', 'Admin'); 
    },

    mounted() {
        this.getTeachers();
        
    },

    methods: {
        getTeachers() {
            setTimeout(() => {
                axios.get('teachers').then(res => {
                    this.teachers = res.data.data;
                    // console.log(this.teachers);
                })
            }, 2000)

        },

        deleteTeacher(teacherId) {
            if (confirm("Are you sure , you want to delete this data?")) {
                axios.delete(`teachers/${teacherId}/delete`).then(res => {
                    alert("Student Deleted Successfully");
                    this.getTeachers();
                }).catch(function (error){
                    if(error.response.status == 404) {
                        console.log(error.status);
                    }
                })
            }
        }
    }

}
</script>

