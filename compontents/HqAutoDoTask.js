import HqInput from "./HqInput";
import HqDiv from "./HqDiv";
import HqTextarea from "./HqTextarea";

import appState from '../states/HqAppState'
import { useState,useEffect } from "react";
import {getTaskDetail,finishTask} from '../HqUtils/HqNetUtils'
let currentId = 1;

function HqAutoDoTask(){
    const [taskId, setTaskId] = useState(1);
    const [finnishResult, setFinnishResult] = useState();
    const [gameId,setGameId] = useState('');
    const [reqInterval, setReqInterval] = useState(3); //秒

    appState.token = 'ZKZ9DgTZxf3be2BRp8WP9DXru0C6ZJ7ksbBKPmyc3EGscVYuN1Qby/3/U1o61F1dgXVD6zcbLP5DLxW9EfNMMmDufiCG5ECtM1WSnUdeq+7Mved1MT7kANViQotg0xoxVMPkc9pwaeNoFudEyx3j6zcpGUQUF/ats3vWVc8UTviLn/PGQ5np4I4dwAjB8kp9Ks48xiIpfs1MM3daxJP8ZX6Eg/ukgz+2znE8i0m3fMMJRDdhP1HFH8PZOcertEud/1zKwYJb2Ibgt/lm426ztrHAbPtjtA+vTKP51PY9ezrzOupRFsbBizi/RcorFHMHQycCjZlDl8KycSLzavXkaifOyBBcWiOByREsZacaeu97NOUz7f5Vr0WSd6WzjjdlleMytb2dTtHo+NWNl9f6AZ9MrISq1wcWm4eeSXTXwVV2eJb3ENTK4hO0wrqMRi8wHXtmh7yGIeBJRQRkrQmGFp2f/VINfArimHRN+FCt2WGt88SNFCZlgTbcte+JbQYDA5uqPgy0k9Hcz47IpP3CLjZ/MZLdJx2FWqJxGeoCcHOCFY9+cRUuu8SpOcxAuwIGtpcbRD2IEOxIFs2JeqQ8JMK2lJS0t8FV94sSz7PxArqYtpKE16fc9OCgcYrDPYub4gk/b9FeKWoYGpKaJ5+VR4lzLPmuh9JFXifOvlI0cCvJLaLRajGU1HkaxdEVhT3/LoDBdPbM+7E1JwnFgSX4nu4=';

    let timer;
    let isInput = false;
    let endTask = false;
    useEffect(() => {
        
        return () => {
            return clearInterval(timer);
        };
    }, [timer]);
    
    const onInputChangeTaskId = (event)=>{
        // console.log('event:',event);
        // setTaskId(event.target.value);
        isInput = true;
        console.log('taskId:',taskId);
        appState.taskId = parseInt(event.target.value);
        const value = event.target.value;
        currentId = parseInt(value);
        console.log('currentId-:',currentId);
         
    };
    const onInputChangeInterval = (event) => {
        if(event.target.value){
            const delay = parseInt(event.target.value);
            if(delay > 10){
                setReqInterval(delay);
            }
        }
    };

    const reqDoTask = async (taskId,isAuto)=>{

         // console.log('taskid:',taskId);
        // const task = await getTaskDetail(taskId);
        // console.log('getTaskDetail:',task.data);
        // return;

        console.log('currentId:',currentId);


        setFinnishResult('');
        console.log('autoToTask');
        const task = await getTaskDetail(taskId);
        console.log('getTaskDetail:',task);
        const game_id  = task.data.game_id;
        console.log('gameid:',gameId);
        console.log('game_id:',game_id);

        if(gameId !== game_id){
            setGameId(game_id);
            const tid = '' + taskId;
            const finishOut = await finishTask(tid,game_id,appState.token);
            const outData = finishOut.data;

            if(outData){
                console.log('outData:',outData);

                setFinnishResult(JSON.stringify(outData));
                console.log('outData.energy_now:',outData.energy_now);
                console.log('outData.energy_spent:',outData.energy_spent);

                if(outData.energy_now === 0){
                    endTask = true;
                    alert('没有精力了，休息一下吧！');
                }else{
                    console.log('outData.energy_spent-inner:',outData.energy_spent);
                    if(outData.energy_spent === 0){

                        if(isAuto){
                            currentId = currentId + 1;
                        }
                        console.log('finish-currentId:',currentId);
                    }
                }

            }
        }
    }


    const manualDoTask = async ()=>{
        if(currentId > 0){
            await reqDoTask(currentId,false);
            // currentId = currentId + 1;
            // console.log('finish-currentId:',currentId);
        }
    }
    const autoToTask = async function (){
        isInput = false;
        endTask = false;

        
        console.log('doTask:',currentId);
        if(currentId > 0){

          timer = setInterval(async ()=>{
              console.log('isInput:',isInput);
              console.log('endTask:',endTask);

              if(isInput === false && endTask ===false){
                await reqDoTask(currentId,true);
            }
          },reqInterval * 1000);

        }
    }
    const stopDoTask = function(){
       endTask = true;
       console.log('isInput:',isInput);
       console.log('endTask:',endTask);
       if(timer){
           clearInterval(timer);
           timer = null;
       }
    }
    return (
        <HqDiv>
            <HqInput inputId='taskIdIInput'  inputName={'初始关卡ID默认从1开始'} onInputChange={onInputChangeTaskId} defaultValue={currentId} ></HqInput>
            <HqInput inputName={'输入请求间隔（秒）'} onInputChange={onInputChangeInterval} defaultValue={reqInterval}></HqInput>
            <button onClick={autoToTask}>自动做任务</button>
            <button onClick={stopDoTask}>停止自动做任务</button>
            <button onClick={manualDoTask}  >手动做任务</button>
            <HqTextarea result={finnishResult}></HqTextarea>

            {/* <p>{date.toTimeString()}</p> */}
        </HqDiv>
    );
}
export default HqAutoDoTask;