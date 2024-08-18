let currentSlide = 0;
const slides = document.querySelectorAll('.content .card');
const slides2 = document.querySelectorAll('.content2 .card');
const dots = document.querySelectorAll('#dot div');
const toggleColorButton = document.querySelectorAll('#toggleColorButton');
 var moodData='wax';



    function showSlide(index) {

        slides.forEach((slide, i) => {
            slide.style.display = 'none';
            dots[i].style.backgroundColor = '#fff';
        });
        slides[index].style.display = 'flex';
        dots[index].style.backgroundColor = '#094755c5';
    }
    
    function changeSlide(step) {
        currentSlide += step;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        else if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }
    
        showSlide(currentSlide);
    }


function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
});

showSlide(currentSlide);




function active() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString();
    console.log(minutes);

    if(hours %2==0 && minutes>=0 && minutes<=15){
        currentSlide = 0;
        showSlide(currentSlide);
    }else if(hours %2==0 && minutes>=15 && minutes<=45){
        currentSlide = 1;
        showSlide(currentSlide);
    }else if(hours %2==0 && minutes>=45 && minutes<=50){
        currentSlide = 2;
        showSlide(currentSlide);
    }
    else{
        currentSlide = 0;
        showSlide(currentSlide);
    }
   
    
}
active();
setInterval(active,600000);



function displayLocalGMTPMTAndPDTTime() {
    const timeElements = document.querySelectorAll('.localTime');
    const skyTime = document.querySelectorAll('.skyTime');

    timeElements.forEach((element) => {
        const now = new Date();

        // Get local time
        let hours = now.getHours();
        const minutes = now.getMinutes().toString();
        const seconds = now.getSeconds().toString();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const localTimeString = `${hours}:${minutes}:${seconds} ${ampm}`;
        element.textContent = `${localTimeString}`;
    });

    skyTime.forEach((element) => {
        const now = new Date();

        const pdtDate = new Date(now.getTime() - 7 * 60 * 60 * 1000);
        let pdtHours = pdtDate.getUTCHours();
        const pdtMinutes = pdtDate.getUTCMinutes().toString();
        const pdtSeconds = pdtDate.getUTCSeconds().toString();
        const pdtAmpm = pdtHours >= 12 ? 'PM' : 'AM';
        pdtHours = pdtHours % 12;
        pdtHours = pdtHours ? pdtHours : 12;
        const pdtTimeString = `${pdtHours}:${pdtMinutes}:${pdtSeconds} ${pdtAmpm}`;

        element.textContent = `${pdtTimeString}`;
    });
}
displayLocalGMTPMTAndPDTTime();
setInterval(displayLocalGMTPMTAndPDTTime, 1000);




function toggleBackgroundColor() {
    const body = document.body;
    const toggleButton = document.getElementById('toggleColorButton');

    // Toggle between light and dark mode
    if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        toggleButton.classList.remove('fa-moon');
        toggleButton.classList.add('fa-sun');
        localStorage.setItem('Mood','dark-mode');
        // mood='dark';
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        toggleButton.classList.remove('fa-sun');
        toggleButton.classList.add('fa-moon');
        localStorage.setItem('Mood', 'light-mode');
        // mood='light';
    }
}
onload=()=>{
    const toggleButton = document.getElementById('toggleColorButton');
    const body = document.body;
    if(localStorage.Mood == 'light-mode'){
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        toggleButton.classList.remove('fa-sun');
        toggleButton.classList.add('fa-moon');
    }else{
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        toggleButton.classList.remove('fa-moon');
        toggleButton.classList.add('fa-sun');
    }
}
// Add event listener to the toggle button
document.getElementById('toggleColorButton').addEventListener('click', toggleBackgroundColor);


//daily 
function startCountdown() {
    const countdownElement = document.getElementById('countdownTimer');

    // Get the current time and the next 10 AM
    const now = new Date();
    const targetTime = new Date();

    // Set the target time to 10 AM
    targetTime.setHours(10, 0, 0, 0);

    // If it's already past 10 AM, set the target to 10 AM the next day
    if (now > targetTime) {
        targetTime.setDate(targetTime.getDate() + 1);
    }

    // Calculate the time remaining until the target time
    const timeDifference = targetTime - now;

    // Function to update the countdown every second
    function updateCountdown() {
        const now = new Date();
        const timeRemaining = targetTime - now;

        // Calculate hours, minutes, and seconds remaining
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        // Update the countdown element
        countdownElement.textContent = ` ${hours}:${minutes}:${seconds} s`;

        // If the countdown is over, reset to another 24 hours
        if (timeRemaining < 0) {
            targetTime.setDate(targetTime.getDate() + 1);
        }
    }

    // Update the countdown every second
    setInterval(updateCountdown, 1000);
}

// Start the countdown
startCountdown();

function startCountdownFrom5thMinute() {
    const countdownElements = document.querySelectorAll(".nextEvent2");

    function updateCountdown() {
        const now = new Date();
        const currentMinutes = now.getMinutes();
        const currentSeconds = now.getSeconds();
        let currentHours = now.getHours();

        // Determine the next event time (starting from the 5th minute of every even hour)
        let targetHour = currentHours;
        let targetMinute = 5;

        // Move to the next even hour if the current time is past the 5th minute
        if (currentMinutes >= 5) {
            targetHour += 2 - (currentHours % 2); // Move to the next even hour
        } else {
            targetHour += targetHour % 2 ? 1 : 0; // Keep at the current even hour or move to the next even hour
        }

        const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), targetHour, targetMinute, 0);

        // If the target time is in the past, move to the next 2-hour interval
        if (now > targetTime) {
            targetTime.setHours(targetTime.getHours() + 2);
        }

        // Calculate the time difference
        const timeDifference = targetTime - now;

        // Calculate hours, minutes, and seconds remaining
        const remainingHours = Math.floor(timeDifference / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const remainingSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        // Check if we're within the first 10 minutes
        if (currentHours % 2==0 && currentMinutes>=5 && currentMinutes<=15) {
            countdownElements.forEach((element) => {
                element.textContent = ` now`;
            });
        } else {
            countdownElements.forEach((element) => {
                element.textContent = `${remainingHours}:${remainingMinutes}:${remainingSeconds}s`;
            });
        }

        // Continue updating every second
        setTimeout(updateCountdown, 1000);
    }

    updateCountdown();
}

// Start the countdown
startCountdownFrom5thMinute();





function startCountdownFrom35thMinute() {
    const countdownElements = document.querySelectorAll(".nextEvent1");

    function updateCountdown() {
        const now = new Date();
        const currentMinutes = now.getMinutes();
        const currentSeconds = now.getSeconds();
        let currentHours = now.getHours();

        // Determine the next event time (starting from the 35th minute of every even hour)
        let targetHour = currentHours;
        let targetMinute = 35;

        // Move to the next even hour if the current time is past the 35th minute
        if (currentMinutes >= 35) {
            targetHour += 2 - (currentHours % 2); // Move to the next even hour
        } else {
            targetHour += targetHour % 2 ? 1 : 0; // Keep at the current even hour or move to the next even hour
        }

        const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), targetHour, targetMinute, 0);

        // If the target time is in the past, move to the next 2-hour interval
        if (now > targetTime) {
            targetTime.setHours(targetTime.getHours() + 2);
        }

        // Calculate the time difference
        const timeDifference = targetTime - now;

        // Calculate hours, minutes, and seconds remaining
        const remainingHours = Math.floor(timeDifference / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const remainingSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        // Check if the countdown has ended
        if (timeDifference <= 0) {
            // Display "now" and keep it displayed for 10 minutes
            countdownElements.forEach((element) => {
                element.textContent = `now`;
            });

            // Set a timeout to restart the countdown after 10 minutes
            setTimeout(updateCountdown, 10 * 60 * 1000); // 10 minutes in milliseconds
        } else if (currentHours % 2==0 && currentMinutes>=35 && currentMinutes<=45) {
            // Display "now" during the last 10 minutes of the countdown
            countdownElements.forEach((element) => {
                element.textContent = `now`;
            });

            // Continue updating every second
            setTimeout(updateCountdown, 1000);
        } else {
            // Update all elements with class "nextEvent1" with the countdown
            countdownElements.forEach((element) => {
                element.textContent = `${remainingHours}:${remainingMinutes}:${remainingSeconds}s`;
            });

            // Continue updating every second
            setTimeout(updateCountdown, 1000);
        }
    }

    updateCountdown();
}

// Start the countdown
startCountdownFrom35thMinute();






function startCountdownFrom50thMinute() {
    const countdownElements = document.querySelectorAll(".nextEvent3");
    function updateCountdown() {
        const now = new Date();
        const currentMinutes = now.getMinutes();
        const currentSeconds = now.getSeconds();
        let currentHours = now.getHours();

        // Determine the next event time (starting from the 50th minute of every even hour)
        let targetHour = currentHours;
        let targetMinute = 50;

        // Move to the next even hour if the current time is past the 50th minute
        if (currentMinutes >= 50) {
            targetHour += 2 - (currentHours % 2); // Move to the next even hour
        } else {
            targetHour += targetHour % 2 ? 1 : 0; // Keep at the current even hour or move to the next even hour
        }

        const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), targetHour, targetMinute, 0);

        // If the target time is in the past, move to the next 2-hour interval
        if (now > targetTime) {
            targetTime.setHours(targetTime.getHours() + 2);
        }

        // Calculate the time difference
        const timeDifference = targetTime - now;

        // Calculate hours, minutes, and seconds remaining
        const remainingHours = Math.floor(timeDifference / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const remainingSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        // Check if the countdown has ended or is within the last 10 minutes
        if (timeDifference <= 0) {
            // Display "now" and keep it displayed for 10 minutes
            countdownElements.forEach((element) => {
                element.textContent = `now`;
            });
            

            // Restart the countdown after 10 minutes
            setTimeout(() => {
                // Restart the countdown
                updateCountdown();
            }, 10 * 60 * 1000); // 10 minutes in milliseconds
        } else if (currentHours % 2==0 && currentMinutes>=50 && currentMinutes<=59) {
            // Display "now" during the last 10 minutes of the countdown
            countdownElements.forEach((element) => {
                element.textContent = `now`;
            });

            // Continue updating every second
            setTimeout(updateCountdown, 1000);
        } else {
            // Update all elements with class "nextEvent3" with the countdown
            countdownElements.forEach((element) => {
                element.textContent = `${remainingHours}:${remainingMinutes}:${remainingSeconds}s`;
            });

            // Continue updating every second
            setTimeout(updateCountdown, 1000);
        }
    }

    updateCountdown();
}

// Start the countdown
startCountdownFrom50thMinute();



//جايزر
function displayNextEvenNumber() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const startMinute = 15;

    // Calculate the next even hour
    const nextEvenHour = currentHour % 2 === 0 ? currentHour : currentHour + 1;

    // Calculate the target time (next even hour from the 15th minute)
    let targetTime = new Date();
    targetTime.setHours(nextEvenHour, startMinute, 0, 0);

    // If the current time is already past the 15th minute, adjust to the next valid time
    if (currentMinute >= startMinute && currentHour % 2 === 0) {
        targetTime.setHours(targetTime.getHours() + 2);
    }

    const timeDifference = targetTime - now;

    if (timeDifference > 0) {
        // Convert to 12-hour format and determine AM/PM
        let hour = targetTime.getHours();
        const period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12;
        hour = hour === 0 ? 12 : hour; // Handle midnight and noon

        document.querySelector('.from2').innerText = ` ${hour}:05 ${period}`;
        document.querySelector('.to2').innerText = ` ${hour}:15 ${period}`;
    } else {
        document.querySelector('.from2').innerText = "Calculating...";
        document.querySelector('.to2').innerText = "Calculating...";
    }
}

displayNextEvenNumber(); // Initial call
setInterval(displayNextEvenNumber, 1000); // Update every second
//الجده
function displayNextEvenNumber1() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const startMinute = 35;

    // Calculate the next even hour
    const nextEvenHour = currentHour % 2 === 0 ? currentHour : currentHour + 1;

    // Calculate the target time (next even hour from the 15th minute)
    let targetTime = new Date();
    targetTime.setHours(nextEvenHour, startMinute, 0, 0);

    // If the current time is already past the 15th minute, adjust to the next valid time
    if (currentMinute >= startMinute && currentHour % 2 === 0) {
        targetTime.setHours(targetTime.getHours() + 2);
    }

    const timeDifference = targetTime - now;

    if (timeDifference > 0) {
        // Convert to 12-hour format and determine AM/PM
        let hour = targetTime.getHours();
        const period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12;
        hour = hour === 0 ? 12 : hour; // Handle midnight and noon
        document.querySelector('.from1').innerText = ` ${hour}:35 ${period}`;
        document.querySelector('.to1').innerText = ` ${hour}:45 ${period}`;
    } else {
        document.querySelector('.from1').innerText = "Calculating...";
        document.querySelector('.to1').innerText = "Calculating...";
    }
}

displayNextEvenNumber1(); // Initial call
setInterval(displayNextEvenNumber1, 1000); // Update every second



//السلحفه

function displayNextEvenNumber2() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const startMinute = 59;

    // Calculate the next even hour
    const nextEvenHour = currentHour % 2 === 0 ? currentHour : currentHour + 1;

    // Calculate the target time (next even hour from the 15th minute)
    let targetTime = new Date();
    targetTime.setHours(nextEvenHour, startMinute, 0, 0);

    // If the current time is already past the 15th minute, adjust to the next valid time
    if (currentMinute >= startMinute && currentHour % 2 === 0) {
        targetTime.setHours(targetTime.getHours() + 2);
    }

    const timeDifference = targetTime - now;

    if (timeDifference > 0) {
        // Convert to 12-hour format and determine AM/PM
        let hour = targetTime.getHours();
        const period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12;
        hour = hour === 0 ? 12 : hour; // Handle midnight and noon
        document.querySelector('.from3').innerText = ` ${hour}:50 ${period}`;
        if(hour==12){
            document.querySelector('.to3').innerText = ` 1:00 ${period}`;
            document.querySelector('.to4').innerText = ` 1:00 ${period}`;
        }else{
            document.querySelector('.to3').innerText = ` ${hour+1}:00 ${period}`;
            document.querySelector('.to4').innerText = ` ${hour+1}:00 ${period}`;
        }
       
       document.querySelector('.from4').innerText = ` ${hour}:50 ${period}`;
      
    } else {
        document.querySelector('.from3').innerText = "Calculating...";
        document.querySelector('.to3').innerText = "Calculating...";
       
    }
}

displayNextEvenNumber2(); // Initial call
setInterval(displayNextEvenNumber2, 1000); // Update every second

function displayHourlyUpdatesFrom2AM() {
    const timeElement = document.querySelector("p.from5");
    const timeElement2 = document.querySelector("p.to5");
    function updateTime() {
        const now = new Date();
        let targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 2, 0, 0); // Set target to 2:00 AM today

        // Calculate the next hourly update starting from 2:00 AM
        while (now > targetTime) {
            targetTime.setHours(targetTime.getHours() + 1); // Move to the next hour
        }

        // Format the time to display in 12-hour format with AM/PM
        let hours = targetTime.getHours();
        const minutes = targetTime.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; // Convert 0 to 12

        // Update the time element
        timeElement.textContent = `${hours}:00 ${ampm}`;
        timeElement2.textContent = `${hours}:10 ${ampm}`;

        // Continue updating every hour
        setTimeout(updateTime, 3600000); // 3600000 ms = 1 hour
    }

    updateTime();
}

// Call the function to start displaying the time
displayHourlyUpdatesFrom2AM();


function startCountdownFrom50thMinute2() {
    const countdownElements = document.querySelectorAll(".nextEvent4");
    
    function updateCountdown() {
        const now = new Date();
        const currentMinutes = now.getMinutes();
        const currentSeconds = now.getSeconds();
        let currentHours = now.getHours();

        // Determine the target event time (50th minute of the next hour)
        let targetHour = currentHours;
        let targetMinute = 50;

        // Move to the next hour if the current time is past the 50th minute
        if (currentMinutes >= 50) {
            targetHour += 1; // Move to the next hour
        }

        const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), targetHour, targetMinute, 0);

        // If the target time is in the past, move to the next hour
        if (now > targetTime) {
            targetTime.setHours(targetTime.getHours() + 1);
        }

        // Calculate the time difference
        const timeDifference = targetTime - now;

        // Calculate hours, minutes, and seconds remaining
        const remainingHours = Math.floor(timeDifference / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const remainingSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        // Check if the countdown has ended or is within the last 10 minutes
        if (timeDifference <= 0) {
            // Display "now" and keep it displayed for 10 minutes
            countdownElements.forEach((element) => {
                element.textContent = `now`;
            });

            // Restart the countdown after 10 minutes
            setTimeout(() => {
                // Restart the countdown
                updateCountdown();
            }, 10 * 60 * 1000); // 10 minutes in milliseconds
        } else if (currentMinutes >= 50 && currentMinutes <= 59) {
            // Display "now" during the last 10 minutes of the countdown
            countdownElements.forEach((element) => {
                element.textContent = `now`;
            });

            // Continue updating every second
            setTimeout(updateCountdown, 1000);
        } else {
            // Update all elements with class "nextEvent3" with the countdown
            countdownElements.forEach((element) => {
                element.textContent = `${remainingHours}:${remainingMinutes}:${remainingSeconds}s`;
            });

            // Continue updating every second
            setTimeout(updateCountdown, 1000);
        }
    }

    updateCountdown();
}

// Start the countdown
startCountdownFrom50thMinute2();



function startCountdownFrom3AM() {
    const countdownElement = document.querySelector("p.nextEvent5");
    
    function updateCountdown() {
        const now = new Date();
        let targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 3, 0, 0); // Set target to 3:00 AM today

        // Calculate the time difference from the current time to the next 3 AM or 3 PM
        while (now > targetTime) {
            targetTime.setHours(targetTime.getHours() + 12); // Move to the next 12-hour interval (3 AM or 3 PM)
        }

        // Calculate the time difference
        const timeDifference = targetTime - now;

        // Calculate hours, minutes, and seconds remaining
        const remainingHours = Math.floor(timeDifference / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const remainingSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        // Update the countdown element
        countdownElement.textContent = `${remainingHours}:${remainingMinutes}:${remainingSeconds}s`;

        // Continue updating every second
        setTimeout(updateCountdown, 1000);
    }

    updateCountdown();
}

// Call the function to start the countdown
startCountdownFrom3AM();


function displayCurrentTimeFrom3AM() {
    const timeElement = document.querySelector("p.from6");
    const to6 = document.querySelector("p.to6");
    
    function updateTime() {
        const now = new Date();
        let targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 3, 30, 0); // Set target to 3:30 AM today

        // Calculate the next 12-hour interval (3:30 AM or 3:30 PM)
        while (now > targetTime) {
            targetTime.setHours(targetTime.getHours() + 12); // Move to the next 12-hour interval (3:30 AM or 3:30 PM)
        }

        // Format the time to display hours and minutes
        const hours = targetTime.getHours().toString().padStart(2, '0');
        const minutes = targetTime.getMinutes().toString().padStart(2, '0');

        // Update the time element
        timeElement.textContent = `${hours}:00`;
        to6.textContent = `${hours}:30`;
        // Continue updating every second
        setTimeout(updateTime, 1000);
    }

    updateTime();
}

// Call the function to start displaying the time
displayCurrentTimeFrom3AM();




function info() {
    let info = document.querySelector('.info');
    let info2 = document.querySelector('.info2');
    info.style.display='block';
    info2.style.display='none';
}
function back() {
    let info = document.querySelector('.info');
    let info2 = document.querySelector('.info2');
    info.style.display='none';
    info2.style.display='block';
}


function displayCurrentTimeFrom2AM() {
    const timeElement = document.querySelector("p.from7");
    const to7 = document.querySelector("p.to7");
    
    function updateTime() {
        const now = new Date();
        let targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 2, 0, 0); // Set target to 2:00 AM today

        // Calculate the next 6-hour interval (2:00 AM, 8:00 AM, 2:00 PM, 8:00 PM)
        while (now > targetTime) {
            targetTime.setHours(targetTime.getHours() + 6); // Move to the next 6-hour interval
        }

        // Format the time to display hours and minutes with AM/PM
        let hours = targetTime.getHours();
        const minutes = targetTime.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; // Convert 0 to 12

        // Update the time elements
        timeElement.textContent = `${hours}:00 ${ampm}`;

        let nextHour = targetTime.getHours() + 1;
        const nextAmpm = nextHour >= 12 ? 'PM' : 'AM';
        nextHour = nextHour % 12;
        nextHour = nextHour ? nextHour : 12; // Convert 0 to 12

        to7.textContent = `${nextHour}:00 ${nextAmpm}`;

        // Continue updating every second
        setTimeout(updateTime, 1000);
    }

    updateTime();
}

// Call the function to start displaying the time
displayCurrentTimeFrom2AM();


function countdownFrom2AM() {
    const countdownElement = document.querySelector("p.nextEvent6");

    function updateCountdown() {
        const now = new Date();
        let targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 2, 0, 0); // Set target to 2:00 AM today

        // Calculate the next 6-hour interval (2:00 AM, 8:00 AM, 2:00 PM, 8:00 PM)
        while (now > targetTime) {
            targetTime.setHours(targetTime.getHours() + 6); // Move to the next 6-hour interval
        }

        // Calculate the time difference
        const timeDifference = targetTime - now;

        // Calculate hours, minutes, and seconds remaining
        const remainingHours = Math.floor(timeDifference / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const remainingSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        // Update the countdown element
        countdownElement.textContent = `${remainingHours}:${remainingMinutes}:${remainingSeconds}s`;

        // Continue updating every second
        setTimeout(updateCountdown, 1000);
    }

    updateCountdown();
}

// Call the function to start the countdown
countdownFrom2AM();



const padges = document.querySelector('.padges #slide1');
const padges2 = document.querySelector('.padges #slide2');
const padges3 = document.querySelector('.padges #slide3');
const padges4 = document.querySelector('.padges #slide4');


    padges.addEventListener('click',()=>{
        document.querySelector('.content').style.display='flex';
        document.querySelector('#dot').style.display='flex';
        document.querySelector('.content2').style.display='none';
        padges.style.backgroundColor=' #094755c5';
        document.querySelector('#dot').style.display='flex';
        document.querySelector('.prev2').style.display='flex';
        document.querySelector('.next2').style.display='flex';
        document.querySelector('.content3').style.display='none';
        document.querySelector('.content4').style.display='none';
        padges.style.border=' 1px solid rgba(5, 53, 58, 0.349)';
        padges.style.borderRadius=' 4px';
        padges2.style.backgroundColor='transparent';
        padges2.style.border=' none';
        padges3.style.backgroundColor='transparent';
        padges3.style.border=' none';
        padges4.style.backgroundColor='transparent';
        padges4.style.border=' none';
     });

     padges2.addEventListener('click',()=>{
        document.querySelector('.content').style.display='none';
        document.querySelector('.content2').style.display='flex';
        padges2.style.backgroundColor=' #094755c5';
        document.querySelector('#dot').style.display='flex';
        document.querySelector('.prev2').style.display='flex';
        document.querySelector('.next2').style.display='flex';
        document.querySelector('.content3').style.display='none';
        document.querySelector('.content4').style.display='none';
        padges2.style.border=' 1px solid rgba(5, 53, 58, 0.349)';
        padges2.style.borderRadius=' 4px';
        padges.style.backgroundColor='transparent';
        padges.style.border=' none';
        padges3.style.backgroundColor='transparent';
        padges3.style.border=' none';
        padges4.style.backgroundColor='transparent';
        padges4.style.border=' none';
     });

    padges3.addEventListener('click',()=>{
        document.querySelector('.content').style.display='none';
        document.querySelector('.content2').style.display='none';
        document.querySelector('#dot').style.display='none';
        document.querySelector('.prev2').style.display='none';
        document.querySelector('.next2').style.display='none';
        document.querySelector('.content4').style.display='none';
        document.querySelector('.content3').style.display='flex';
        padges3.style.backgroundColor='#094755c5';
        padges3.style.border=' 1px solid rgba(5, 53, 58, 0.349)';
        padges3.style.borderRadius=' 4px';
        padges.style.backgroundColor='transparent';
        padges.style.border=' none';
        padges2.style.backgroundColor='transparent';
        padges2.style.border=' none';
        padges4.style.backgroundColor='transparent';
        padges4.style.border=' none';
     });

    padges4.addEventListener('click',()=>{
        document.querySelector('.content').style.display='none';
        document.querySelector('.content2').style.display='none';
        document.querySelector('#dot').style.display='none';
        document.querySelector('.prev2').style.display='none';
        document.querySelector('.next2').style.display='none';
        document.querySelector('.content3').style.display='none';
        document.querySelector('.content4').style.display='flex';
       padges4.style.backgroundColor='#094755c5';
       padges4.style.border=' 1px solid rgba(5, 53, 58, 0.349)';
       padges4.style.borderRadius=' 4px';
       padges.style.backgroundColor='transparent';
       padges.style.border=' none';
       padges2.style.backgroundColor='transparent';
       padges2.style.border=' none';
       padges3.style.backgroundColor='transparent';
       padges3.style.border=' none';
     });


    function showSlide2(index) {

        slides2.forEach((slide, i) => {
            slide.style.display = 'none';
            dots[i].style.backgroundColor = '#fff';
        });
        slides2[index].style.display = 'flex';
        dots[index].style.backgroundColor = '#094755c5';
    }
    
    function changeSlide2(step) {
        currentSlide += step;
        if (currentSlide >= slides2.length) {
            currentSlide = 0;
        }
        else if (currentSlide < 0) {
            currentSlide = slides2.length - 1;
        }
    
        showSlide2(currentSlide);
    }
  
    
    showSlide2(currentSlide);


    function goToSlide(index) {
        currentSlide = index;
        showSlide(currentSlide);
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    showSlide2(currentSlide);


