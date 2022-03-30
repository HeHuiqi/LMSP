import styles from './HqSelectPlayer.module.css'

function HqSelectPlayer({players,onSelectChage}){

    const onSelect = (e)=>{
        onSelectChage(e.target.selectedIndex);
    };
    return(
        <div>
            <b>选择角色</b><br></br>
            <select className={styles.hqSelect} onChange={onSelect}>
                {
                    players.map((player,index)=>{
                        return <option key={index} player={JSON.stringify(player)}>{player.number+'-energy_now:'+player.energy}</option>
                    })
                }
            </select>        
        
        </div>
    );

}
export default HqSelectPlayer;