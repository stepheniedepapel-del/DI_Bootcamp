import React from "react";
import PostList from "./PostList";
import Example1 from "./Example1";
import Example2 from "./Example2";
import Example3 from "./Example3";

function AppExercisesWrapper() {
  const sendData = async () => {
    // Replace with your real webhook URL (Ensure CORS is enabled on webhook.site)
    const url = "webhook.site"; 
    
    const payload = {
      key1: 'myusername',
      email: 'mymail@gmail.com',
      name: 'Isaac',
      lastname: 'Doe',
      age: 27
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      
      console.log("Status Code:", response.status);
      console.log("Data sent successfully. Check your Webhook.site dashboard!");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Exercise 4: Async HTTP POST</h2>
      <button className="btn btn-primary my-3" onClick={sendData}>
        Send JSON Data to Webhook
      </button>
      
      <hr />
      <PostList />
      <hr />
      <Example1 />
      <Example2 />
      <Example3 />
    </div>
  );
}

export default AppExercisesWrapper;
