function HqTextarea(props){
    const isReadOnly = props.isReadOnly;
    const onTextAreaInputChagen = props.onTextAreaInputChagen;
    return(
        <div>
            <textarea  readOnly={isReadOnly} defaultValue={props.result} onChange={onTextAreaInputChagen}></textarea>
        </div>
    );
}
export default HqTextarea;