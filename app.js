const defaults=[
 ["Wake up on time","Start your day without rushing"],["Make your bed","Get one small win immediately"],
 ["Brush teeth & wash face","Take care of your hygiene"],["Drink water","Stay hydrated throughout the day"],
 ["Move your body","Exercise or take a short walk"],["Learn something new","Spend 30 minutes learning"],
 ["Tidy your space","Give everything its place"],["Take a screen break","Make time for real life"],
 ["Prepare for tomorrow","Make the next morning easier"],["Get enough sleep","Give yourself time to rest"]
];
const $=id=>document.getElementById(id);
const dayKey=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`};
const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}};
let habits=read("db-habits",defaults.map((x,i)=>({id:`h${i}`,name:x[0],detail:x[1]})));
let state=read("db-state",{date:dayKey(),checks:[],goal:"",note:"",streak:0,lastComplete:""});
if(state.date!==dayKey()){state={...state,date:dayKey(),checks:[]};saveState()}
let editingId=null;
function saveState(){localStorage.setItem("db-state",JSON.stringify(state))}
function saveHabits(){localStorage.setItem("db-habits",JSON.stringify(habits))}
function render(){
 $("todayLabel").textContent=new Intl.DateTimeFormat(undefined,{weekday:"long",month:"long",day:"numeric"}).format(new Date()).toUpperCase();
 $("goalInput").value=state.goal||"";$("noteInput").value=state.note||"";
 $("habitList").innerHTML="";
 habits.forEach(h=>{
  const done=state.checks.includes(h.id),row=document.createElement("div");row.className=`habit${done?" done":""}`;
  const check=document.createElement("button");check.className="check";check.textContent=done?"✓":"";check.setAttribute("aria-label",done?"Mark incomplete":"Mark complete");check.onclick=()=>toggle(h.id);
  const copy=document.createElement("div");copy.className="habit-copy";
  const name=document.createElement("div");name.className="habit-name";name.textContent=h.name;
  const detail=document.createElement("div");detail.className="habit-detail";detail.textContent=h.detail||"Your personal habit";
  copy.append(name,detail);
  const del=document.createElement("button");del.className="delete-habit";del.textContent="×";del.setAttribute("aria-label",`Delete ${h.name}`);del.onclick=()=>removeHabit(h.id);
  row.append(check,copy,del);$("habitList").append(row);
 });
 updateProgress();
}
function updateProgress(){
 const total=habits.length,done=habits.filter(h=>state.checks.includes(h.id)).length,pct=total?Math.round(done/total*100):0;
 $("completedCount").textContent=done;$("totalCount").textContent=total;$("percent").textContent=pct+"%";$("progressFill").style.width=pct+"%";
 $("remainingText").textContent=total-done===0?"Everything complete — nice work!":`${total-done} left to go`;
 $("streakText").textContent=`🔥 ${state.streak||0} day streak`;
}
function toggle(id){
 const wasComplete=state.checks.length===habits.length&&habits.length>0;
 state.checks=state.checks.includes(id)?state.checks.filter(x=>x!==id):[...state.checks,id];
 const complete=habits.length>0&&habits.every(h=>state.checks.includes(h.id));
 if(complete&&!wasComplete&&state.lastComplete!==dayKey()){
  const yesterday=new Date();yesterday.setDate(yesterday.getDate()-1);const y=`${yesterday.getFullYear()}-${String(yesterday.getMonth()+1).padStart(2,"0")}-${String(yesterday.getDate()).padStart(2,"0")}`;
  state.streak=state.lastComplete===y?(state.streak||0)+1:1;state.lastComplete=dayKey();toast("All habits complete. Great work!");
 }
 saveState();render();
}
function removeHabit(id){habits=habits.filter(h=>h.id!==id);state.checks=state.checks.filter(x=>x!==id);saveHabits();saveState();render()}
function toast(msg){const el=$("toast");el.textContent=msg;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),1900)}
$("addHabitButton").onclick=()=>{editingId=null;$("dialogTitle").textContent="Add a habit";$("habitName").value="";$("habitDialog").showModal();$("habitName").focus()};
$("habitForm").addEventListener("submit",e=>{e.preventDefault();const name=$("habitName").value.trim();if(!name)return;habits.push({id:`h${Date.now()}`,name,detail:"Your personal habit"});saveHabits();$("habitDialog").close();render();toast("Habit added")});
$("goalInput").addEventListener("input",e=>{state.goal=e.target.value;saveState();$("goalStatus").textContent="Saved automatically"});
$("noteInput").addEventListener("input",e=>{state.note=e.target.value;saveState()});
$("clearGoal").onclick=()=>{state.goal="";$("goalInput").value="";saveState();$("goalStatus").textContent="Goal cleared"};
$("resetButton").onclick=()=>{if(confirm("Clear today's habit checks? Your habits, goal and note will stay.")){state.checks=[];saveState();render();toast("Today's checks reset")}};
$("themeButton").onclick=()=>{document.body.classList.toggle("dark");localStorage.setItem("db-dark",document.body.classList.contains("dark"));$("themeButton").textContent=document.body.classList.contains("dark")?"☀":"☾"};
if(read("db-dark",false)){document.body.classList.add("dark");$("themeButton").textContent="☀"}
if("serviceWorker" in navigator && location.protocol.startsWith("http"))navigator.serviceWorker.register("./service-worker.js").catch(()=>{});
render();
