const CH='01ABCDEF#$%&*<>/'
export function scr(el,to,dur,cb){const L0=Math.max(el.textContent.length,to.length),t0=performance.now()
  ;(function f(t){const p=Math.min(1,(t-t0)/dur);let s='';for(let i=0;i<L0;i++)s+=p>(i+1)/(L0+1)?(to[i]||''):(i<to.length||p<.6?CH[Math.random()*CH.length|0]:'');el.textContent=s;el.classList.toggle('g',p<1);if(p<1)requestAnimationFrame(f);else{el.textContent=to;cb&&cb()}})(t0)}
