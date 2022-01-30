import {forwardRef, useCallback} from 'react';
import styled from 'styled-components/macro';



interface IProps extends FCProps {
    checked?: boolean;
    value?: string|boolean;
    onChange?: (isChecked: boolean) => void;
    disabled?:  boolean;
}

/**
 * AmountSwitch
 *
 * @param props
 * @returns {*}
 */
const SwitchControl = forwardRef(function SwitchControl({

    style,
    className,
    onChange,
    checked = false,
    value,
    disabled = false,
}: IProps, ref) {
    const handleOnChange = useCallback((isChecked: boolean) => {
        if(onChange){
            onChange(isChecked);
        }

    }, [value]);

    return (
        <SwitchControlRoot style={style} className={className}>
            <HiddenCheckbox
                type="checkbox"
                checked={checked}
                onChange={event => handleOnChange(event.target.checked)}
                disabled={disabled}
            />
            <FakeSlider/>
        </SwitchControlRoot>
    );
});

export default SwitchControl;


const FakeSlider = styled.span`
      width: 100%;
    height: 100%;
    cursor: pointer;
    background-color: #343a40;
    transition: .4s;
    border-radius: 34px;
    border: 1px solid #343a40;
}

  :before {
      position: absolute;
      content: "";
      width: 18px;
      height: 18px;
      //left: 4px;
      //bottom: 4px;
      background-color: #7d8490;
      transition: .4s;
      border-radius: 50%;
      transform: translateX(0);
    }
`;

const HiddenCheckbox = styled.input`
  //opacity: 0;
    position: absolute;
    z-index: -1;
    opacity: 0;
    left: 0;
    box-sizing: border-box;
    padding: 0;

    &:checked + ${FakeSlider} {
        background-color: #2196F3;

        &:before {
          transform: translateX(20px);
          background-color: #fff;

        }
    }

    &:disabled + ${FakeSlider} {
        opacity: .3;
        background-color: #000;
    }

    :focus +  ${FakeSlider} {
      box-shadow: 0 0 1px #2196F3;
    }

`;

const SwitchControlRoot = styled.label`
  position: relative;
  display: flex;
  width: 40px;
  height: 20px;
  margin-bottom: 0;


`;
