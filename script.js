var currentUser = null;
var generatedOTP = "";
var currentBet = { amount: 10, type: null };
var timer = 60;
var interval = null;

document.addEventListener("DOMContentLoaded", function(){
    setTimeout(function(){
        document.getElementById("loadingScreen").style.display="none";
    },1000);
    startTimer();
});

function sendOTP(){
    var mobile = document.getElementById("loginMobile").value;
    if(mobile.length !== 10){
        alert("Enter valid mobile");
        return;
    }
    generatedOTP = "1234";
    document.getElementById("otpBox").style.display="block";
    alert("Demo OTP: 1234");
}

function verifyOTP(){
    var otp = document.getElementById("otpInput").value;
    if(otp !== generatedOTP){
        alert("Wrong OTP");
        return;
    }
    currentUser = { balance:100 };
    document.getElementById("loginPage").classList.remove("active");
    document.getElementById("mainApp").classList.add("active");
}

function logout(){
    currentUser=null;
    document.getElementById("mainApp").classList.remove("active");
    document.getElementById("loginPage").classList.add("active");
}

function setBetType(type){
    currentBet.type = type;
}

function placeBet(){
    if(!currentBet.type){
        alert("Select bet type");
        return;
    }
    generateNumber();
}

function generateNumber(){
    var num = Math.floor(Math.random()*10);
    var color = "";

    if(num===0 || num===5) color="green";
    else if(num%2===0) color="red";
    else color="white";

    document.getElementById("currentNumber").textContent=num;
    document.getElementById("resultNumber").textContent="Number: "+num;
    document.getElementById("resultColor").textContent="Color: "+color;
    document.getElementById("resultAmount").textContent="Result Updated";
    document.getElementById("gameResult").style.display="block";
}

function startTimer(){
    interval = setInterval(function(){
        timer--;
        document.getElementById("gameTimer").textContent=timer;
        if(timer<=0){
            timer=60;
            generateNumber();
        }
    },1000);
}
