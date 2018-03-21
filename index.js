import reddit from './redditapi';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

//Form Event Listener


searchForm.addEventListener('submit', e => {

    //Get search term
    const searchTerm = searchInput.value;

    //Get Sort
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;


    //Get Limit
    const searchLimit = document.getElementById('limit').value;

    //Check input
    if (searchTerm == ''){
        //show message
        showMessage('Please add a Search Term','alert-danger');
    }

    //Clear input
    searchInput.value = '';

    //SEARCH REDDIT
   reddit.search(searchTerm, searchLimit, sortBy)
       .then(results => {
           console.log(results);
         let output = '<div class="card-columns">';
         //loop through posts
         results.forEach(post => {

             //check for images
             const image = post.preview ? post.preview.images[0]
                 .source.url : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg';
           output += `
             <div class="card">
                 <img class="card-img-top" src="${image}" alt="Card image cap">
                 <div class="card-body">
                   <h5 class="card-title">${post.title}</h5>
                   <p class="card-text">${truncateString(post.selftext, 100)}</p>
                   <a href="${post.url}" target="_blank" class="btn btn-primary">Read More</a>
                   <hr>
                   <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
                   <span class="badge badge-dark">Score: ${post.score}</span>
                 </div>
            </div>
           `;
         });

         output += '</div>';
         document.getElementById('results').innerHTML = output;

   });

    e.preventDefault();
});

//Show Alert message
 function showMessage(message,className) {
     //create div
     const div = document.createElement('div');
     //add classes
     div.className = `alert ${className}`;
     //add text
     div.appendChild(document.createTextNode(message));
     //get parent
     const searchContainer = document.getElementById('search-container');
     //Get Search
     const search = document.getElementById('search');

     //Insert Message
     searchContainer.insertBefore(div, search);

     //Alert Timeout
     setTimeout(() => document.querySelector('.alert').remove(), 3000);
 }

 //Truncate or Shorten Text
function truncateString(myString, limit) {
    const shortened = myString.indexOf(' ', limit);
    if (shortened == -1) return myString;
    return myString.substring(0, shortened);
}