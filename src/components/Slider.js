function Slider(props) {
    return (
        <input className="slider" type="range" min="0" max="1" step=".01" value={props.value} onChange={(vol) => {
            props.setState({
                ...props.state,
                volume: vol.target.valueAsNumber
            });
        }}></input>
    );
}

export default Slider;