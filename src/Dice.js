


const Dice = (props) => {
    return (
        <button style={props.style} onClick={() => props.toggle(props.id)}>{props.value}</button>
    )
}

export default Dice;