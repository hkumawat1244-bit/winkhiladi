
<script>

const no=document.querySelector(".no");

function move(){

let x=
Math.random()*
(window.innerWidth-150);

let y=
Math.random()*
(window.innerHeight-150);

no.style.left=x+"px";
no.style.top=y+"px";

}

no.addEventListener(
"mouseover",
move
);

no.addEventListener(
"touchstart",
move
);

document
.querySelector(".yes")
.onclick=()=>{

alert(
"I knew it 😍💕"
);

for(
let i=0;
i<30;
i++
){

let h=
document
.createElement(
"div"
);

h.innerHTML="💖";

h.className=
"heart";

h.style.left=
Math.random()*
100+"vw";

h.style.top=
"80vh";

document
.body
.appendChild(h);

setTimeout(
()=>h.remove(),
2000
);

}

};

</script>
