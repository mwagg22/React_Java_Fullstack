import {useEffect,useState} from 'react';

function Errors(props) {
    const [messages,setMessage]=useState(props.errors);
       console.log(props.errors);
    useEffect(()=>{
           setMessage(props.errors) 
        },[props.errors]);

    if (messages.length === 0) {
        return null;
    }

    return (
        <div className="alert alert-danger">
            <ul>
                {messages.map(message => (
                    <li key={message}>{message}</li>
                ))}
            </ul>
        </div>
    );
}

export default Errors;   

