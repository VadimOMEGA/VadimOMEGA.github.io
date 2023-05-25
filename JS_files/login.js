const noAcc = document.querySelector('.no-account');
const yesAcc = document.querySelector('.yes-account');
const flipper = document.querySelector('.flipper');

noAcc.addEventListener('click', () => {
    flipper.style.transform = 'rotateY(180deg)'
})

yesAcc.addEventListener('click', () => {
    flipper.style.transform = 'rotateY(0deg)'
})


const signUpForm = document.querySelector('#sign-up-form');

signUpForm.addEventListener('submit', () => {
    let loggedUser = {
        email : document.querySelector('#Email-back').value,
        password : document.querySelector('#password-back').value,
    }
    localStorage.setItem('user', JSON.stringify(loggedUser));
})