function timesTwoAsync(x) {
  return new Promise(resolve => resolve(x * 2));
}

const arr = [1, 2, 3];
const promiseArr = arr.map(timesTwoAsync); // [Promise<2>, Promise<4>, Promise<6>]

Promise.all(promiseArr)
  .then(result => {
    console.log(result); // [2, 4, 6]
  });