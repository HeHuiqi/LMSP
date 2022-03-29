function HqTextarea(props){
    const isReadOnly = props.isReadOnly;
    return(
        <div>
            <textarea  readOnly={isReadOnly} defaultValue={props.result}></textarea>
        </div>
    );
}
export default HqTextarea;