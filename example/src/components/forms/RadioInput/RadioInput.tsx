import CSS from 'csstype';
import styled,{css} from 'styled-components/macro';


interface IProps extends FCProps{
    className?: string;
    style?: CSS.Properties;
    value?: string|number;
    name?: string;
    onChange?: (isChecked: boolean) => void;
    text?: string;
    checked?: boolean;
    disabled?: boolean;
}

/**
 * Radio
 *
 * 若使用 HookForm Controller as 需要包 Div 在外層
 * @param className
 * @param style
 * @param name
 * @param onChange
 * @param checked
 * @param value
 * @param id
 * @param text
 * @param disabled
 */
const RadioInput = ({
    className,
    style,
    name,
    onChange = () => {},
    text,
    checked = false,
    value,
    disabled = false,

}: IProps) => {
    return (
        <RadioRoot className={className} style={style} disabled={disabled}>
            <HiddenRadioInput
                type="radio"
                name={name}
                value={value}
                onChange={event => onChange(true)}
                checked={checked}
                disabled={disabled}
            />
            <FakeRadio>{text}</FakeRadio>
        </RadioRoot>
    );
};

export default RadioInput;


const FakeRadio = styled.span`
    display: block;
     height: inherit;
     width: inherit;
    padding-left: 22px;
    padding-right: 10px;
    pointer-events: none;

    :before{
        color: #fff;
        background-color: #fff;
        border-radius: 50%;

        transition: background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;

        position: absolute;
        top: 2px;
        left: 0;
        display: block;
        width: 1rem;
        height: 1rem;
        content: "";

        //pointer-events: none;
        border: 1px solid #adb5bd;
    }



    :after{
        position: absolute;
        top: 2px;
        left: 0;
        display: block;
        width: 1rem;
        height: 1rem;
        content: "";
        background: no-repeat 50%/50% 50%;
        background-image: url(data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9Jy00IC00IDggOCc+PGNpcmNsZSByPSczJyBmaWxsPScjZmZmJy8+PC9zdmc+);
    }
`;

const HiddenRadioInput = styled.input`
    position: absolute;
    z-index: -1;
    opacity: 0;
    left: 0;
    box-sizing: border-box;
    padding: 0;

    &[type="radio"]:focus ~ ${FakeRadio} {
        :before{
            outline: 0;
            box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
        }
    }


    &[type="radio"]:checked ~ ${FakeRadio} {
        :before{
          color: #fff;
          border-color: #007bff;
          background-color: #007bff;
        }
        :after{
          opacity: 1;
        }
    }

    &[type="radio"]:disabled ~ ${FakeRadio} {
        :before{
          background-color: #6c7884;
          border-color: #272c31;
        }
        :after{
          opacity: .3;
        }
    }
    &[type="radio"]:disabled:checked ~ ${FakeRadio} {
        :before{
          background-color: rgba(0,123,255,.5);
        }
    }
`;
const RadioRoot = styled.label<{
    disabled?: boolean
}>`
    position: relative;
    display: block;
    user-select: none;
    //width: 38px;
    //height: 38px;
    //padding-right: 38px;
    cursor: pointer;
    margin-bottom: 0;

    ${props => props.disabled && css`
        cursor: not-allowed;
    `}
`;
