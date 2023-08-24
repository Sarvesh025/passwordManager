const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const close = document.querySelector('.cross');
const loginBtn = document.querySelector('.loginBtn');
const logoutBtn = document.querySelector('.logoutBtn');

registerLink.addEventListener('click', ()=>{
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=>{
    wrapper.classList.remove('active');
});

loginBtn.addEventListener('click', ()=>{
    wrapper.classList.add('active-login');
});

close.addEventListener('click', ()=>{
    wrapper.classList.remove('active-login');
});