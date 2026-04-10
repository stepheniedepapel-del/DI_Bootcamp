// Create promises (they start executing immediately)
const promise1 = fetchSunrise(lat1, lng1);
const promise2 = fetchSunrise(lat2, lng2);

// Wait for BOTH to complete - runs in parallel!
const [sunriseData1, sunriseData2] = await Promise.all([promise1, promise2]);

// This line only runs when BOTH are done
console.log('Both cities loaded!');