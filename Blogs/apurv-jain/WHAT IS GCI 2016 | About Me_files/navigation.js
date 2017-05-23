(function(){var container,button,menu;container=document.getElementById('access');if(!container)
return;button=container.getElementsByClassName('menu-toggle')[0];if('undefined'===typeof button)
return;menu=container.getElementsByTagName('ul')[0];if('undefined'===typeof menu){button.style.display='none';return;}
if(-1===menu.className.indexOf('nav-menu'))
menu.className+=' nav-menu';button.onclick=function(){if(-1!==container.className.indexOf('toggled'))
container.className=container.className.replace(' toggled','');else
container.className+=' toggled';};})();