
import styles from './HqLoading.module.css'

function HqLoading(props){
    const hideLoading = ()=>{
        const lTag = document.getElementById('loading');
        if(lTag){
            document.body.removeChild(lTag);
        }

    };
    return(
        <div className={styles.hqLoading} onClick={hideLoading}>
            <h2> {props.tip}</h2>
        </div>
    );
}
export default HqLoading;