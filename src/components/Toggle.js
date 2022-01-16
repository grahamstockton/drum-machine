function Toggle(props) {
    return (
        <label className="switch">
            <button onClick={props.onClick}>{props.text}</button>
            <span className="slider"></span>
        </label>
    );
}

export default Toggle;