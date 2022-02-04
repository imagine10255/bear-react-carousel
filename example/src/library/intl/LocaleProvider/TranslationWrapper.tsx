import {Fragment} from 'react';

interface IProps {
    dangerouslySetInnerHTML: {
        __html: string;
    };
}

const TranslationWrapper = ({
    dangerouslySetInnerHTML,
    ...props
}: IProps) => {
    if(dangerouslySetInnerHTML){
        return <span dangerouslySetInnerHTML={dangerouslySetInnerHTML} {...props}/>;
    }
    return <Fragment {...props}/>;
};

export default TranslationWrapper;
