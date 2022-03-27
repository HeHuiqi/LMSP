import HqInput from "./HqInput";
import HqDiv from "./HqDiv";
import HqTextarea from "./HqTextarea";

import appState from '../states/HqAppState'
import { useState } from "react";
import {getTaskDetail} from '../HqUtils/HqNetUtils'

function HqGetTask(){

    const [taskId, setTaskId] = useState();
    const [taskInfo, setTaskInfo] = useState();
    const onInputChangeTaskId = (event)=>{
        setTaskId(event.target.value);
        console.log(taskId);
        appState.taskId = event.target.value;
         
    };
    const getTask = async function (){
        if(taskId){
           const task = await getTaskDetail(taskId);
        //    console.log('getTaskDetail:',task.data);
            const game_id  = task.data.game_id;
           appState.game_id = game_id;
           const tInfo = {taskId, game_id };
           setTaskInfo(JSON.stringify(tInfo));
        }
    }
    return (
        <HqDiv>
            <HqInput inputName={'关卡ID'} onInputChange={onInputChangeTaskId}></HqInput>
            <button onClick={getTask}>获取关卡详情</button>
            <HqTextarea result={taskInfo}></HqTextarea>
        </HqDiv>
    );
}
export default HqGetTask;