var pages=["home","about","properties","services","process","contact"],nav=document.getElementById("nav"),mb=document.getElementById("mb");
function route(){var hash=(location.hash||"#home").slice(1),parts=hash.split("?"),h=parts[0],params=new URLSearchParams(parts[1]||"");if(pages.indexOf(h)<0)h="home";
pages.forEach(function(p){document.getElementById(p).classList.toggle("on",p===h)});
document.querySelectorAll("#nav a").forEach(function(a){a.classList.toggle("on",a.getAttribute("href")==="#"+h&&!a.classList.contains("cl"))});
if(h==="properties")setPropertyFilter(params.get("type")||"all");
nav.classList.remove("open");mb.setAttribute("aria-expanded","false");window.scrollTo(0,0)}
window.addEventListener("hashchange",route);route();
mb.addEventListener("click",function(){var o=nav.classList.toggle("open");mb.setAttribute("aria-expanded",o)});
function wa(m){window.open("https://wa.me/919319113716?text="+encodeURIComponent(m),"_blank")}
function limitPhone(input){input.value=input.value.replace(/\D/g,"").slice(0,10)}

/* Property data: type -> category -> specification -> starting budget. Empty key "" means no specification. */
var DATA={
"Residential Houses / Apartments":{
 "Buy / Sale":{"Renowned Properties":"From ₹35 Lakh onwards"},
 "Renting":{"Renowned Properties":"From ₹15,000 per month onwards"}},
"New Projects":{
 "High Rise Apartments":{"Pre-Launch":"From ₹1.25 Cr onwards","Under Construction":"From ₹1.25 Cr onwards","Near Possession":"From ₹1.25 Cr onwards","Ready To Move":"From ₹1.25 Cr onwards"},
 "Low Rise Builder Floors":{"Pre-Launch":"From ₹2 Cr onwards","Under Construction":"From ₹2 Cr onwards","Near Possession":"From ₹2 Cr onwards","Ready To Move":"From ₹2 Cr onwards"},
 "Commercial Complex":{"Pre-Launch":"From ₹60 Lakh onwards","Under Construction":"From ₹60 Lakh onwards","Near Possession":"From ₹60 Lakh onwards","Ready To Move":"From ₹60 Lakh onwards"}},
"Office Spaces":{
 "Buy / Sale":{"":"From ₹25 Lakh onwards"},
 "Renting":{"":"From ₹20,000 per month onwards"}},
"Commercial / Studio (Pre-Leased) / Lock-in":{
 "Buy / Sale":{"New Properties":"From ₹60 Lakh onwards","Renowned Properties":"From ₹60 Lakh onwards"},
 "Renting":{"New Properties":"From ₹25,000 per month onwards","Renowned Properties":"From ₹25,000 per month onwards"}},
"Industrial Building, PEB and Factories":{
 "Buy / Sale":{"":"From ₹25,000 per sq yard"},
 "Renting":{"":"From ₹150 per sq yard onwards"}},
"Raw Land":{
 "Plots (Buy / Sale)":{"Authority":"From ₹50,000 per sq yard onwards","6% Under Authority":"From ₹35,000 per sq yard onwards"},
 "Industrial Land":{"Government Approved":"From ₹1 Lakh per sq yard","Freehold":"From ₹90,000 per sq yard onwards"},
 "Farmhouse Land":{"Freehold":"From ₹60,000 per sq yard onwards"}}
};
function fill(sel,arr){sel.innerHTML="";arr.forEach(function(a){sel.appendChild(new Option(a,a))})}
function bindProp(ids){
 var T=document.getElementById(ids.t),C=document.getElementById(ids.c),SW=document.getElementById(ids.sw),S=document.getElementById(ids.s),B=document.getElementById(ids.b);
 function onS(){var specs=(DATA[T.value]||{})[C.value]||{};B.value=specs[S.value]||""}
 function onC(){var specs=(DATA[T.value]||{})[C.value]||{},keys=Object.keys(specs);
  if(keys.length===1&&keys[0]===""){SW.style.display="none";S.innerHTML="";S.appendChild(new Option("",""))}
  else{SW.style.display="";fill(S,keys)}
  S.required=ids.t==="t"&&SW.style.display!=="none";
  onS()}
 function onT(){fill(C,Object.keys(DATA[T.value]||{}));onC()}
 T.addEventListener("change",onT);C.addEventListener("change",onC);S.addEventListener("change",onS);
 onT()}
bindProp({t:"ht",c:"hc",sw:"hsw",s:"hs",b:"hbud"});
bindProp({t:"t",c:"c",sw:"sw",s:"sp",b:"bud"});
function propText(ids){
 var t=document.getElementById(ids.t).value,c=document.getElementById(ids.c).value,sw=document.getElementById(ids.sw),s=document.getElementById(ids.s).value,b=document.getElementById(ids.b).value;
 return t+" | "+c+(sw.style.display==="none"||!s?"":" | "+s)+" | Budget: "+b}

/* Properties page: filter buttons and enquire buttons */
var pfb=document.querySelectorAll(".pf button");
function setPropertyFilter(k){
 var valid=Array.prototype.some.call(pfb,function(b){return b.getAttribute("data-k")===k});
 if(!valid)k="all";
 pfb.forEach(function(b){b.setAttribute("aria-pressed",b.getAttribute("data-k")===k?"true":"false")});
 document.querySelectorAll(".pc").forEach(function(c){c.style.display=(k==="all"||c.getAttribute("data-k")===k)?"":"none"});
}
pfb.forEach(function(b){b.addEventListener("click",function(){setPropertyFilter(b.getAttribute("data-k"))})});
document.querySelectorAll(".pc .enq").forEach(function(b){b.addEventListener("click",function(){wa("Hello Nathel Realtors, I want details about: "+b.getAttribute("data-q"))})});

document.querySelectorAll('#hp,#p').forEach(function(input){input.addEventListener("input",function(){limitPhone(input);var error=document.getElementById(input.id+"-error");error.textContent="";input.setCustomValidity("")})});
document.getElementById("hb").addEventListener("click",function(){var phone=document.getElementById("hp"),error=document.getElementById("hp-error");limitPhone(phone);if(!/^\d{10}$/.test(phone.value)){error.textContent="Please enter exactly 10 digits.";phone.setCustomValidity("Please enter exactly 10 digits.");phone.reportValidity();return}error.textContent="";phone.setCustomValidity("");wa("Hello Nathel Realtors, I am looking for: "+propText({t:"ht",c:"hc",sw:"hsw",s:"hs",b:"hbud"})+". My number: "+phone.value)});
var consultationForm=document.getElementById("consultation-form");
consultationForm.addEventListener("submit",function(event){
event.preventDefault();
var phone=document.getElementById("p"),phoneError=document.getElementById("p-error"),status=document.getElementById("e"),submitButton=document.getElementById("s");
limitPhone(phone);
if(!/^\d{10}$/.test(phone.value)){phone.setCustomValidity("Please enter exactly 10 digits.");phoneError.textContent="Please enter exactly 10 digits.";phone.reportValidity();return}
phone.setCustomValidity("");phoneError.textContent="";
var payload={_subject:"Free consultation request - Nathel Realtors",_template:"table",name:document.getElementById("n").value.trim(),phone:phone.value,property_type:document.getElementById("t").value,category:document.getElementById("c").value,specification:document.getElementById("sw").style.display==="none"?"Not applicable":document.getElementById("sp").value,starting_budget:document.getElementById("bud").value,budget_and_location:document.getElementById("m").value.trim()};
wa("Hello Nathel Realtors, I would like to book a free consultation.\n\nName: "+payload.name+"\nPhone: "+payload.phone+"\nLooking for: "+payload.property_type+"\nCategory: "+payload.category+"\nSpecification: "+payload.specification+"\nStarting budget: "+payload.starting_budget+"\nBudget and location: "+payload.budget_and_location);
submitButton.disabled=true;submitButton.textContent="Sending...";
status.textContent="Sending your consultation request...";
fetch("https://formsubmit.co/ajax/info@nathelrealtors.com",{method:"POST",headers:{"Accept":"application/json"},body:new URLSearchParams(payload)})
.then(function(response){return response.json().then(function(data){if(!response.ok||data.success!=="true"&&data.success!==true)throw new Error(data.message||"Email provider rejected the request.");return data})})
.then(function(){status.textContent="Your request has been received.";window.alert("Thank you! Your consultation request has been received. Our team will contact you shortly to schedule your free consultation.");consultationForm.reset();document.getElementById("t").dispatchEvent(new Event("change"))})
.catch(function(error){console.error("Consultation email could not be sent:",error);status.textContent="We couldn't send your request right now. Please try again or call 9319113716."})
.then(function(){submitButton.disabled=false;submitButton.textContent="Book consultation"});
});
