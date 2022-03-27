import HqDiv from "./HqDiv";
import HqTextarea from "./HqTextarea";
import appState from '../states/HqAppState'
import { useState } from "react";

import {finishTask} from '../HqUtils/HqNetUtils'

function HqDoTask(){
    const [finnishResult, setFinnishResult] = useState();
    const doTask = async ()=>{
        console.log(appState.taskId);
        console.log(appState.game_id);
        console.log(appState.token);
        if(appState.taskId&&appState.game_id&&appState.token){
            const out = await finishTask(appState.taskId,appState.game_id,appState.token);
            setFinnishResult(JSON.stringify(out.data));
        }

    };
    return(
        <HqDiv>
            <button onClick={doTask}>完成关卡任务</button>
            <HqTextarea result={finnishResult}></HqTextarea>
        </HqDiv>
    );
}
export default HqDoTask;