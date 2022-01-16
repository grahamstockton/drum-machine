function Key(props) {
    function onClickHandler(isOn=true) {
        props.setState({
            ...props.state,
            last_key_press: props.name
        })

        if (props.state.isOn) {
            let audio = document.getElementById("audio-" + props.name)
            audio.volume = props.state.volume;
            audio.pause();
            audio.currentTime = 0;
            audio.play().catch((e) => {});
        }
    }

    return (
        <div>
            <audio className="clip" id={"audio-" + props.name} src={props.audio} type="audio/mp3"></audio>
            <button className="key-button" id={props.name} onClick={onClickHandler}>{props.name}</button>
        </div>
    );
}

export default Key;