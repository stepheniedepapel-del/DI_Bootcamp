const delayedPromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve("success");
  }, 4000); // 4000 milliseconds = 4 seconds
});

delayedPromise.then(result => console.log(result));