
//fondo de las actividades
(()=>{const C=['#FF69B4','#FFD700','#ADFF2F','#00CED1','#1E90FF','#9370DB'],R=n=>Math.random()*n,P=()=>C[~~R(C.length)],cv=document.createElement('canvas'),ctx=cv.getContext('2d');cv.style.cssText='position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999';document.body.appendChild(cv);addEventListener('resize',()=>{cv.width=innerWidth;cv.height=innerHeight});cv.width=innerWidth;cv.height=innerHeight;
/*  Estrellas */
class S{constructor(){this.x=R(cv.width);this.y=R(cv.height);this.s=R(6)+4;this.c=P();this.t=R(6.28);this.r=0}u(){this.t+=.15;this.r+=.04}d(){ctx.save();ctx.globalAlpha=.6+Math.sin(this.t)*.4;ctx.translate(this.x,this.y);ctx.rotate(this.r);ctx.fillStyle=this.c;ctx.beginPath();ctx.moveTo(0,-this.s);for(let i=0;i<10;i++){const a=i*.628,r=i&1?this.s*.4:this.s;ctx.lineTo(Math.sin(a)*r,-Math.cos(a)*r)}ctx.fill();ctx.restore()}}
/* Fuegos artificiales */
class F{constructor(x,y){this.x=x;this.y=y;this.vx=(R(8)-4)*1.6;this.vy=-(R(8)+4);this.l=100;this.s=R(6)+3;this.c=P();this.tr=[]}u(){this.x+=this.vx;this.y+=this.vy;this.vy+=.15;this.l--;this.tr.push({x:this.x,y:this.y,l:18});this.tr=this.tr.filter(t=>--t.l)}d(){this.tr.forEach(t=>{ctx.save();ctx.globalAlpha=t.l/18*.5;ctx.fillStyle=this.c;ctx.beginPath();ctx.arc(t.x,t.y,this.s*(t.l/18),0,6.28);ctx.fill();ctx.restore()});ctx.save();ctx.globalAlpha=this.l/100;ctx.fillStyle=this.c;ctx.beginPath();ctx.arc(this.x,this.y,this.s,0,6.28);ctx.fill();ctx.restore()}}
const stars=[...Array(40)].map(()=>new S()),fw=[];const boom=(x,y)=>{for(let i=0;i<20;i++)fw.push(new F(x,y))};
/* Esquinas automáticas */
setInterval(()=>{const p=[[60,60],[cv.width-60,60],[60,cv.height-60],[cv.width-60,cv.height-60]][~~R(4)];boom(...p)},3500);
/* Click */
addEventListener('click',e=>boom(e.clientX,e.clientY));
/* Animación */
(function anim(){ctx.clearRect(0,0,cv.width,cv.height);stars.forEach(s=>{s.u();s.d()});for(let i=fw.length-1;i>=0;i--){fw[i].u();fw[i].d();if(!fw[i].l)fw.splice(i,1)}requestAnimationFrame(anim)})();
})();

