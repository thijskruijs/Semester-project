//Fetching all listings

let data;

async function getData() {
    const apiUrl = 'https://api.noroff.dev/api/v1/auction/listings';
    const response = await fetch(apiUrl);
    data = await response.json();
  
    const gridContent = data.map(item => {
      return `
      <div class="flex flex-col w-1/2 mx-auto border border-black">
        <img src="${item.media[0]}" style="width: 252px; height: 252px;" />
        <div class="p-4 text-center">
          <h1 class="text-gray-700 font-bold underline mb-2">${item.title}</h1>
          <h3 class="text-gray-700 font-bold mb-2">${item.description}</h3>
          <div class="text-gray-700 mb-2">
            <p class="mb-2">Tags: ${item.tags.join(', ')}</p>
            <p class="mb-2">Created: ${item.created}</p>
            <p class="mb-2">Updated: ${item.updated}</p>
            <p class="mb-2">Ends at: ${item.endsAt}</p>
            <p class="mb-2">Number of bids: ${item._count.bids}</p>
          </div>
        </div>
      </div>
      `;
    });
  
    document.querySelector('.grid').innerHTML = gridContent;
  };
  
  
  getData();

  const searchInput = document.querySelector('#search');

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value;
  const filteredData = data.filter(item => item.title.includes(searchTerm));
  const gridContent = filteredData.map(item => {
    return `
    <div class="flex flex-col w-1/2 mx-auto border border-black">
      <img src="${item.media[0]}" style="width: 252px; height: 252px;" />
      <div class="p-4 text-center">
        <h1 class="text-gray-700 font-bold underline mb-2">${item.title}</h1>
        <h3 class="text-gray-700 font-bold mb-2">${item.description}</h3>
        <div class="text-gray-700 mb-2">
          <p class="mb-2">Tags: ${item.tags.join(', ')}</p>
          <p class="mb-2">Created: ${item.created}</p>
          <p class="mb-2">Updated: ${item.updated}</p>
          <p class="mb-2">Ends at: ${item.endsAt}</p>
          <p class="mb-2">Number of bids: ${item._count.bids}</p>
        </div>
      </div>
    </div>
    `;
  });
  document.querySelector('.grid').innerHTML = gridContent;
});



