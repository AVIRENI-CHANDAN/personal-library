import { h, Component } from 'preact';
import style from './Ripple.module.css';

export default class Ripple extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showRipple: false,
            ripplePos: { x: '0', y: '0' }
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(event) { this.handleRipple(event); if (this.props.onClick) { this.props.onClick(); } }
    handleRipple(event) {

        const mousePos = {
            X: event.clientX,
            Y: event.clientY
        }
        const ripplePos = {
            X: mousePos.X,
            Y: mousePos.Y
        }
        this.setState({ showRipple: true, ripplePos });

        console.log("Mouse position:", mousePos);
        console.log("Ripple position:", ripplePos);
        setTimeout(() => {
            this.setState({ showRipple: false });
        }, 600);

    }
    render() {
        return (
            <div class={style.RippleBox} onClick={this.handleClick}>
                {
                    this.state.showRipple && (
                        <div class={style.Ripple} style={{
                            top: `${this.state.ripplePos.Y}px`, // Set the top position based on ripplePos.Y
                            left: `${this.state.ripplePos.X}px` // Set the left position based on ripplePos.X
                        }}></div>
                    )
                }
            </div>
        );
    }
}
