import { useNavigate, useParams } from 'react-router-dom';
export default (WrappedComponent) => (props) => {
    let navigate = useNavigate();
    let params = useParams();
    let { navigateName, paramsName } = props;
    return <WrappedComponent {...{
        [navigateName ?? "navigate"]: navigate,
        [paramsName ?? "params"]: params
    }} />;
};