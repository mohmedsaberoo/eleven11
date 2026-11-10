import {memo} from 'react'
import {T} from '../i18n'
function Training(){
  return (
<section id="training">
<T as="h2" k="t_h" className="rv">TRAIN. ANALYZE.<br/>UNDERSTAND.</T>
<T as="p" k="t_d" className="lead rv">Continuous hands-on learning through authorized cybersecurity environments, technical investigation, and practical security exercises. TryHackMe is my main training platform.</T>
<div className="tr">
<div className="glass rv"><span className="mono">01</span><T as="b" k="t1">Interactive cybersecurity labs</T></div>
<div className="glass rv"><span className="mono">02</span><T as="b" k="t2">Network security exercises</T></div>
<div className="glass rv"><span className="mono">03</span><T as="b" k="t3">Web application security learning</T></div>
<div className="glass rv"><span className="mono">04</span><T as="b" k="t4">Vulnerability analysis</T></div>
<div className="glass rv"><span className="mono">05</span><T as="b" k="t5">Technical problem-solving</T></div>
<div className="glass rv"><span className="mono">06</span><T as="b" k="t6">Continuous practical development</T></div>
</div>
</section>
  )
}

export default memo(Training)
