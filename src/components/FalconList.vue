<template>
    <v-container grid-list-lg>
        <p v-if="falcon">get search: {{falcon}}</p>
        <p v-if="search">ships like {{search}}:{{resultLen}}</p>
        <v-layout wrap row>
            <v-flex xs12 sm12 md8 lg10 offset-md2>
                <v-container fluid>
                    <v-layout row>
                        <v-flex xs12 sm12 md6 lg7>
                            <v-text-field v-model="search" label="Поиск по имени"></v-text-field>
                        </v-flex>
                        <v-btn class="clear-btn" flat @click="clear">Clear Search</v-btn>
                    </v-layout>
                </v-container>
            </v-flex>


            <v-flex xs12 sm12 md8 offset-md2 id="card">
                <!--<v-card v-if="!bigSearch" dark v-for="ship in fList" :key="calculateId(ship.url)" class="mb-4">
                    <v-container fill-height fluid>
                        <v-layout fill-height>
                            <v-flex>
                                <h2>{{ship.name}}</h2>
                                <v-card-text>
                                    <p>model: {{ship.model}}</p>
                                    <p>manufacturer: {{ship.manufacturer}}</p>
                                    <p>hyperdrive_rating: {{ship.hyperdrive_rating}}</p>
                                </v-card-text>
                                <v-divider></v-divider>
                                <v-btn class="open-btn" light :to="'/ships/'+calculateId(ship.url)">Open Details</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>-->
                <v-card v-if="true" dark v-for="ship in filteredbigList" :key="calculateId(ship.url)" class="mb-4">
                    <v-container fill-height fluid>
                        <v-layout fill-height>
                            <v-flex>
                                <h2>{{ship.name}}</h2>
                                <v-card-text>
                                    <p>model: {{ship.model}}</p>
                                    <p>manufacturer: {{ship.manufacturer}}</p>
                                    <p>hyperdrive_rating: {{ship.hyperdrive_rating}}</p>
                                </v-card-text>
                                <v-divider></v-divider>
                                <v-btn class="open-btn" light :to="'/ships/'+calculateId(ship.url)">Open Details</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
            <v-flex xs12 sm12 md8 offset-md2>
                <v-btn dark v-if="prevListLink!=null && !bigSearch" @click="loadNewPortion(prevListLink)">PREV PAGE</v-btn>
                <v-btn dark v-if="nextListLink!=null && !bigSearch" @click="loadNewPortion(nextListLink)">NEXT PAGE</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "FalconList",
        data(){
            return{
                search:null,
                fList : [],
                bigList:[],
                nextListLink:null,
                prevListLink:null,
                querySearch:this.falcon,
                pageId:1,
                resultLen:0,
            }
        },
        props:{
          'falcon':{
              type:String,
              default:null
          }
        },
        methods:{
            calculateId:function(url){
                let id = url.substring(31,url.length-1);
                return id;
            },
            loadNewPortion(url){
                fetch(url).then(res => res.json())
                    .then(json => {
                        this.nextListLink = json.next;
                        this.prevListLink = json.previous;
                        this.fList = json.results;
                    })
                    .catch(err => console.warn(err));
            },
            clear(){
                this.search = null;
                this.querySearch = null;
                this.$router.push({name:'falcons'});
            },
            loadAllShips(){
                for (let i = 1; i<5; i++){
                    fetch(`https://swapi.co/api/starships/?page=${i}`).then(res => res.json())
                        .then(json => {
                            for (let j = 0; j<json.results.length; j++){
                                this.bigList.push(json.results[j]);
                            }
                        })
                        .catch(err => console.warn(err));
                }
            }
        },
        computed:{
            filteredShips(){
                let shipsList = this.fList;

                if (this.querySearch && !this.search){
                    shipsList = this.bigList.filter(n => n.name.toLowerCase().indexOf(this.querySearch.toLowerCase()) === 0);
                    this.resultLen = shipsList.length;
                }
                else if (this.search){
                    shipsList = this.bigList.filter(n => n.name.toLowerCase().indexOf(this.search.toLowerCase()) === 0);
                    this.resultLen = shipsList.length;
                }
                else if (!this.search && !this.querySearch){
                    shipsList = this.fList;
                    this.resultLen = null;
                }
                return shipsList;
            },
            filteredbigList(){
                let shipsList = this.bigList;
                if (this.querySearch && !this.search){
                    shipsList = shipsList.filter(n => n.name.toLowerCase().indexOf(this.querySearch.toLowerCase()) === 0);
                    this.resultLen = shipsList.length;
                }
                else if (this.search){
                    shipsList = shipsList.filter(n => n.name.toLowerCase().indexOf(this.search.toLowerCase()) === 0);
                    this.resultLen = shipsList.length;
                }
                else if (!this.search && !this.querySearch){
                    shipsList = this.fList;
                    this.resultLen = null;
                }
                return shipsList;
            },
            bigSearch(){
                if (this.search || this.querySearch){
                    return true;
                } else return false;
            }
        },
        created() {
            fetch('https://swapi.co/api/starships/').then(res => res.json())
                .then(json => {
                    this.nextListLink = json.next;
                    this.prevListLink = json.previous;
                    this.fList = json.results;
                })
                .catch(err => console.warn(err));

            this.loadAllShips()
        }
    }
</script>

<style scoped>
    #card{
        cursor: pointer;
    }
    h2{
        padding-bottom: 2%;
    }
    .open-btn{
        margin-top: 3%;
    }
    .clear-btn{
        margin-top: 22px;
    }
</style>
