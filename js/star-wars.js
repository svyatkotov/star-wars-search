let searchInput = document.querySelector('.person_search');
let searchSelect = document.querySelector('#search_select');
let searchButton = document.querySelector('.button');
let resultList = document.querySelector('.search_result');
let noResultWarning = document.querySelector('.no-result');
let itemData = document.querySelector('.item_data');
let api = 'https://swapi.dev/api/';

searchButton.addEventListener('click', function() {
  resultList.innerHTML = '';

  if (!searchInput.value) return;

  let selectedType = searchSelect.children[searchSelect.selectedIndex].value;
  let url = api + selectedType + '/?search=' + searchInput.value;
  
  fetch(url)
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.count === 0) {
        noResultWarning.style.display = 'block';
        setTimeout(function() {
          noResultWarning.style.display = 'none';
        }, 2000);
      }

      responseJson.results.forEach(result => {
        let listItem = document.createElement('li');
        listItem.classList.add('search_result_item');
        listItem.textContent = result.name;
        resultList.append(listItem);
        listItem.addEventListener('click', function() {
          itemData.children[0].textContent = `Имя: ${result.name}`;
          itemData.children[1].textContent = (selectedType === 'people') ? `Рост: ${result.height}` : 
            (selectedType === 'starships') ? `Модель: ${result.model}` : 
            `Климат: ${result.climate}`;
          itemData.children[2].textContent = (selectedType === 'people') ? `Вес: ${result.mass}` : 
            (selectedType === 'starships') ? `Длина: ${result.length}` : 
            `Диаметр: ${result.diameter}`;
          itemData.children[3].textContent = (selectedType === 'people') ? `Год рождения: ${result.birth_year}` : 
            (selectedType === 'starships') ? `Количество пассажиров: ${result.passengers}` : 
            `Население: ${result.population}`;
          itemData.children[4].textContent = `В скольки фильмах появлялся: ${result.films.length}`;
        });
      });
    });
});