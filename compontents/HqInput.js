
import styles from './HqInput.module.css'
function HqInput(props){
    const lab = props.inputName;
    const onInputChange = props.onInputChange;
    const type = props.isSecrutiyInput ? 'password':'text';
    const default_value = props.defaultValue;
    return(
        <div className={styles.hqInput}>
            <b>{lab}</b><br></br>
            <input placeholder="请输入" onChange={onInputChange} type={type} defaultValue={default_value}></input>
        </div>
    );
}
export default HqInput;