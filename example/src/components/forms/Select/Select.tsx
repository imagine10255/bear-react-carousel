import React, {forwardRef, useCallback, useMemo} from 'react';
import styled from 'styled-components/macro';




export interface IOption {
    value: string;
    text: string;
}
interface IProps extends FCProps {
    title?: string;
    name?: string;
    value?: string|number;
    options?: IOption[];
    disabled?: boolean;
    onChange?: (value: string) => void;
    errorMessage?: string;
    remarkMessage?: string;
}



/**
 * 下拉選單元件
 *
 * @param style
 * @param className
 * @param title 標題
 * @param name 控制項名稱
 * @param options 下拉選單項目
 * @param disabled 是否禁用
 * @param value
 * @param onChange
 */
const Select = forwardRef<HTMLSelectElement, IProps>(({
    style,
    className,
    name,
    options = [{text: '', value: ''}],
    disabled = false,
    value,
    onChange,
}, ref) => {


    const handleOnChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(event.target.value);
        }


    }, [onChange]);

    const renderOptions = useMemo(() => {
        return options.map(row => (
            <option key={`option_${name}_${row.value}`}
                value={String(row.value)}>
                {row.text}
            </option>
        ));


    }, [options]);

    return (
        <SelectDropdown
            ref={ref}
            className={className}
            style={style}
            name={name}
            value={String(value)}
            onChange={handleOnChange}
            disabled={disabled}
            multiple={false}
        >
            {renderOptions}
        </SelectDropdown>
    );
});


export default Select;


const SelectDropdown = styled.select`
    border: 1px solid #343a40;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    font-weight: 400;
    line-height: 1.5;
    color: #c8cfd6;
    display: block;
    width: 100%;
    height: 35px;
    padding: 6px 8px;
    font-size: 14px;
    background: 0 0;

    :focus{
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
    }
`;

