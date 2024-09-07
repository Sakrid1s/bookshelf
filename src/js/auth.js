import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  fetchSignInMethodsForEmail,
  validatePassword,
} from 'firebase/auth';
import { getDatabase, ref, get, set } from 'firebase/database';
import iziToast from 'izitoast';
import icon from '../img/icons.svg';
import { toggleAuthen } from './auth-events';
import { checkIsThereElementOnPage } from './shopping';

const headerSubmitCont = document.querySelector('.authentication-buttons');
const headerSubmitContMob = document.querySelector(
  '.authentication-buttons-mob'
);

const firebaseConfig = {
  apiKey: 'AIzaSyCDfVpOwFVOuLWbKMbR5r6YuveQNAnQ-ag',
  authDomain: 'test-auth-4b07d.firebaseapp.com',
  databaseURL:
    'https://test-auth-4b07d-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'test-auth-4b07d',
  storageBucket: 'test-auth-4b07d.appspot.com',
  messagingSenderId: '528197855134',
  appId: '1:528197855134:web:7923cf976828bc43fe188f',
};
initializeApp(firebaseConfig);

const auth = getAuth();
function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      unsubscribe();
      if (user) {
        resolve(user);
      } else {
        resolve('');
      }
    });
  });
}

const signUpForm = document.querySelector('.authentication-form-signup');
if (signUpForm) {
  signUpForm.addEventListener('submit', signUpEvent);
}

async function signUpEvent(e) {
  e.preventDefault();
  if (!signUpForm.classList.contains('disable')) {
    const name = signUpForm.querySelector('#name-up').value;
    const email = signUpForm.querySelector('#email-up').value;
    const password = signUpForm.querySelector('#password-up').value;
    disableForm(signUpForm);
    emptyError(signUpForm);
    await signUp(signUpForm, name, email, password);
    removeDisableForm(signUpForm);
  }
}

async function signUp(form, name, email, password) {
  const signInMethods = await fetchSignInMethodsForEmail(auth, email);
  const validPass = await validatePassword(auth, password);
  if (signInMethods.length === 0 && validPass.isValid) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      await addBooksJson();
      await authState();
      sucessMassage('Registration');
      toggleAuthen(false);
    } catch (error) {
      showError(form, error.code);
    }
  } else {
    let errorT = 'auth/weak-password';
    if (signInMethods.length !== 0) {
      errorT = 'auth/email-already-in-use';
    }
    showError(form, errorT);
  }
}

const signInForm = document.querySelector('.authentication-form-signin');
if (signInForm) {
  signInForm.addEventListener('submit', signInEvent);
}

async function signInEvent(e) {
  e.preventDefault();
  if (!signInForm.classList.contains('disable')) {
    const email = signInForm.querySelector('#email-in').value;
    const password = signInForm.querySelector('#password-in').value;
    disableForm(signInForm);
    emptyError(signInForm);
    await signIn(signInForm, email, password);
    removeDisableForm(signInForm);
  }
}

async function signIn(form, email, password) {
  const signInMethods = await fetchSignInMethodsForEmail(auth, email);
  if (signInMethods.length > 0) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      sucessMassage('Authorization');
      toggleAuthen(false);
    } catch (error) {
      console.log(error.code);
      showError(form, error.code);
    }
  } else {
    const errorT = 'auth/user-not-found';
    showError(form, errorT);
  }
}

headerSubmitCont.addEventListener('click', logOutFunc);
headerSubmitContMob.addEventListener('click', logOutFunc);

function logOutFunc(e) {
  const targetIs = e.target.classList.contains('log-out');
  if (targetIs) {
    auth
      .signOut()
      .then(function () {
        sucessMassage('Log out');
      })
      .catch(function (error) {
        errorMassage('Unable to log out');
      });
  }
}

async function authState() {
  try {
    onAuthStateChanged(auth, user => {
      renderAuthHeader(user);
      checkIsThereElementOnPage();
      booksCount();
    });
  } catch (error) {
    console.error('Check error:', error.code);
  }
}

function renderAuthHeader(user) {
  const authContainer = document.querySelector('.authentication-buttons');
  const authContainerMob = document.querySelector(
    '.authentication-buttons-mob'
  );
  if (!user) {
    const noneAuthState = `<button type="button" class="header-btn-submit">Sing up
    <svg width="20" height="20" class="header-sing-svg">
      <use href="${icon}#icon-header-vector-log-left"></use>
    </svg>
  </button>`;
    authContainer.innerHTML = noneAuthState;
    authContainerMob.innerHTML = noneAuthState;
  } else {
    const name = user.displayName;
    const AuthState = `<div class="authorized">
    <button type="button" class="authorized-btn">
      <div class="authorized-data">
        <div class="authorized-ava-wrap">
          <svg width="19" height="19">
          <use href="${icon}#icon-header-user"></use>
        </svg>
        </div>
        <p class="authorized-name">${name}</p>
      </div>
      <div class="authorized-vector-wrap">
        <svg width="23" height="26" class="authorized-vector">
          <use href="${icon}#icon-header-vector-down"></use>
        </svg>
      </div>
    </button>
    <button type="button" class="log-out">
      Log out
      <svg width="20" height="20" class="header-sing-svg">
        <use href="${icon}#icon-header-vector-log-left"></use>
      </svg>
    </button>
  </div>`;
    authContainer.innerHTML = AuthState;
    authContainerMob.innerHTML = AuthState;
  }
}
authState();

function disableForm(form) {
  form.classList.add('disable');
}

function removeDisableForm(form) {
  form.classList.remove('disable');
}

function showError(form, errorCode) {
  let errorText = 'An unknown error has occurred. Please try again.';
  const errorCont = form.querySelector('.authentication-errorcont');
  if (errorCode === 'auth/email-already-in-use') {
    errorText = 'A user with this email address already exists.';
  }
  if (errorCode === 'auth/invalid-credential') {
    errorText = 'Incorrect login or password';
  }
  if (errorCode === 'auth/weak-password') {
    errorText = 'Your password is too weak';
  }
  if (errorCode === 'auth/user-not-found') {
    errorText = 'User with this email is not found';
  }
  if (errorCode === 'auth/wrong-password') {
    errorText = 'Your password is wrong';
  }
  errorCont.innerHTML = `<p class="auth-error">${errorText}</p>`;
}

function emptyError(form) {
  const errorCont = form.querySelector('.authentication-errorcont');
  errorCont.innerHTML = '';
}

function sucessMassage(type) {
  iziToast.success({
    message: `${type} is successful`,
    position: 'bottomRight',
    icon: null,
  });
}

function errorMassage(text) {
  iziToast.error({
    message: text,
    position: 'bottomRight',
    icon: null,
  });
}

const database = getDatabase();
function writeBooksData(userId, dataJson) {
  set(ref(database, 'users/' + userId), {
    shippinglist: dataJson,
  });
}

async function getBooksData(userId) {
  const shippingListRef = ref(database, 'users/' + userId + '/shippinglist');
  try {
    const snapshot = await get(shippingListRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting data:', error);
    return null;
  }
}

export async function addBooksJson(shoppingList) {
  if (!shoppingList) {
    shoppingList = localStorage.getItem('shoppinglist') || '';
  }
  booksCount(shoppingList);
  const user = await getCurrentUser()
    .then(user => {
      return user;
    })
    .catch(error => {
      return '';
    });
  if (!user) {
    localStorage.setItem('shoppinglist', shoppingList);
  } else {
    const userId = user.uid;
    if (shoppingList) {
      writeBooksData(userId, shoppingList);
    }
  }
}

export const getBooksJson = async () => {
  const user = await getCurrentUser()
    .then(user => {
      return user;
    })
    .catch(error => {
      return '';
    });
  if (!user) {
    return localStorage.getItem('shoppinglist');
  } else {
    const userId = user.uid;
    return getBooksData(userId);
  }
};

async function booksCount(books) {
  if (!books) {
    books = await getBooksJson()
      .then(user => {
        return user;
      })
      .catch(error => {
        return '';
      });
  }
  const booksParsed = JSON.parse(books);
  const headerShip = document.querySelector('.header-shopping span');
  const headerShipModal = document.querySelector('.header-shopping-modal span');
  if (booksParsed && booksParsed.length > 0) {
    headerShip.innerHTML = `<span>${booksParsed.length}</span>`;
    headerShipModal.innerHTML = `<span>${booksParsed.length}</span>`;
  } else {
    headerShip.innerHTML = '';
    headerShipModal.innerHTML = '';
  }
}
