
// const Interface = 'http://share.cortexlabs.ai:8081';
const Interface = '/ai';
let myHeaders = new Headers({
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'text/plain'
});

export const API = {
  getuserInfo: (address) => {
    return new Promise(function  (resolve, reject) {
      fetch(`/ai`, {
      // fetch(`${Interface}/user/${address}`, {
        method: 'GET',
      })
      .then(res => {
        return res.json()
      })
      .then(res => {
        resolve('0x0b18c352e7fe19efea86a7e545fce0d30951af6b')
      })
      .catch(err => reject(err))
    })
  }
}