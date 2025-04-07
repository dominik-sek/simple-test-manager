import { api } from './helper';

api('/auth/logout', { method: 'POST' }).then((res) => {
  console.log(res); // good for debugging
})
