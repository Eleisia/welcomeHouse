<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="mb-1">
      <b-col class="text-right">
        <b-button variant="outline-primary" @click="moveWrite">글쓰기</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-row>
          <b-col sm="5" md="6" class="my-1">
            <b-form-group
              label="Per page"
              label-for="per-page-select"
              label-cols-sm="6"
              label-cols-md="4"
              label-cols-lg="3"
              label-align-sm="right"
              label-size="sm"
              class="mb-0">
              <b-form-select
                id="per-page-select"
                v-model="perPage"
                :options="pageOptions"
                size="sm"></b-form-select>
            </b-form-group>
          </b-col>
          <b-col sm="7" md="6" class="my-1">
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              align="fill"
              size="sm"
              class="my-0"></b-pagination>
          </b-col>
          <b-col lg="6" class="my-1">
            <b-form-group
              label="Filter"
              label-for="filter-input"
              label-cols-sm="3"
              label-align-sm="right"
              label-size="sm"
              class="mb-0">
              <b-input-group size="sm">
                <b-form-input
                  id="filter-input"
                  v-model="filter"
                  type="search"
                  placeholder="Type to Search"></b-form-input>

                <b-input-group-append>
                  <b-button :disabled="!filter" @click="filter = ''"
                    >Clear</b-button
                  >
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-table
          :filter="filter"
          striped
          hover
          :items="articles"
          :fields="fields"
          :per-page="perPage"
          :current-page="currentPage"
          @row-clicked="viewArticle">
          <template #cell(subject)="data">
            <router-link
              :to="{
                name: 'boardview',
                params: { articleno: data.item.articleno },
              }">
              {{ data.item.subject }}
            </router-link>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "BoardList",
  data() {
    return {
      fields: [
        {
          key: "articleno",
          label: "글번호",
          tdClass: "tdClass",
          sortable: true,
        },
        { key: "subject", label: "제목", tdClass: "tdSubject", sortable: true },
        { key: "userid", label: "작성자", tdClass: "tdClass", sortable: true },
        { key: "regtime", label: "작성일", tdClass: "tdClass", sortable: true },
        { key: "hit", label: "조회수", tdClass: "tdClass", sortable: true },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "한 번에 보기" }],
      filter: null,
    };
  },
  methods: {
    ...mapActions(["getArticles"]),
    moveWrite() {
      this.$router.push({ name: "boardwrite" });
    },
    viewArticle(article) {
      this.$router.push({
        name: "boardview",
        params: { articleno: article.articleno },
      });
    },
  },
  created() {
    this.getArticles();
    this.totalRows = this.articles.length;
  },
  computed: {
    ...mapGetters(["articles"]),
  },
};
</script>
