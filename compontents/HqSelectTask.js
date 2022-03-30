import styles from './HqSelectTask.module.css'

function HqSelectTask({onSelectChage}){

    const items = ['单词任务','语法任务','故事任务'];
    const onSelect = (e)=>{
        onSelectChage(e.target.selectedIndex);
    };
    return(
        <div>
            <b>选择任务类型</b><br></br>
            <p>
            <select className={styles.hqSelect} onChange={onSelect}>
                {
                    items.map((item,index)=>{
                        return <option key={index} value={item}>{item}</option>
                    })
                }
            </select>
            </p>
        </div>
    );

}
export default HqSelectTask;