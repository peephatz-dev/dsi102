import { useState } from 'react';
import { StudyModule, StudySubsection } from '../../types/course';
import { getTeachingScenes } from './teachingScenes';
import { PROCESS_SCENARIOS } from './processCatalog';
import { ProcessLab } from './ProcessLab';
export function TopicProcessLab({module,sub}:{module:StudyModule;sub:StudySubsection}){
 const scenes=getTeachingScenes(module,sub),[selected,setSelected]=useState(scenes[0]);
 return <div className="topic-working-model">{scenes.length>1&&<label className="teaching-scene-selector">เลือกกระบวนการที่ต้องการสังเกต <select value={selected} onChange={e=>setSelected(e.target.value)} aria-label={`เลือกภาพสาธิต ${sub.id}`}>{scenes.map(id=><option key={id} value={id}>{PROCESS_SCENARIOS[id].title}</option>)}</select></label>}<ProcessLab key={selected} module={module} scenarioId={selected} sourcePage={sub.pdfPage||module.pdfPageStart} topicTitle={sub.thaiTitle||sub.title}/></div>;
}
