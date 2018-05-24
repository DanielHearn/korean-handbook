const menuButton = document.querySelector(".button--overlay")
menuButton.addEventListener('click', overlay)

function overlay () {
  document.querySelector(".overlay").classList.toggle("active");
  menuButton.classList.toggle("active");
  document.querySelector("body").classList.toggle("noscroll");
}

const pageSearch = document.querySelector('#page__search');
pageSearch.addEventListener('input', searchPage)

function searchPage() {
  let numOfResults = 0;
  const searchText = pageSearch.value.toLowerCase();
  const listContainer = document.querySelector('.list')
  const dataRows = listContainer.querySelectorAll('.list__row')
  for (row in dataRows) {
    const rowElement = dataRows[row]
    if (rowElement.dataset != null) {
      const key1 = rowElement.dataset.key1.toLowerCase();
      const key2 = rowElement.dataset.key2.toLowerCase();
      const tags = [key1, key2]
      if("key3" in rowElement.dataset) {
        const key3 = rowElement.dataset.key3.toLowerCase();
        tags[2] = key3
      }
      if (searchText.length > 0) {
        if (search(tags, searchText) == true) {
          numOfResults ++;
          rowElement.style.display = 'grid';
        } else {
          rowElement.style.display = 'none';
        }
      } else {
        rowElement.style.display = 'grid';
      }
    }
  }
  if (searchText.length > 0) {
    showResultsCounter(numOfResults);
  } else {
    hideResultsCounter();
  }
}

function showResultsCounter(numOfResults) {
  const resultsCount = document.querySelector('.resultsCounter');
  resultsCount.innerHTML = numOfResults + ' results found';
  resultsCount.style.display = 'block';
}

function hideResultsCounter() {
  const resultsCount = document.querySelector('.resultsCounter');
  resultsCount.style.display = 'none';
}

function search(tags, searchText) {
    for (tag in tags) {
      if (tags[tag].includes(searchText)) {
        return true;
      }
    }
}
