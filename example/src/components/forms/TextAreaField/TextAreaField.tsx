import {forwardRef, useCallback} from 'react';
import styled from 'styled-components/macro';



interface IProps extends FCProps {
    id: string,
    placeholder?: string;
    value?: string;
    readOnly?: boolean;
    disabled?: boolean;
    beforeIconCode?: string;
    maxLength?: number;
    rows?: number;
    onChange?: (value: string) => void;
    onClick?: Function;
    autoComplete?: string;
}

/**
 * TextAreaField Component
 */
const TextAreaField = forwardRef<HTMLTextAreaElement, IProps>(({

    id,
    className,
    style,

    value,
    placeholder = '',
    readOnly = false,
    disabled = false,
    autoComplete,
    maxLength,
    rows=3,
    onChange = () => {},
}, ref) => {


    /**
     * 處理值改變
     */
    const handleChange = useCallback((value: string) => {
        onChange(value);
    }, [onChange]);


    return (
        <TextAreaRoot
            id={id}
            ref={ref}
            className={className}
            style={style}
            rows={rows}
            onChange={handleChange}
            placeholder={placeholder}
            readOnly={readOnly}
            disabled={disabled}
            autoComplete={autoComplete}
            maxLength={maxLength}
            value={value}
        />
    );
});

export default TextAreaField;


const TextAreaRoot = styled.textarea<{
    onChange: any,
}>`
    position: relative;
    display: block;
    width: 100%;
    //height: 35px;
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
`;

