document.addEventListener('DOMContentLoaded',()=>{
  const  searchBtn = document.querySelectorAll('.searchBtn');
  const  searchBar = document.querySelector('.searchBar');
  const  searchInput = document.getElementById('searchInput');
  const  searchClose = document.getElementById('searchClose');

  for(let i =0;i<searchBtn.length;i++){
    searchBtn[i].addEventListener('click',()=>{
        searchBar.style.visibility = 'visible';
        searchBar.classList.add('open');
        this.serAttribute('aria-expanded','true');
        searchInput.focus();
    });
  }
  searchClose.addEventListener('click',()=>{
    searchBar.style.visibility = 'hidden';
    searchBar.classList.remove('open');
    this.serAttribute('aria-expanded','flase');
});
});