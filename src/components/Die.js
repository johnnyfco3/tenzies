import React from "react"

export function Die(props){
    
    const styles = {backgroundColor: props.isHeld ? "#59E391" : "rgb(252, 235, 215)"}
    
    return (
        <div id="die" style={styles} onClick={props.handleClick}>
            {props.value}
        </div>
    )
}

export default Die;