import { h, Component } from 'preact';
import style from './Button.module.css';
import PropTypes from 'prop-types';

/**
 * @typedef {Object} ButtonProps
 * @property {boolean} raised - Whether the button should have a raised effect.
 * @property {boolean} outline - Whether the button should have an outlined effect.
 * @property {boolean} ripple - Whether the button should have a ripple effect.
 * @property {boolean} dense - Whether the button should have a dense effect.
 * @property {boolean} unelevated - Whether the button should have an unelevated effect.
 * @property {boolean} disabled - Whether the button should be disabled.
 * @property {function} onClick - The click event handler for the button.
 * @property {function} onDoubleClick - The double click event handler for the button.
 * @property {function} onHover - The hover event handler for the button.
 * @property {function} onMouseEnter - The mouse enter event handler for the button.
 * @property {function} onMouseLeave - The mouse leave event handler for the button.
 * @property {function} onMouseUp - The mouse up event handler for the button.
 * @property {function} onMouseDown - The mouse down event handler for the button.
 * @property {function} onMouseOut - The mouse out event handler for the button.
 */

export default class Button extends Component {
    /**
    * @param {ButtonProps} props - The props for the component.
    */
    constructor(props) {
        super(props);
        this.state = {
            rippleSize: 0,
            showRipple: false,
            ripplePos: { x: '0', y: '0' }
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
        this.handleHover = this.handleHover.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
    }

    handleClick(event) { this.handleRipple(event); if (this.props.onClick && !this.props.ripple) { this.props.onClick(); } }
    handleDoubleClick(event) { if (this.props.onDoubleClick) { this.props.onDoubleClick(); } }
    handleHover(event) { if (this.props.onHover) { this.props.onHover(); } }
    handleMouseEnter(event) { if (this.props.onMouseEnter) { this.props.onMouseEnter(); } }
    handleMouseLeave(event) { if (this.props.onMouseLeave) { this.props.onMouseLeave(); } }
    handleMouseUp(event) { if (this.props.onMouseUp) { this.props.onMouseUp(); } }
    handleMouseDown(event) { if (this.props.onMouseDown) { this.props.onMouseDown(); } }
    handleMouseOut(event) { if (this.props.onMouseOut) { this.props.onMouseOut(); } }
    handleRipple(event) {
        const rippleContainer = event.currentTarget.getBoundingClientRect();
        const rippleSize = Math.max(rippleContainer.width, rippleContainer.height);
        const mousePos = {
            X: event.clientX,
            Y: event.clientY
        }
        const ripplePos = {
            X: mousePos.X - rippleContainer.left - rippleSize / 2,
            Y: mousePos.Y - rippleContainer.top - rippleSize / 2
        }
        this.setState({ showRipple: true, ripplePos: ripplePos, rippleSize: rippleSize });

        setTimeout(() => {
            this.setState({ showRipple: false, rippleSize: 0 });
            if (this.props.onClick) { this.props.onClick(); }
        }, 500);
    }

    render() {

        const { raised, outline, ripple, dense, unelevated, disabled, children } = this.props;

        const classes = [
            style.Button,
            raised && style.Raised,
            outline && style.Outline,
            dense && style.Dense,
            unelevated && style.Unelevated,
            disabled && style.Disabled
        ].filter(Boolean).join(" ");

        return (
            <button class={classes} onClick={this.handleClick} onDoubleClick={this.handleDoubleClick} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} onMouseOut={this.handleMouseOut} onMouseUp={this.handleMouseUp} onMouseDown={this.handleMouseDown}>
                {ripple && this.state.showRipple && ( // Conditionally render the ripple element
                    <div
                        class={style.Ripple}
                        style={{
                            top: `${this.state.ripplePos.Y}px`, // Set the top position based on ripplePos.Y
                            left: `${this.state.ripplePos.X}px`, // Set the left position based on ripplePos.X
                            height: `${this.state.rippleSize}px`,
                            width: `${this.state.rippleSize}px`
                        }}
                    ></div>
                )}
                {children}
            </button >
        );
    }
}

Button.propTypes = {
    children: PropTypes.any,
    raised: PropTypes.bool,
    outline: PropTypes.bool,
    ripple: PropTypes.bool,
    dense: PropTypes.bool,
    unelevated: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    onDoubleClick: PropTypes.func,
    onHover: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseUp: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseOut: PropTypes.func
};

