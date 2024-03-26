import '../../styles/main.css';

const Main = (props: {
    children: React.ReactNode
}) => {
    return (
        <div className='main'>
            {props.children}
        </div>
    )
}

export default Main