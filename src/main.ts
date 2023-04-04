import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import '@popperjs/core/dist/umd/popper.min.js'
import './style.css';

import router from './router';

const root = document.querySelector('#root');

if(!root)  throw new Error('Failed to load container element');
else {
    window.addEventListener('load', () => router(root, '/'));
} 