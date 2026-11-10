import {useState} from 'react'
import {useT} from '../i18n'
// Copies a contact value to the clipboard and reports the real result (success or failure).
export default function CopyBtn({text,inline}){
  const tt=useT(),[st,setSt]=useState('')
  const go=async()=>{try{await navigator.clipboard.writeText(text);setSt('ok')}catch(e){setSt('err')}setTimeout(()=>setSt(''),1800)}
  return <button type="button" className={'cp mono'+(inline?' in':'')} onClick={go} aria-live="polite" aria-label={tt('copy','Copy')+' '+text}>{st==='ok'?tt('copied','COPIED ✓'):st==='err'?tt('cfail','COPY FAILED'):tt('copy','COPY')}</button>
}
