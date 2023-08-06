import { h, Component } from 'preact';
import style from './TextInputField.module.css';

/**
 * @typedef {Object} InputProps
 * @property {string} type
 * @property {boolean} disabled
 * @property {string} name
 * @property {string} id
 * @property {boolean} bottomBorder
 * @property {boolean} topBorder
 * @property {boolean} leftBorder
 * @property {boolean} rightBorder
 * @property {boolean} noBorder
 * @property {string} placeholder
 * @property {boolean} transparent
 * @property {string} label
 */
export default class TextInputField extends Component {
    /**
     * @param {InputProps} props - The props for the component.
     */
    constructor(props) {
        super(props);
        const { disabled, name, id, bottomBorder, topBorder, leftBorder, rightBorder, transparent, noBorder, placeholder, label, type } = this.props;
        this.state = {
            input: {
                active: false,
                focused: false,
                valid: false,
                type: type,
                value: '',
            },
            label: {
                value: label,
            },
        };
        this.disabled = disabled;
        this.name = name;
        this.id = id;
        this.bottomBorder = bottomBorder;
        this.topBorder = topBorder;
        this.leftBorder = leftBorder;
        this.rightBorder = rightBorder;
        this.placeholder = placeholder;
        this.transparent = transparent;
        this.noBorder = noBorder;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputFocus = this.handleInputFocus.bind(this);
        this.handleInputBlur = this.handleInputBlur.bind(this);
    }


    handleInputChange(event) {
        if (event.isTrusted) {
            const inputValue = event.target.value;
            this.setState((prevState) => ({
                input: {
                    ...prevState.input,
                    value: inputValue,
                },
            }));
        }
    }

    handleInputFocus() {
        this.setState((prevState) => ({
            input: {
                ...prevState.input,
                focused: true
            }
        })
        );
    };

    handleInputBlur() {
        this.setState((prevState) => ({
            input: {
                ...prevState.input,
                focused: this.state.input.value.length > 0
            }
        })
        );
    };
    componentDidUpdate() {
        console.log(this.state);
    }

    render() {
        const border_value = "1px solid gray";
        // console.log("Borders:", this.bottomBorder, this.leftBorder, this.topBorder, this.rightBorder);
        if (this.state.label.value)
            if (this.state.label.value.length == undefined || this.state.label.value.length == 0)
                this.setState((prevState) => ({
                    ...prevState,
                    label: {
                        ...prevState.label,
                        value: null,
                    },
                }));


        const input_classes = [
            style.InputField,
            this.transparent && style.Transparent,
            this.noBorder && style.NoBorder,
        ].join(' ').trim();
        const label_classes = [
            (this.state.input.type == "text" || this.state.input.type == "password" || this.state.input.type == "email" || this.state.input.type == "tel") && style.TextInputLabel,
            this.state.input.focused && style.ActiveLabel,
            this.state.input.valid && style.ActiveLabel
        ].join(' ').trim();

        const label_name = (this.name) ? this.name : this.state.label.value;
        const label_text = (this.state.label.value) ? this.state.label.value : label_name;

        const input_style = {
            borderTop: border_value && this.topBorder || "none",
            borderLeft: border_value && this.leftBorder || "none",
            borderBottom: border_value && this.bottomBorder || "none",
            borderRight: border_value && this.rightBorder || "none",
            // Add other style properties as needed
        };
        return (
            <div class={style.FormField}>
                {(label_text) ? <label for={label_name} class={label_classes}>{label_text}</label> : null}
                <input type={this.state.input.type} oninput={this.handleInputChange}
                    value={this.state.input.value} disabled={this.disabled}
                    name={label_name} id={this.id} placeholder={this.placeholder}
                    onFocus={this.handleInputFocus} onBlur={this.handleInputBlur}
                    class={input_classes} style={input_style} />
            </div>
        );
    }
}
