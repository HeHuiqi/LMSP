import styles from './HqDiv.module.css'

function HqDiv(props){
    return(
        <div className={styles.hqDiv}>
            {props.children}
        </div>
    );
}
export default HqDiv;