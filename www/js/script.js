// script.js

import { db } from './firebaseConfig.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export function navigateTo(page) {
    window.location.href = page;
}

export function bookStay() {
    const location = document.getElementById('stayLocation').value;
    const dates = document.getElementById('stayDates').value;

    addDoc(collection(db, "booking"), {
        type: "Stay",
        location: location,
        dates: dates
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        localStorage.setItem('bookingType', 'Stay');
        localStorage.setItem('location', location);
        localStorage.setItem('dates', dates);
        navigateTo('confirmation.html');
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}

export function bookFlight() {
    const from = document.getElementById('flightFrom').value;
    const to = document.getElementById('flightTo').value;
    const dates = document.getElementById('flightDates').value;

    addDoc(collection(db, "booking"), {
        type: "Flight",
        from: from,
        to: to,
        dates: dates
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        localStorage.setItem('bookingType', 'Flight');
        localStorage.setItem('from', from);
        localStorage.setItem('to', to);
        localStorage.setItem('dates', dates);
        navigateTo('confirmation.html');
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}

export function bookCar() {
    const location = document.getElementById('carLocation').value;
    const dates = document.getElementById('carDates').value;

    addDoc(collection(db, "booking"), {
        type: "Car Rental",
        location: location,
        dates: dates
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        localStorage.setItem('bookingType', 'Car Rental');
        localStorage.setItem('location', location);
        localStorage.setItem('dates', dates);
        navigateTo('confirmation.html');
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const confirmationMessage = document.getElementById('confirmationMessage');
    if (confirmationMessage) {
        const bookingType = localStorage.getItem('bookingType');
        if (bookingType === 'Stay') {
            const location = localStorage.getItem('location');
            const dates = localStorage.getItem('dates');
            confirmationMessage.textContent = `Your stay in ${location} from ${dates} is confirmed.`;
        } else if (bookingType === 'Flight') {
            const from = localStorage.getItem('from');
            const to = localStorage.getItem('to');
            const dates = localStorage.getItem('dates');
            confirmationMessage.textContent = `Your flight from ${from} to ${to} on ${dates} is confirmed.`;
        } else if (bookingType === 'Car Rental') {
            const location = localStorage.getItem('location');
            const dates = localStorage.getItem('dates');
            confirmationMessage.textContent = `Your car rental in ${location} from ${dates} is confirmed.`;
        }
    }
});
