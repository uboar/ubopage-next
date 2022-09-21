<template>
    <div class="pt-24">
        <input type="checkbox" id="detailsModal" class="modal-toggle" />
        <label for="detailsModal" class="modal">
            <label class="modal-box max-w-6xl" for="">
                <h3 class="font-bold text-lg">{{ detailsData.name }}</h3>
                <div class="flex justify-center mt-2 transition duration-500 ease-in-out" v-if="movieLoad">
                    <div class="" v-if="detailsData.nicoId">
                        <component :is="'script'"
                            :src="`https://embed.nicovideo.jp/watch/${detailsData.nicoId}/script?w=640&h=360`">
                        </component>
                    </div>
                    <div class="" v-if="detailsData.youtubeId">
                        <iframe width="640" height="360" :src="`https://www.youtube.com/embed/${detailsData.youtubeId}`"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen loading=lazy></iframe>
                    </div>
                </div>
                <div class="flex flex-row flex-wrap mt-8">
                    <div class="badge badge-outline badge-accent mx-2" v-for="item in detailsData.tag" :key="item">{{item}}</div>
                </div>
                <div class="pt-4 whitespace-pre-line detailsDescription" v-html="markdown(detailsData.description)">
                </div>
                <div class="modal-action">
                    <label for="detailsModal" class="btn">閉じる</label>
                </div>
            </label>
        </label>
        <div class="mx-8 text-6xl border-b border-base-content text-center logo-font">SEARCH</div>
        <div class="fade flex justify-center">
            <div class="lg:basis-2/3">
                <div class="card shadow-lg bg-base-200 m-8">
                    <div class="card-body">
                        <input type="text" placeholder="検索" class="input input-bordered w-full" v-model="searchText"
                            @input="search" />
                    </div>
                </div>
                <div class="card shadow-lg card-bordered bg-base-300">
                    <div class="card-body">
                        <div class="card-title">一覧</div>
                        <table class="table">
                            <thead>
                                <tr class="logo-font">
                                    <th>NAME</th>
                                    <th>DATE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="hover" v-for="item in singlesFilteredData" :key="item.name"
                                    style="cursor: pointer" @click="details(item)">
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.date }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import singlesData from "../assets/singles.json"
import infoIcon from 'vue-material-design-icons/InformationOutline.vue'

import { marked } from 'marked';
import { nextTick } from 'vue';

let audio = new Audio();

export default {
    name: "singles",
    components: { infoIcon },
    mounted() {
        document.title = `SINGLES - UBOPAGE`;
    },
    setup() {
    },
    data() {
        return {
            singlesFilteredData: singlesData,
            descShow: false,
            movieLoad: false,
            searchText: "",
            detailsData: {
                name: "",
                description: "",
            },
        }
    },
    methods: {
        markdown(text) {
            return marked(text);
        },
        details: async function (item) {
            let modalElement = document.getElementById("detailsModal");
            this.movieLoad = false;
            audio.pause();
            this.currentPlayingTrack = 0;
            this.detailsData = item;
            modalElement.checked = true;
            modalElement.addEventListener("change", (e) => {
                if (e.target.checked == false) {
                    this.movieLoad = false;
                }
            });
            await nextTick();
            this.movieLoad = true;
        },
        search() {
            this.singlesFilteredData = singlesData.filter((elem) => {
                if (RegExp(this.searchText, "i").test(elem.name)) {
                    return true;
                } else {
                    return (elem.tag.indexOf(this.searchText) >= 0);
                }
            });
        }
    }
}
</script>

<style scoped>
.detailsDescription ::v-deep(a) {
    @apply border-b border-accent text-accent;
}
</style>