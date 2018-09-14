let newDiv = () => { return document.createElement('div'); };
let newI = () => { return document.createElement('i'); };
let newText = (text) => { return document.createTextNode(text); };

const main = document.querySelector('.js-main');
const sidebar = document.querySelector('.js-sidebar');
const sidebarSwitch = document.querySelector('.js-sidebar-switch');

let lessons = [
  { name: 'liczby-naturalne', title: 'Liczby Naturalne' },
  { name: 'zrodla', title: 'Źródła' }
];

let fillSidebar = () => {
  for (let i=0; i<lessons.length; i++) {
    let div = newDiv();
    div.id = lessons[i].name;
    div.classList.add('sidebar__item', 'x-ripple', 'js-sidebar-item');
    let title = newText(lessons[i].title);
    let icon = newI();
    icon.classList.add('sidebar__item-done-mark', 'fas', 'fa-check', 'js-check');
    div.appendChild(title);
    div.appendChild(icon);

    sidebar.appendChild(div);
  }
};

fillSidebar();

function resizeHandler() {

  let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  
  if (width<1000) {
    sidebar.style.display = 'none';
    main.style.marginLeft = 0;
    sidebarSwitch.style.display = 'block';
  } else {
    sidebar.style.display = 'block';
    main.style.marginLeft = '200px';
    sidebarSwitch.style.display = 'none';
  }

}

resizeHandler();

let sidebarSwitcher = () => {

  if (sidebar.style.display == 'none') {
    sidebar.style.display = 'block';
    sidebarSwitch.innerHTML = `<i class="fas fa-times"></i>`;
  } else {
    sidebar.style.display = 'none';
    sidebarSwitch.innerHTML = `<i class="fas fa-bars"></i>`;
  }

};

sidebarSwitch.addEventListener('click', function() { sidebarSwitcher(); } );

let openLesson = (clickedTab) => {
  let clickedTabId = clickedTab.id;
  document.getElementById(clickedTabId).classList.add('sidebar__item--active');
  let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');  

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      main.innerHTML = xhr.responseText;
    }
  };

  xhr.open('GET', `lessons/${clickedTabId}.html`, true);
  xhr.send();

};  

let markAsCompleted = (lesson) => {
  let el = document.getElementById(lesson);
  if (el.classList.contains('sidebar__item--done') == false) {
    el.classList.add('sidebar__item--done');
  }
};

let sidebarItemsHTML = document.getElementsByClassName('js-sidebar-item');
let lessonChecksHTML = document.getElementsByClassName('js-check');

for (let i=0; i<sidebarItemsHTML.length; i++) {
  sidebarItemsHTML[i].addEventListener('click', function() { openLesson(this); });
};

for (let i=0; i<lessonChecksHTML.length; i++) {
  lessonChecksHTML[i].addEventListener('click', function() { markAsCompleted(this.parentElement.id); });
};