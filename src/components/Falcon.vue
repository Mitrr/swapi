<template>
    <v-container>
        <h1>{{data.name}}</h1>
        <v-flex sm12 md10 lg10 offset-md1>
            <v-card dark id="card">
                <v-card-text v-for="(val,key,i) in data" :key="i">
                    <div v-if="typeof val!='object'">{{key}} : <v-chip color="orange">{{val}}</v-chip></div>
                    <div v-else-if="typeof val=='object'">
                        {{key}}:
                        <div v-if="val.length>0">
                            <v-btn :id="key" color="orange" flat @click="loadMore(key)">Show {{key}}</v-btn>
                            <div v-if="key==='films'">
                                <ul class="arr" v-if="films.length>0">
                                    <li v-for="(item,j) in films" :key="j">{{item}}</li>
                                </ul>
                            </div>
                            <div v-else-if="key==='pilots'">
                                <ul class="arr" v-if="pilots.length>0">
                                    <li v-for="(item,j) in pilots" :key="j">{{item}}</li>
                                </ul>
                            </div>
                        </div>
                        <div v-else>no {{key}}</div>
                    </div>
                    <v-divider></v-divider>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-container>
</template>

<script>
    export default {
        name: "Falcon",
        data(){
            return{
                Fid:this.$route.params.id,
                data:null,
                films:[],
                pilots:[],
                showBtn:true
            }
        },
        props:{
            'id':{
                type:String,
                required:true
            }
        },
        methods:{
            loadMore(key){
                let arr = this.data[key];

                for (let i = 0; i < arr.length ; i++) {
                    if (key === 'films'){
                        fetch(arr[i]).then(res => res.json())
                            .then(json => {
                                this.films.push(json.title);
                            })
                            .catch(err => console.warn(err));
                    }
                    else if (key === 'pilots'){
                        fetch(arr[i]).then(res => res.json())
                            .then(json => {
                                this.pilots.push(json.name);
                            })
                            .catch(err => console.warn(err));
                    }
                }
                document.getElementById(key).style.display = 'none';
            }
        },
        created() {
            fetch(`https://swapi.co/api/starships/${this.Fid}`).then(res => res.json())
                .then(json => {
                    this.data = json;
                })
                .catch(err => console.warn(err));
        }
    }
</script>

<style scoped>
    #card{
        text-align: left;
        padding: 2%;
    }
    .arr{
        padding-left: 5%;
    }
</style>
