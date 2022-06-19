<template>
  <div :class="`main ${content}-page`">
    <side-panel
      :mobile="mobile"
      title="Categories"
      :open-initially="sidePanelOpenInitially"
      @side-panel-toggle="toggleSidePanel"
    >
      <template #header>
        <h2 v-if="!mobile" class="sub-heading">Categories</h2>
        <SearchInput
          :value="categoryFilter"
          placeholder="Search categories"
          @search="searchCategories"
        />
      </template>
      <template #content>
        <SearchList
          :items="filteredCategories"
          :active-i-d="id"
          no-results-text="No results found for category search."
        />
      </template>
    </side-panel>
    <main-panel v-if="category" :class="{ hidden: sidePanelOpen }">
      <header-panel>
        <h1>{{ category.name }}</h1>
        <h2>
          <NavigationTabs
            :items="[
              { name: 'Info', slug: 'info', url: `/content/${id}/info` },
              { name: 'Random', slug: 'random', url: `/content/${id}/random` },
              {
                name: 'Match',
                slug: 'match',
                url: `/content/${id}/match`,
              },
              {
                name: 'Test',
                slug: 'test',
                url: `/content/${id}/test`,
              },
            ]"
            :selected="content"
          />
        </h2>
      </header-panel>
      <div v-if="category" class="page-content">
        <DataTable v-if="content === 'info'" :rows="category.words" :columns="category.columns" />
        <RandomWordGenerator v-if="content === 'random'" :category="category" />
        <MatchGame v-if="content === 'match'" :category="category" />
        <TestGame v-if="content === 'test'" :category="category" />
      </div>
    </main-panel>
  </div>
</template>

<script src="./ContentPage.js"></script>
