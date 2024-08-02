import { initializeApp } from "@firebase/app";

const configureFirebase = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyAqbu6lOagkakErK4bu4xCQgCFS0zEAJfw",
        authDomain: "palavrando-game.firebaseapp.com",
        databaseURL: "https://palavrando-game-default-rtdb.firebaseio.com",
        projectId: "palavrando-game",
        storageBucket: "palavrando-game.appspot.com",
        messagingSenderId: "217619319895",
        appId: "1:217619319895:web:093730d01cb7fc7b012712",
        measurementId: "G-RTCXF4JBDM"
    };
    
    initializeApp(firebaseConfig);
};

export {
    configureFirebase
};

