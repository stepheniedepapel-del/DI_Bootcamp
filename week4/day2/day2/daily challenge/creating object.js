// 1. Create the Video class
class Video {
    constructor(title, uploader, time) {
        this.title = title;
        this.uploader = uploader;
        this.time = time;
    }

    // 2. Create the watch() method
    watch() {
        console.log(`${this.uploader} watched all ${this.time} seconds of ${this.title}!`);
    }
}

// 3. Instantiate the first Video instance
const video1 = new Video("JavaScript Fundamentals", "JohnDoe", 300);
video1.watch();


// 4. Instantiate a second Video instance with different values
const video2 = new Video("Introduction to OOP", "JaneSmith", 600);
video2.watch();

//Automated Instantiation
// Bonus 1: Best data structure to save info (Array of Objects)
const videoData = [
    { title: "React Hooks", uploader: "CodeMaster", time: 1200 },
    { title: "CSS Flexbox", uploader: "DesignQueen", time: 450 },
    { title: "Node.js Guide", uploader: "BackendGuru", time: 1800 },
    { title: "Python for Beginners", uploader: "PyPro", time: 900 },
    { title: "AI Basics", uploader: "FutureTech", time: 2400 }
];

// Bonus 2: Loop through the array to instantiate those instances
const videoInstances = videoData.map(item => {
    return new Video(item.title, item.uploader, item.time);
});

// Testing the looped instances
videoInstances.forEach(vid => vid.watch());