import { Link, useNavigate, useParams } from 'react-router-dom';
import StyledButton from './Styles/ButtonStyle';


export default function Contact() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    }

    return (
        <div className="container">
            <h2> Contact us via telegram!</h2>
            <StyledButton onClick={handleClick}>
                Return Home
            </StyledButton>
        </div>
    );
}
