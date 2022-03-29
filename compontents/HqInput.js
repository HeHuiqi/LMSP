
import styles from './HqInput.module.css'
function HqInput(props){
    const lab = props.inputName;
    const onInputChange = props.onInputChange;
    const type = props.isSecrutiyInput ? 'password':'text';
    const default_value = props.defaultValue;
    const inputId = props.inputId;
    return(
        <div className={styles.hqInput}>
            <b>{lab}</b><br></br>
            <input id={inputId} placeholder="请输入"  type={type}  defaultValue={default_value} onChange={onInputChange}></input>
        </div>
    );
}
export default HqInput;