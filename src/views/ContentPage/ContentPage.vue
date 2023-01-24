<template>
  <div :class="`main ${content}-page`">
    <side-panel
      v-if="!mobile"
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
        <h1>{{ mobile ? title : category.name }}</h1>
        <i v-if="mobile && !categoryMenu" class="category-open material-icons" @click="openSearch"
          >manage_search</i
        >
        <h2 v-if="mobile">{{ category.name }}</h2>
        <h2>
          <NavigationTabs v-if="!mobile && tabs" :items="tabs" :selected="content" />
        </h2>
      </header-panel>
      <div v-if="category" class="page-content">
        <DataTable v-if="content === 'info'" :rows="category.words" :columns="category.columns" />
        <RandomWordGenerator v-if="content === 'random'" :category="category" />
        <MatchGame v-if="content === 'match'" :category="category" />
        <TestGame v-if="content === 'test'" :category="category" />
        <TypingGame v-if="content === 'typing'" :category="category" />
      </div>
    </main-panel>
    <NavigationTabs v-if="mobile && tabs" :items="tabs" :selected="content" />
    <div v-if="mobile && categoryMenu" class="mobile-category-menu">
      <i class="category-close material-icons" @click="closeSearch">close</i>
      <h2 class="heading">Categories</h2>
      <SearchInput
        :value="categoryFilter"
        placeholder="Search categories"
        @search="searchCategories"
      />
      <SearchList
        :items="filteredCategories"
        :active-i-d="id"
        no-results-text="No results found for category search."
      />
    </div>
  </div>
</template>

<script src="./ContentPage.js"></script>
