import {forwardRef, useCallback} from 'react';
import styled from 'styled-components/macro';



interface IProps extends FCProps{
    checked?: boolean;
    value?: string|number;
    onChange?: (isChecked: boolean) => void;
    disabled?:  boolean;
}

/**
 * Checkbox
 */
const Checkbox = forwardRef<HTMLInputElement, IProps>(({
    className,
    style,
    onChange,
    checked = false,
    value,
    disabled = false,
}, ref) => {
    const handleOnChange = useCallback((isChecked: boolean) => {
        if(onChange){
            // console.log('onchange', isChecked);
            onChange(isChecked);
        }

    }, [value]);

    return (
        <CheckboxRoot className={className} style={style} data-checked={checked}>
            <HiddenCheckbox
                type="checkbox"
                checked={checked}
                onChange={event => handleOnChange(event.target.checked)}
                disabled={disabled}
            />


            <FakeCheckbox/>
        </CheckboxRoot>
    );
});

export default Checkbox;


const FakeCheckbox = styled.span`
     display: block;
     height: inherit;
     width: inherit;


    :before{
        border-radius: .25rem;
        background-color: #343a40;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        display: block;
        width: 20px;
        height: 20px;
        content: "";
        border: 1px solid rgba(0,40,100,.12);

        transition: background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    }



    :after{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        display: block;
        width: 20px;
        height: 20px;
        content: "";
        opacity: 0;
        background: no-repeat 50%/50% 50%;
        background-image: url(data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA4IDgnPjxwYXRoIGZpbGw9JyNmZmYnIGQ9J002LjU2NC43NWwtMy41OSAzLjYxMi0xLjUzOC0xLjU1TDAgNC4yNmwyLjk3NCAyLjk5TDggMi4xOTN6Jy8+PC9zdmc+);
    }
`;

const HiddenCheckbox = styled.input`
    position: absolute;
    z-index: -1;
    opacity: 0;
    left: 0;
    box-sizing: border-box;
    padding: 0;

    &[type="checkbox"]:focus + ${FakeCheckbox} {
        :before{
            outline: 0;
            box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
        }
    }


    &[type="checkbox"]:checked + ${FakeCheckbox} {
        :before{
          color: #fff;
          border-color: #007bff;
        }
        :after{
          opacity: 1;
        }
    }
`;
const CheckboxRoot = styled.label`
    position: relative;
    display: block;
    user-select: none;
    width: 38px;
    //height: 38px;
    cursor: pointer;
    margin-bottom: 0;
`;
