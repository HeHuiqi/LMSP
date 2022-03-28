
import styles from './HqLoading.module.css'

function HqLoading(props){
    const hideLoading = ()=>{
        const lTag = document.getElementById('loading');
        if(lTag){
            document.body.removeChild(lTag);
        }

    };
    return(
        <div className={styles.HqLoading} onClick={hideLoading}>

            <div className={styles.loader}>
            </div>
            <p>{props.tip}</p>

        </div>

    );
}
export default HqLoading;