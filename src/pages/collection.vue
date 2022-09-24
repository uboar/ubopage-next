<template>
    <div class="pt-24">
        <collectionDetailVue :detailsData="detailsData" :movieLoad="movieLoad"></collectionDetailVue>
        <div class="mx-8 text-6xl border-b border-base-content text-center logo-font">COLLECTION</div>
        <div class="fade flex justify-center">
            <div class="lg:basis-2/3">
                <div class="card shadow-lg bg-base-200 m-8">
                    <div class="card-body">
                        <div class="flex">
                            <input type="text" placeholder="検索(作品名・タグ名)" class="input input-bordered w-full"
                                v-model="searchText" @input="search" />
                            <div class="btn mx-2 btn-circle btn-outline" :class="searchText === '' ? 'btn-disabled' : ''" @click="searchText = ''; search();">
                            <window-close-icon></window-close-icon></div>
                        </div>
                        <div class="divide-y"></div>
                        <div class="flex flex-row flex-wrap mt-8">
                            <div class="btn btn-accent btn-outline mx-2 btn-xs" v-for="item in searchTags" :key="item"
                                @click="searchText = item; search();">
                                {{item}}</div>
                        </div>
                    </div>
                </div>
                <div class="card shadow-lg card-bordered bg-base-300">
                    <div class="card-body">
                        <div class="card-title">一覧 / 検索結果</div>
                        <table class="table">
                            <thead>
                                <tr class="logo-font">
                                    <th>NAME</th>
                                    <th>DATE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="hover" v-for="item in collectionFilteredData" :key="item.name"
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
import collectionData from "../assets/collection.json"
import infoIcon from 'vue-material-design-icons/InformationOutline.vue'
import windowCloseIcon from 'vue-material-design-icons/windowClose.vue'
import collectionDetailVue from "../components/collectionDetail.vue";

import { marked } from 'marked';
import { nextTick } from 'vue';
import { useRoute } from 'vue-router';


export default {
    name: "collection",
    components: { infoIcon, windowCloseIcon, collectionDetailVue },
    mounted() {
        document.title = `COLLECTION - UBOPAGE`;
        const route = useRoute();
        if (route.query.id) {
            const index = collectionData.findIndex((elem) => {
                return elem.queryId === route.query.id
            })
            if (index >= 0) {
                document.head.querySelector('meta[property="og:title"]').setAttribute("content", collectionData[index].name + " / UBOPAGE");
                this.details(collectionData[index]);
            }
        }
    },
    setup() {
    },
    data() {
        return {
            collectionFilteredData: collectionData,
            movieLoad: false,
            searchText: "",
            detailsData: {
                name: "",
                description: "",
            },
            searchTags: [
                "音楽",
                "ニコニコメドレー",
                "NEUTRINO",
                "Remix",
                "合作",
                "オリジナル曲",
            ],
        }
    },
    methods: {
        markdown(text) {
            return marked(text);
        },
        details: async function (item) {
            let modalElement = document.getElementById("detailsModal");
            this.movieLoad = false;
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
            this.collectionFilteredData = collectionData.filter((elem) => {
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