
interface ITestReact {
    labelOff: string
}

const TestReact = ({
    labelOff
}: ITestReact) => {
    return <div data-off={labelOff} data-testid="custom-element">
        test ok
    </div>;
};


export default TestReact;
