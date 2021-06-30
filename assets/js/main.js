const navMenu = document.getElementById('nav-menu'),
      toggleMenu = document.getElementById('nav-toggle'),
      closeMenu = document.getElementById('nav-close')
 
      
toggleMenu.addEventListener('click', ()=>{
          navMenu.classList.toggle('show')
          console.log('Clicked')
})
closeMenu.addEventListener('click', ()=>{
          navMenu.classList.remove('show')
})


const navLink = document.querySelectorAll('.nav__link')

function linkAction()
{
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))



const sections = document.querySelectorAll('section[id]')

window.addEventListener('scroll',scrollActive)

function scrollActive()
{
    const scrollY=windows.pageYOffset
    sections.forEach(current=>{
        const sectionHeight = current.offsetHeight
        const sectionTop =current.offsetTop -50
        sectionId= current.getAttribute('id')

        if(scrollY > sectionTop && scrollY<=sectionTop+sectionHeight){
            document.querySelector('.nav__menu a]href *='+ sectionId+']').classList.add('active')
        }
        else{
            document.querySelector('.nav__menu a]href *='+ sectionId+']').classList.remove('active')

        }
    })


}