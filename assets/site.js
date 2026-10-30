/* Chat Legal — menus, header and fade-ins (no libraries) */
(function(){
  var header=document.querySelector('.site-header'),toggle=document.querySelector('.nav-toggle'),nav=document.getElementById('nav');
  var menus=[].slice.call(document.querySelectorAll('.nav details'));
  function sync(){header.classList.toggle('mega-open',menus.some(function(d){return d.open}))}
  function closeMenus(except){menus.forEach(function(d){if(d!==except)d.open=false});sync()}
  function setNav(open){nav.classList.toggle('open',open);toggle.setAttribute('aria-expanded',open?'true':'false');header.classList.toggle('menu-open',open)}
  if(toggle&&nav)toggle.addEventListener('click',function(){setNav(!nav.classList.contains('open'))});
  menus.forEach(function(d){d.addEventListener('toggle',function(){if(d.open)closeMenus(d);else sync()})});
  document.addEventListener('click',function(e){if(!e.target.closest('.nav details'))closeMenus()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeMenus();if(nav&&nav.classList.contains('open')){setNav(false);toggle.focus()}}});
  if(document.body.classList.contains('home')){
    var solid=function(){header.classList.toggle('solid',window.scrollY>40)};solid();
    window.addEventListener('scroll',solid,{passive:true});
  }
  var top=document.querySelector('.to-top');
  if(top){
    var show=function(){top.classList.toggle('show',window.scrollY>600)};show();
    window.addEventListener('scroll',show,{passive:true});
    top.addEventListener('click',function(e){e.preventDefault();window.scrollTo({top:0,behavior:'smooth'});var sk=document.querySelector('.skip');if(sk)sk.focus({preventScroll:true})});
  }
  function openFromHash(){var id=location.hash.slice(1),el=id&&document.getElementById(id);
    if(el&&el.tagName==='DETAILS'&&!el.closest('.nav')){el.open=true;setTimeout(function(){el.scrollIntoView()},0)}}
  openFromHash();window.addEventListener('hashchange',openFromHash);
  [].forEach.call(document.querySelectorAll('[data-tabs]'),function(box){
    var tabs=[].slice.call(box.querySelectorAll('[role="tab"]'));
    var panels=tabs.map(function(t){return document.getElementById(t.getAttribute('aria-controls'))});
    function select(i,remember){tabs.forEach(function(t,k){var on=k===i;t.setAttribute('aria-selected',on?'true':'false');t.tabIndex=on?0:-1;panels[k].hidden=!on});
      if(remember&&history.replaceState)history.replaceState(null,'','#'+tabs[i].getAttribute('data-tab'))}
    tabs.forEach(function(t,i){
      t.addEventListener('click',function(){select(i,true)});
      t.addEventListener('keydown',function(e){var n=e.key==='ArrowRight'?(i+1)%tabs.length:e.key==='ArrowLeft'?(i-1+tabs.length)%tabs.length:-1;
        if(n>-1){e.preventDefault();select(n,true);tabs[n].focus()}});
    });
    function fromHash(){var id=location.hash.slice(1),k=tabs.map(function(t){return t.getAttribute('data-tab')}).indexOf(id);select(k<0?0:k,false)}
    fromHash();window.addEventListener('hashchange',fromHash);
  });
  if(navigator.pdfViewerEnabled===false)document.documentElement.classList.add('no-pdf');
  var still=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!still&&'IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
    [].forEach.call(document.querySelectorAll('.split-head,.feature-item,.svc,.profile,.rel-list li'),function(el){el.classList.add('reveal');io.observe(el)});
  }
})();
