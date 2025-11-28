/* kidsFun  */
(()=>{

/* utilidades */
const C=['#ff6b6b','#ffd6a5','#caffbf','#9bf6ff','#a0c4ff','#bdb2ff','#ffc6ff','#4ecdc4','#f94144','#577590'],
      R=n=>Math.random()*n,P=()=>C[~~R(C.length)],
      cv=document.createElement('canvas'),g=cv.getContext('2d');
cv.style.cssText='position:fixed;inset:0;pointer-events:none;z:10000';document.body.appendChild(cv);
const fit=()=>{cv.width=innerWidth;cv.height=innerHeight};fit();addEventListener('resize',fit);

/*  estrellas */
class S{constructor(){this.x=R(innerWidth);this.y=R(innerHeight);this.s=R(2)+.7;this.v=R(.4)+.15;this.c=P()}
u(){(this.y+=this.v)>innerHeight&&(this.y=0)}d(){g.globalAlpha=.3+Math.sin(this.y*.03+Date.now()*.002)*.35;g.fillStyle=this.c;g.fillRect(this.x,this.y,this.s,this.s)}}
const stars=[...Array(450)].map(()=>new S());

/* meteoros */
class M{constructor(){this.rst()}rst(){this.x=R(innerWidth*.8);this.y=R(innerHeight*.3);this.dx=4+R(3);this.dy=4+R(3);this.l=70}
u(){this.x+=this.dx;this.y+=this.dy;this.l--}d(){g.strokeStyle='#fff';g.lineWidth=2;g.globalAlpha=this.l/70;g.beginPath();g.moveTo(this.x,this.y);g.lineTo(this.x-this.dx*4,this.y-this.dy*4);g.stroke()}}
const mets=[];setInterval(()=>mets.push(new M()),4000);

/*  partículas */
class Ptc{constructor(x,y,b){Object.assign(this,{x,y,vx:R(4)-2,vy:R(4)-2,l:b?160:110,s:b?R(9)+7:R(6)+3,c:P()})}
u(){this.x+=this.vx;this.y+=this.vy;this.vy-=.1;this.l--}
d(){g.globalAlpha=this.l/160;g.fillStyle=this.c;g.beginPath();g.arc(this.x,this.y,this.s*this.l/160,0,6.28);g.fill()}}
const pts=[],boom=(x,y,b,n=b?50:25)=>{for(;n--;)pts.push(new Ptc(x,y,b))};

/* auto‑explosiones */
setInterval(()=>boom(R(innerWidth),R(innerHeight*.25),0,20),3000);
setInterval(()=>boom(R(innerWidth),R(innerHeight*.35),1,60),9000);

/*  burbujas */
const bub=()=>{const d=document.createElement('div');
Object.assign(d.style,{position:'fixed',left:R(100)+'%',bottom:'-50px',width:'38px',height:'38px',borderRadius:'50%',background:P(),opacity:.45,transform:`scale(${R(1)+.7})`,animation:'b 10s linear forwards',pointerEvents:'none',z:10001});
document.body.appendChild(d);setTimeout(()=>d.remove(),1e4)};setInterval(bub,900);

/*  nubes */
const cloud=()=>{const d=document.createElement('div'),s=100+R(120);
Object.assign(d.style,{position:'fixed',top:R(35)+'vh',left:'-180px',width:s+'px',height:s*.6+'px',background:'#ffffffc0',borderRadius:'50%',filter:'blur(4px)',animation:`c ${50+R(30)}s linear infinite`,pointerEvents:'none',z:9999});
document.body.appendChild(d)};
[...Array(8)].forEach(cloud);

/* arcoíris */
const rb=document.createElement('div');
Object.assign(rb.style,{position:'fixed',inset:0,background:'linear-gradient(45deg,#f00,#f80,#ff0,#0f0,#00f,#50f,#80f)',backgroundSize:'300% 300%',opacity:.3,mixBlendMode:'screen',animation:'r 6s linear infinite',pointerEvents:'none',z:9998});
document.body.appendChild(rb);

/* css clave fondooo */
const st=document.createElement('style');
st.textContent=`
@keyframes b{to{transform:translateY(-140vh) scale(.8);opacity:0}}
@keyframes c{to{transform:translateX(calc(100vw + 350px))}}
@keyframes r{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:200% 50%}}
@keyframes h{0%{filter:hue-rotate(0)}100%{filter:hue-rotate(360deg)}}`;
document.head.appendChild(st);document.body.style.animation='h 18s linear infinite';

/* interacciones */
document.querySelectorAll('.card,.animated-link').forEach(el=>{
  el.addEventListener('mouseenter',e=>boom(e.pageX,e.pageY));
  el.addEventListener('click',e=>boom(e.pageX,e.pageY,1))
});
addEventListener('mousemove',e=>R(1)>.75&&pts.push(new Ptc(e.clientX,e.clientY)));
addEventListener('click',e=>boom(e.clientX,e.clientY,1));

/* bucle */
(function loop(){
  g.clearRect(0,0,cv.width,cv.height);
  stars.forEach(s=>{s.u();s.d()});
  for(let i=mets.length;i--;)mets[i].u(),mets[i].d(),mets[i].l<=0&&(mets.splice(i,1));
  for(let i=pts.length;i--;)pts[i].u(),pts[i].d(),pts[i].l<=0&&(pts.splice(i,1));
  requestAnimationFrame(loop)
})();
})();
