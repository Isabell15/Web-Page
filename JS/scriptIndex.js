// animacion principal inicio
(()=>{

/* utilidadess colores */
const C=['#FF69B4','#FFB6C1','#FF1493','#FF6347','#FFA500','#FFD700','#ADFF2F','#00FF7F','#00CED1','#1E90FF','#9370DB','#DA70D6'],
      R=n=>Math.random()*n,P=()=>C[~~R(C.length)],
      cv=document.createElement('canvas'),ctx=cv.getContext('2d');
cv.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999';
document.body.appendChild(cv);const fit=()=>{cv.width=innerWidth;cv.height=innerHeight};fit();addEventListener('resize',fit);

/*  estrellas */
class S{constructor(){this.rst();this.t=R(6.28)}rst(){this.x=R(cv.width);this.y=R(cv.height);this.s=R(8)+4;this.v=R(2)+.5;this.c=P();this.r=0}
u(){this.y+=this.v;this.r+=.1;this.t+=.15;if(this.y>cv.height+20)this.rst()}
d(){ctx.save();ctx.globalAlpha=(Math.sin(this.t)+1)*.4+.2;ctx.translate(this.x,this.y);ctx.rotate(this.r);ctx.fillStyle=this.c;ctx.beginPath();
for(let i=0;i<5;i++){const a=i*1.256,x=Math.cos(a)*this.s,y=Math.sin(a)*this.s;i?ctx.lineTo(x,y):ctx.moveTo(x,y);
const ia=(i+.5)*1.256;ctx.lineTo(Math.cos(ia)*this.s*.4,Math.sin(ia)*this.s*.4)}ctx.fill();ctx.restore()}}
const stars=[...Array(100)].map(()=>new S());

/* globos*/
class B{constructor(){this.rst()}rst(){this.x=R(cv.width);this.y=cv.height+40;this.s=R(12)+10;this.v=R(1)+.8;this.w=R(2)+1;this.c=P();this.t=0}
u(){this.y-=this.v;this.t+=.05;this.x+=Math.sin(this.t)*this.w;if(this.y<-80)this.rst()}
d(){ctx.fillStyle=this.c;ctx.beginPath();ctx.ellipse(this.x,this.y,this.s,this.s*1.2,0,0,6.28);ctx.fill();
ctx.strokeStyle='#333';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(this.x,this.y+this.s);ctx.lineTo(this.x,this.y+this.s+22);ctx.stroke()}}
const balloons=[...Array(10)].map(()=>new B());

/* confeti */
class F{constructor(x,y){this.x=x;this.y=y;this.vx=(R(10)-5)*2;this.vy=-(R(8)+5);this.l=120;this.s=R(8)+5;this.c=P();this.r=0;this.rs=R(.4)-.2}
u(){this.x+=this.vx;this.y+=this.vy;this.vy+=.3;this.r+=this.rs;this.l--}
d(){ctx.save();ctx.globalAlpha=this.l/120;ctx.translate(this.x,this.y);ctx.rotate(this.r);ctx.fillStyle=this.c;
ctx.fillRect(-this.s/2,-this.s/2,this.s,this.s);ctx.restore()}}
const confetti=[],boom=(x,y)=>{for(let i=0;i<30;i++)confetti.push(new F(x,y))};

/*  arcoíris cursor */
const rainbow={pts:[],cs:['#F00','#F70','#FF0','#0F0','#00F','#40F','#90D'],
 add(x,y){this.pts.push({x,y,l:30});this.pts.length>50&&this.pts.shift()},
 u(){this.pts.forEach(p=>p.l--);this.pts=this.pts.filter(p=>p.l>0)},
 d(){if(this.pts.length<2)return;this.cs.forEach((c,i)=>{ctx.strokeStyle=c;ctx.lineWidth=8-i;ctx.beginPath();
 this.pts.forEach((p,j)=>{ctx.globalAlpha=p.l/30*.7;j?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y)});ctx.stroke()});ctx.globalAlpha=1}}
;
/* fondo arcoíris animado */
const bg=document.createElement('div');
bg.style.cssText='position:fixed;inset:0;background:linear-gradient(45deg,rgba(255,0,150,.1),rgba(0,255,255,.1),rgba(255,255,0,.1));background-size:400% 400%;animation:r 8s infinite;pointer-events:none;z-index:1';
document.body.prepend(bg);
/* css clave */
const st=document.createElement('style');
st.textContent='@keyframes r{0%{background-position:0 50%}50%{background-position:100% 50%}100%{background-position:0 50%}}';
document.head.appendChild(st);
/* bucle */
(function A(){
  ctx.clearRect(0,0,cv.width,cv.height);
  stars.forEach(s=>{s.u();s.d()});
  balloons.forEach(b=>{b.u();b.d()});
  for(let i=confetti.length;i--;)confetti[i].u(),confetti[i].d(),confetti[i].l<=0&&confetti.splice(i,1);
  rainbow.u();rainbow.d();
  requestAnimationFrame(A)
})();
/* explosiones aleatorias */
setInterval(()=>boom(R(cv.width),R(cv.height*.3)),4000);

})();
