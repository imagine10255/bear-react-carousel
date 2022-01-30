import {forwardRef, RefObject, useCallback, useMemo} from 'react';
import styled, {css} from 'styled-components/macro';
import {isEmpty} from 'imagine-js-utils/equal';

// Components
import Icon from 'components/atoms/Icon';



interface IProps extends FCProps{
    type?: 'text' | 'number' | 'password' | 'tel';
    placeholder?: string;
    value?: string|number;
    readOnly?: boolean;
    disabled?: boolean;
    beforeIconCode?: string;
    beforeIconOnClick?: Function;
    maxLength?: number;
    onChange?: (value: string) => void;
    onClick?: Function;
    autoComplete?: string;
    required?: boolean;
    forwardRef?: RefObject<HTMLInputElement>;
}

/**
 * Input Component
 *
 * @param props
 * @returns {*}
 */
const TextField = forwardRef<HTMLInputElement, IProps>(({
    className,
    style,

    type = 'text',
    value,
    placeholder = '',
    readOnly = false,
    disabled = false,
    autoComplete,
    beforeIconCode,
    beforeIconOnClick,
    maxLength,
    onChange = () => {},
    required,
}, ref) => {


    /**
     * 處理值改變
     */
    const handleChange = useCallback((value: string) => {
        onChange(value);
    }, [onChange]);

    const BaseInput = useMemo(() => {
        return <Input
            ref={ref}
            type={type}
            className={className}
            style={style}
            onChange={handleChange}
            placeholder={placeholder}
            readOnly={readOnly}
            disabled={disabled}
            autoComplete={autoComplete}
            autoCorrect="off" // for webview
            autoCapitalize="off" // for webview
            spellCheck="false" // for webview
            maxLength={maxLength}
            required={required}
            value={value}
        />;

    }, [autoComplete, className, disabled, handleChange, maxLength, placeholder, readOnly, style, type, value]);

    return (
        <TextFieldRoot>
            {beforeIconCode &&
                <InputGroupPrepend onClick={beforeIconOnClick}>
                    <InputGroupText>
                        <Icon code={beforeIconCode} color="#495057"/>
                    </InputGroupText>
                </InputGroupPrepend>
            }

            {BaseInput}
        </TextFieldRoot>

    );
});

export default TextField;

const InputGroupText = styled.span`
    border-radius: 5px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border: 1px solid #343a40;
    border-right: 0;
    background: 0 0;

    display: flex;
    width: 41px;
    align-items: center;
    justify-content: center;
    margin-bottom: 0;
    color: #495057;

`;

const Input = styled.input<{
    onChange: any,
}>`
    position: relative;
    display: block;
    width: 100%;
    height: 35px;
    font-size: 14px;
    padding: 6px 12px;
    font-weight: 400;
    line-height: 21px;
    color: #c8cfd6;

    background: 0 0;
    background-clip: padding-box;

    border: 1px solid #343a40;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;

    flex: 1;
    margin-bottom: 0;

    :focus{
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
    }

    ::-webkit-input-placeholder, :read-only, :disabled {
      color: #495057;
    }
    
      /* chrome 自動填入 */
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active{
        -webkit-box-shadow: 0 0 0px 1000px #2b3035 inset;
        transition: background-color 5000s ease-in-out 0s;
        -webkit-text-fill-color: #c8cfd6;
    }
    
     ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
       //color: transparent;
       opacity: 1; /* Firefox */
     }

    :-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: transparent;
     }

    ::-ms-input-placeholder { /* Microsoft Edge */
      color: transparent;
    }
`;



const InputGroupPrepend = styled.div<any>`
    display: flex;
    margin-right: -1px;
    flex: 0;

    ${props => !isEmpty(props.onClick) && css`
         cursor: pointer;
    `}

    + ${Input}{
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
`;

const TextFieldRoot = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    width: 100%;
`;
