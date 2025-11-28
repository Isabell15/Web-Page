// 🦋✨ JARDÍN MÁGICO COMPACTO PARA NIÑOS ✨🦋
(()=>{
  const C=['#FF69B4','#FFB6C1','#FF1493','#FF6347','#FFA500','#FFD700','#ADFF2F','#00FF7F','#00CED1','#1E90FF','#9370DB','#DA70D6'],
  R=n=>Math.random()*n,P=()=>C[~~R(C.length)],cv=document.createElement('canvas'),ctx=cv.getContext('2d');
  cv.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999';
  document.body.appendChild(cv);const resize=()=>{cv.width=innerWidth;cv.height=innerHeight};addEventListener('resize',resize);resize();

  // 🫧 Burbujas
  class B{constructor(){this.reset();this.p=R(6.28);}reset(){this.x=R(cv.width);this.y=cv.height+50;this.s=R(40)+20;this.v=R(2)+1;this.w=R(3)+1;this.c=P();this.o=R(.3)+.7;}
  update(){this.y-=this.v;this.p+=.03;this.x+=Math.sin(this.p)*this.w;if(this.y<-100)this.reset();}
  draw(){const g=ctx.createRadialGradient(this.x-this.s*.3,this.y-this.s*.3,0,this.x,this.y,this.s);g.addColorStop(0,this.c+'80');g.addColorStop(.7,this.c+'40');g.addColorStop(1,this.c+'10');
  ctx.save();ctx.globalAlpha=this.o;ctx.fillStyle=g;ctx.beginPath();ctx.arc(this.x,this.y,this.s,0,6.28);ctx.fill();ctx.strokeStyle='rgba(255,255,255,0.8)';ctx.lineWidth=2;ctx.stroke();ctx.restore();}}

  // 🦋 Mariposas
  class M{constructor(){this.reset();this.wp=R(6.28);}reset(){this.x=-50;this.y=R(cv.height*.8)+50;this.v=R(1.5)+.8;this.ws=R(.3)+.15;this.c1=P();this.c2=P();this.s=R(15)+10;this.f=R(2)+1;}
  update(){this.x+=this.v;this.wp+=this.ws;this.y+=Math.sin(this.x*.01)*this.f;if(this.x>cv.width+100)this.reset();}
  draw(){ctx.save();ctx.translate(this.x,this.y);const w=Math.sin(this.wp)*.3+.7;ctx.fillStyle=this.c1;ctx.beginPath();ctx.ellipse(-this.s*.5,0,this.s*w,this.s*.8,.3,0,6.28);ctx.fill();
  ctx.fillStyle=this.c2;ctx.beginPath();ctx.ellipse(this.s*.5,0,this.s*w,this.s*.8,-.3,0,6.28);ctx.fill();ctx.fillStyle=this.c1;ctx.beginPath();ctx.ellipse(-this.s*.3,this.s*.5,this.s*.6*w,this.s*.5,.5,0,6.28);ctx.fill();
  ctx.fillStyle=this.c2;ctx.beginPath();ctx.ellipse(this.s*.3,this.s*.5,this.s*.6*w,this.s*.5,-.5,0,6.28);ctx.fill();ctx.fillStyle='#4B0082';ctx.fillRect(-2,-this.s*.8,4,this.s*1.6);ctx.restore();}}

  // ✨ Purpurina
  class G{constructor(x,y){this.x=x;this.y=y;this.vx=(R(10)-5)*3;this.vy=-(R(8)+3);this.l=150;this.s=R(6)+3;this.c=P();this.r=0;this.rs=R(.4)-.2;}
  update(){this.x+=this.vx;this.y+=this.vy;this.vy+=.15;this.r+=this.rs;this.l--;this.vx*=.99;}
  draw(){ctx.save();ctx.globalAlpha=this.l/150;ctx.translate(this.x,this.y);ctx.rotate(this.r);ctx.fillStyle=this.c;ctx.beginPath();ctx.moveTo(0,-this.s);ctx.lineTo(this.s*.7,0);ctx.lineTo(0,this.s);ctx.lineTo(-this.s*.7,0);ctx.fill();ctx.restore();}}

  // 🌟 Estrellas
  class S{constructor(){this.x=R(cv.width);this.y=R(cv.height);this.s=R(4)+2;this.c=P();this.p=R(6.28);this.sp=R(.05)+.02;}
  update(){this.p+=this.sp;}draw(){const a=(Math.sin(this.p)+1)/2*.8+.2;ctx.save();ctx.globalAlpha=a;ctx.fillStyle=this.c;ctx.translate(this.x,this.y);ctx.beginPath();ctx.moveTo(0,-this.s);ctx.lineTo(this.s*.3,-this.s*.3);ctx.lineTo(this.s,0);ctx.lineTo(this.s*.3,this.s*.3);ctx.lineTo(0,this.s);ctx.lineTo(-this.s*.3,this.s*.3);ctx.lineTo(-this.s,0);ctx.lineTo(-this.s*.3,-this.s*.3);ctx.fill();ctx.restore();}}

  const bubbles=[...Array(20)].map(()=>new B()),butterflies=[...Array(6)].map(()=>new M()),stars=[...Array(50)].map(()=>new S()),flowers=[],glitter=[];
  const boom=(x,y)=>{for(let i=0;i<25;i++)glitter.push(new G(x,y));};

  document.addEventListener('click',e=>{boom(e.clientX,e.clientY);flowers.push(new F(e.clientX,e.clientY));});
  document.querySelectorAll('.card,.enlace-card,nav a,button').forEach(el=>el.addEventListener('mouseenter',e=>{const r=e.target.getBoundingClientRect();boom(r.left+r.width/2,r.top+r.height/2);flowers.push(new F(r.left+r.width/2,r.top+r.height/2));}));

  (function A(){ctx.clearRect(0,0,cv.width,cv.height);stars.forEach(s=>{s.update();s.draw();});bubbles.forEach(b=>{b.update();b.draw();});butterflies.forEach(m=>{m.update();m.draw();});
  for(let i=flowers.length-1;i>=0;i--){flowers[i].update();flowers[i].draw();if(flowers[i].l<=0)flowers.splice(i,1);}
  for(let i=glitter.length-1;i>=0;i--){glitter[i].update();glitter[i].draw();if(glitter[i].l<=0)glitter.splice(i,1);}requestAnimationFrame(A);})();

  setInterval(()=>{boom(R(cv.width),R(cv.height*.6));if(flowers.length<5)flowers.push(new F(R(cv.width),R(cv.height*.8)+100));},3000);
  console.log('🦋✨ ¡CRECIENDO SANOS! ✨🦋');
})();