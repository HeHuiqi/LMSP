import HqInput from "./HqInput";
import HqDiv from "./HqDiv";
import HqTextarea from "./HqTextarea";

import appState from '../states/HqAppState'
import { useState, useEffect } from "react";
import { getTaskDetail, finishTask,getWordTaskDetail,finishWordTask,reqMock } from '../HqUtils/HqNetUtils';

import HqSelectTask from '../compontents/HqSelectTask';
let currentId = 1;
window.endTask = false;

function HqAutoDoTask() {
    const [taskType, setTaskType] = useState(0);
    const [taskId, setTaskId] = useState(1);
    const [finnishResult, setFinnishResult] = useState();
    const [gameId, setGameId] = useState('');
    const [reqInterval, setReqInterval] = useState(5); //秒

    let timer;
    let isInput = false;
    useEffect(() => {

        return () => {
            return clearInterval(timer);
        };
    }, [timer]);

    const onSelectChageTaskType = (index) => {
        setTaskType(index);
    }
    const onInputChangeTaskId = (event) => {
        // console.log('event:',event);
        // setTaskId(event.target.value);
        isInput = true;
        console.log('taskId:', taskId);
        appState.taskId = parseInt(event.target.value);
        const value = event.target.value;
        currentId = parseInt(value);
        console.log('currentId-:', currentId);

    };
    const onInputChangeInterval = (event) => {
        if (event.target.value) {
            const delay = parseInt(event.target.value);
            if (delay > 10) {
                setReqInterval(delay);
            }
        }
    };

    const reqDoStoryTask = async (taskId, isAuto) => {

        // console.log('taskid:',taskId);
        // const task = await getTaskDetail(taskId);
        // console.log('getTaskDetail:',task.data);
        // return;

        console.log('currentId:', currentId);


        setFinnishResult('');
        console.log('autoToTask');
        const task = await getTaskDetail(taskId);
        console.log('getTaskDetail:', task);
        const game_id = task.data.game_id;
        console.log('gameid:', gameId);
        console.log('game_id:', game_id);

        if (gameId !== game_id) {
            setGameId(game_id);
            const tid = '' + taskId;
            const finishOut = await finishTask(tid, game_id, appState.token);
            const outData = finishOut.data;

            if (outData) {
                console.log('outData:', outData);

                setFinnishResult(JSON.stringify(outData));
                console.log('outData.energy_now:', outData.energy_now);
                console.log('outData.energy_spent:', outData.energy_spent);

                if (outData.energy_now === 0) {
                    window.endTask = true;
                    alert('没有精力了，休息一下吧！');
                } else {
                    console.log('outData.energy_spent-inner:', outData.energy_spent);
                    if (outData.energy_spent === 0) {

                        if (isAuto) {
                            currentId = currentId + 1;
                        }
                        console.log('finish-currentId:', currentId);
                    }
                }

            }
        }
    }
    const reqDoWordTask = async (taskId, isAuto) => {

        // console.log('taskid:',taskId);
        // const task = await getTaskDetail(taskId);
        // console.log('getTaskDetail:',task.data);
        // return;

        if(window.endTask == true){
            return
        }

        console.log('currentId:', currentId);


        setFinnishResult('');
        console.log('autoToTask');
        const task = await getWordTaskDetail(taskId);
        console.log('getTaskDetail:', task);
        const game_id = task.data.game_id;
        console.log('gameid:', gameId);
        console.log('game_id:', game_id);

        if (gameId !== game_id) {
            setGameId(game_id);
            const words = task.data.words; 
            const wordIDs = words.map((word)=>{
                return word.id;
            });
            const total = JSON.stringify(wordIDs.length);
            const error = "0";
            const finishOut = await finishWordTask(game_id, error,total,wordIDs);
            const outData = finishOut.data;

            if (outData) {
                console.log('outData:', outData);

                setFinnishResult(JSON.stringify(outData));
                console.log('outData.energy_now:', outData.energy_now);
                console.log('outData.energy_spent:', outData.energy_spent);

                if (outData.energy_now === 0) {
                    window.endTask = true;
                    alert('没有精力了，休息一下吧！');
                } else {
                    console.log('outData.energy_spent-inner:', outData.energy_spent);
                    if (outData.energy_spent === 0) {

                        if (isAuto) {
                            currentId = currentId + 1;
                        }
                        console.log('finish-currentId:', currentId);
                    }
                }

            }
        }
    }


    const manualDoTask = async () => {
        isInput = false;
        window.endTask = false;
        console.log('doTaskID:', currentId);
        console.log('taskType:', taskType);
        if (currentId > 0) {

            switch (taskType) {
                case 1:
                    
                    break;
                case 2:
                    await reqDoStoryTask(currentId, false);

                    break;
            
                default:
                    await reqDoWordTask(currentId,false);
                    // await getWordTaskDetail(currentId);
                    break;
            }
        }
    }

    const testReqMock = async function(){
        if(window.endTask){
            return;
        }
        await reqMock();
    };
 
    const autoToTask = async function () {
        isInput = false;
        window.endTask = false;

        console.log('doTaskID:', currentId);
        console.log('taskType:', taskType);


        if (currentId > 0) {
            const timerFn = async () => {
                console.log('isInput:', isInput);
                console.log('window.endTask:', window.endTask);

                if (isInput === false && window.endTask === false) {
                    switch (taskType) {
                        case 1:
                            
                            break;
                        case 2:
                            await reqDoStoryTask(currentId, true);
        
                            break;
                    
                        default:

                            // await testReqMock();
                            await reqDoWordTask(currentId,true);
                            break;
                    }
                }
            };
            timerFn();
            timer = setInterval(timerFn, reqInterval * 1000);
        }


    }
    const stopDoTask = function () {
        window.endTask = true;
        console.log('isInput:', isInput);
        console.log('window.endTask:', window.endTask);
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }
    return (
        <HqDiv>
            <HqSelectTask onSelectChage={onSelectChageTaskType}></HqSelectTask>
            <HqInput inputId='taskIdIInput' inputName={'初始关卡ID默认从1开始'} onInputChange={onInputChangeTaskId} defaultValue={currentId} ></HqInput>
            <HqInput inputName={'输入请求间隔（秒）'} onInputChange={onInputChangeInterval} defaultValue={reqInterval}></HqInput>
            <button onClick={autoToTask}>自动做任务</button>
            <button onClick={stopDoTask}>停止自动做任务</button>
            <button onClick={manualDoTask}  >手动做任务</button>
            <HqTextarea result={finnishResult} isReadOnly={true}></HqTextarea>
        </HqDiv>
    );
}
export default HqAutoDoTask;