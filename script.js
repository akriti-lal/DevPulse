const key="devpulseLogs";const logs=JSON.parse(localStorage.getItem(key)||"{}");
const todayKey=()=>new Date().toISOString().slice(0,10);
const quotes=["Small commits compound into big projects.","You do not need a perfect day. You need a completed one.","Consistency is a technical skill too.","One bug fixed is still progress.","Build quietly. Let the commits speak."];

document.getElementById("today").textContent=new Date().toLocaleDateString(undefined,{weekday:"long",month:"short",day:"numeric",year:"numeric"});
function render(){
  const dates=Object.keys(logs).sort();
  let totalHours=dates.reduce((s,d)=>s+Number(logs[d].hours||0),0);
  document.getElementById("total").textContent=dates.length;
  document.getElementById("hours").textContent=totalHours;
  let streak=0,d=new Date();
  while(logs[d.toISOString().slice(0,10)]){streak++;d.setDate(d.getDate()-1)}
  document.getElementById("streak").textContent=streak;
  const hm=document.getElementById("heatmap");hm.innerHTML="";
  for(let i=27;i>=0;i--){let x=new Date();x.setDate(x.getDate()-i);let k=x.toISOString().slice(0,10),h=Number(logs[k]?.hours||0),c=document.createElement("div");c.className="cell "+(h>=5?"l4":h>=3?"l3":h>=1?"l2":h>0?"l1":"");c.title=k+(h?" · "+h+"h":"");hm.appendChild(c)}
}
document.getElementById("save").onclick=()=>{
  const work=document.getElementById("work").value.trim();
  const hours=document.getElementById("hoursInput").value;
  if(!work&&!hours){document.getElementById("work").focus();return}
  logs[todayKey()]={work,hours:Number(hours||0),category:document.getElementById("category").value};
  localStorage.setItem(key,JSON.stringify(logs));document.getElementById("saved").textContent="● Saved";document.getElementById("saved").style.color="#39d353";render();
};
document.getElementById("newQuote").onclick=()=>document.getElementById("quote").textContent=quotes[Math.floor(Math.random()*quotes.length)];
render();
