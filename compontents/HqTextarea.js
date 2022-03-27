function HqTextarea(props){
    return(
        <div>
            <textarea  readOnly={'readonly'} defaultValue={props.result}></textarea>
        </div>
    );
}
export default HqTextarea;