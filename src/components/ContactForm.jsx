import {useRef,useState} from 'react'
import {MSG,T,useLang} from '../i18n'

// No backend is configured, so the form opens the visitor's mail client (mailto fallback).
export default function ContactForm(){
  const {lang}=useLang(),ref=useRef(null)
  const [state,setState]=useState({kind:'',busy:false})
  const submit=e=>{
    e.preventDefault()
    const f=ref.current
    ;[...f.elements].forEach(x=>x.name&&x.setAttribute('aria-invalid',!x.checkValidity()||(x.name==='e'&&!x.value.includes('@'))))
    const bad=f.querySelector('[aria-invalid=true]')
    if(bad){setState({kind:'bad',busy:false});bad.focus();return}
    setState({kind:'ok',busy:true});setTimeout(()=>setState(s=>({...s,busy:false})),2500)
    location.href='mailto:eovowasoa10180@gmail.com?subject='+encodeURIComponent(f.s.value)+'&body='+encodeURIComponent('From: '+f.n.value+' <'+f.e.value+'>\n\n'+f.m.value)
  }
  return (
    <form id="f" ref={ref} className="glass rv" noValidate onSubmit={submit}>
      <label><T k="f1" className="mono">FULL NAME</T><input name="n" required autoComplete="name"/></label>
      <label><T k="f2" className="mono">EMAIL ADDRESS</T><input name="e" type="email" required autoComplete="email" dir="ltr"/></label>
      <label><T k="f3" className="mono">SUBJECT</T><input name="s" required/></label>
      <label><T k="f4" className="mono">MESSAGE</T><textarea name="m" required/></label>
      <T as="button" k="f5" className="btn p" type="submit" disabled={state.busy}>SEND MESSAGE</T>
      <p id="fm" role="status" style={state.kind==='bad'?{color:'#ff6b6b'}:undefined}>{state.kind?MSG[lang][state.kind]:''}</p>
    </form>
  )
}
